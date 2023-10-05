import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (req: Request, { params }) => {
  const { slug } = params;
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: {
        views: { increment: 1 },
      },
      include: { user: true },
    });
    console.log(post);
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 }),
    );
  }
};
