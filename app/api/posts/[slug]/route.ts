import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

type Params = {
  params: {
    slug: string;
  };
};

export const GET = async (req: Request, { params }: Params) => {
  const { slug } = params;
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { user: true },
    });
    return new NextResponse(JSON.stringify(post));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
