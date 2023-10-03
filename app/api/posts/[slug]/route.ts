import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (req: Request, { params }) => {
  const { slug } = params;
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
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
