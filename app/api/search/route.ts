import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const sortBy = searchParams.get("sort")?.toString();
  const filterBy = searchParams.get("filter")?.toString();
  const sort = sortBy as string;
  const order = "desc";
  const orderBy = { [sort]: order };

  try {
    if (sort === "votes") {
      const posts = await prisma.post.findMany({
        ...(filterBy && { where: { catSlug: filterBy } }),
        include: {
          votes: true,
          user: true,
        },
        orderBy: {
          votes: {
            _count: "asc",
          },
        },
      });
      return new NextResponse(JSON.stringify(posts));
    }
    const posts = await prisma.post.findMany({
      ...(filterBy && { where: { catSlug: filterBy } }),
      include: {
        votes: true,
        user: true,
      },
      ...(sortBy && { orderBy: orderBy }),
    });
    return new NextResponse(JSON.stringify(posts));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
