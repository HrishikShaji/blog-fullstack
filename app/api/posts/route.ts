import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page"));
  const cat = searchParams.get("cat");
  const featured = searchParams.get("editor");
  const popular = searchParams.get("popular");
  const POST_PER_PAGE = 3;
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
      ...(featured && { featured: true }),
    },
    orderBy: {
      ...(popular ? { views: "desc" } : { createdAt: "desc" }),
    },
    include: {
      user: true,
    },
  };
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query as any),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }));
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
    console.log("post creation request here");
    const body = await req.json();
    console.log(body);

    const post = await prisma.post.create({
      data: { ...body, userEmail: session?.user?.email },
    });
    console.log(post);
    return new NextResponse(JSON.stringify(post));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
