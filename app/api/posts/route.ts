import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const POST_PER_PAGE = 2;
  console.log("its here", page);
  try {
    const posts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
    });
    console.log(posts);
    return new NextResponse(JSON.stringify(posts, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 }),
    );
  }
};
