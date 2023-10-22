import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (
  req: Request,
  params: { params: { commentId: string } },
) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams?.get("postSlug");

  if (!postSlug) {
    return new NextResponse(JSON.stringify({ message: "Post id missing" }));
  }
  if (!params.params.commentId) {
    return new NextResponse(JSON.stringify({ message: "Comment id missing" }));
  }
  try {
    console.log("postSlug is", postSlug, params);
    const comments = await prisma.comment.findMany({
      where: {
        postSlug: postSlug,
        parentId: params.params.commentId,
      },
    });

    console.log("comments are", comments);
    return new NextResponse(JSON.stringify({ message: "ok" }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
