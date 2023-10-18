import { ExtendedPost } from "@/types/Types";
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

export const EditorsPosts = async () => {
  const data = await getData(1, "editor");
  console.log(data);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">Editors Picks</h1>
      <div className="flex gap-5 items-center justify-between">
        {data?.posts.map((item: ExtendedPost) => {
          const content = JSON.parse(item.content as any);
          const images = content.blocks.filter(
            (block: any) => block.type == "image",
          );
          const image = images.length > 0 ? images[0].data.file.url : null;
          return (
            <div
              key={item.id}
              className="flex gap-4 relative bg-gray-300 h-[150px] justify-center items-center w-[250px]"
            >
              <h1 className="absolute z-10 font-semibold text-2xl">
                {item.title}
              </h1>
              {image && (
                <Image
                  fill
                  alt="image"
                  className="w-full h-full object-cover"
                  src={image}
                />
              )}
              <Link className="absolute bottom-2 right-2 z-10" href="/">
                See more
              </Link>
            </div>
          );
        })}
        <button className="px-3 py-2 border-2 border-white">
          <Link href="/blog?sec=editor">See more</Link>
        </button>
      </div>
    </div>
  );
};
