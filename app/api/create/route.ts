import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const POST = async (req: Request) => {
  const session = await getAuthSession();
  if (!session || !session.user || !session.user.email) {
    return new NextResponse(JSON.stringify({ message: "Not authenticated" }));
  }
  try {
    const body = await req.json();
    const content = JSON.stringify(body.content);
    console.log("payload is here", body, content);
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: content,
        userEmail: session.user.email,
        catSlug: body.cat,
      },
    });
    console.log(post);

    return new NextResponse(JSON.stringify(post));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
