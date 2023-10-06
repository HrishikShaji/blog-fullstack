import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const featured = searchParams.get("editor");
  const popular = searchParams.get("popular");
  const POST_PER_PAGE = 2;
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
  };
  console.log("its here", page);
  console.log(featured);
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    console.log(posts);

    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 }),
    );
  }
};

export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not authenticated" }, { status: 401 }),
    );
  }

  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");
  try {
    const body = await req.json();

    const post = await prisma.post.create({
      data: { ...body, userEmail: session?.user.email },
    });
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 }),
    );
  }
};
