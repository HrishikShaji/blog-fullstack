import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");
  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });
    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 }),
    );
  }
};
