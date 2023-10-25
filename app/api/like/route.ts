import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, voteType } = body;

    const session = await getAuthSession();

    if (!session?.user?.email) {
      return new Response("Unauthorized");
    }

    const existingLike = await prisma.vote.findFirst({
      where: {
        emailId: session.user.email,
        postId,
      },
    });

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        votes: true,
      },
    });

    if (!post) {
      return new Response("Post not found");
    }

    if (existingLike) {
      if (existingLike.type === voteType) {
        await prisma.vote.deleteMany({
          where: {
            emailId: session.user.email,
            postId: postId,
          },
        });
        return new Response("OK");
      }
      await prisma.vote.updateMany({
        where: {
          postId,
          emailId: session.user.email,
        },
        data: {
          type: voteType,
        },
      });

      const likesAmt = post.votes.reduce((acc, vote) => {
        if (vote.type === "LIKE") return acc + 1;
        if (vote.type === "UNLIKE") return acc - 1;
        return acc;
      }, 0);
      return new Response("Ok");
    }

    await prisma.vote.create({
      data: {
        type: voteType,
        emailId: session.user.email,
        postId,
      },
    });

    const likesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === "LIKE") return acc + 1;
      if (vote.type === "UNLIKE") return acc - 1;
      return acc;
    }, 0);

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not vote", { status: 500 });
  }
}
