import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams?.get("postSlug");
  try {
    console.log("postSlug is", postSlug);
    return new NextResponse(JSON.stringify({ message: "ok" }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
