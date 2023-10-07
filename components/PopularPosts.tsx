import { Post } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";

const getData = async (page: number, sec: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&${sec}=true`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const PopularPosts = async () => {
  const data = await getData(1, "popular");
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">Popular Posts</h1>
      <div className="flex gap-5 items-center justify-between">
        {data?.posts.map((item: Post) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex relative h-[150px] w-[250px]">
              <Image
                height={1000}
                width={1000}
                alt="image"
                src={item.img}
                className=" h-full w-full absolute object-cover"
              />
              <div className="absolute z-10 flex flex-col gap-2">
                <div className="flex gap-2">
                  <span>name</span>
                </div>
                <Link href="/">See more</Link>
              </div>
            </div>
          </div>
        ))}
        <button className="px-3 py-2 border-2 border-white">
          <Link href="/blog?sec=popular">See more</Link>
        </button>
      </div>
    </div>
  );
};
