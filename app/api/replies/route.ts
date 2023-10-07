import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not authenticated" }));
  }

  try {
    const body = await req.json();

    console.log("body is", body);
    const reply = await prisma.comment.create({
      data: { ...body, userEmail: session?.user?.email },
    });

    const originalComment = await prisma.comment.findUnique({
      where: {
        id: body.parentId,
      },
    });
    await prisma.comment.update({
      where: {
        id: body.parentId,
      },
      data: {
        children: {
          push: reply.id,
        },
      },
    });
    console.log("original is", originalComment);

    return new NextResponse(JSON.stringify(reply));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};

export const GET = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not authenticated" }));
  }

  try {
    const { searchParams } = new URL(req.url);
    const parentId = searchParams.get("parentId");

    const replies = await prisma.comment.findMany({
      where: {
        parentId: parentId,
      },
    });

    return new NextResponse(JSON.stringify(replies));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
