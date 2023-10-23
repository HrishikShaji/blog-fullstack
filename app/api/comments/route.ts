import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

const createComments = (comments: any, parentId: string | null = null): any => {
  const commentList = [];
  let comment;

  if (parentId == null) {
    comment = comments.filter((comment: any) => comment.parentId == null);
  } else {
    comment = comments.filter((comment: any) => comment.parentId == parentId);
  }

  for (let comm of comment) {
    commentList.push({
      id: comm.id,
      desc: comm.desc,
      user: comm.user,
      createdAt: comm.createdAt,
      children: createComments(comments, comm.id),
    });
  }
  return commentList;
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams?.get("postSlug");
  try {
    if (postSlug) {
      const comments = await prisma.comment.findMany({
        where: { postSlug },
        include: { user: true },
      });

      if (comments) {
        const commentList = createComments(comments);
        return new NextResponse(JSON.stringify(commentList));
      }
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};

export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not authenticated" }));
  }

  try {
    const body = await req.json();

    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session?.user?.email },
    });
    return new NextResponse(JSON.stringify(comment));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
