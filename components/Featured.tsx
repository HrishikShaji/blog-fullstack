import { fetchPosts } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Featured = async () => {
  const { posts } = await fetchPosts(`http://localhost:3000/api/posts?page=1`);

  if (!posts[0]) return <div>NO POSTS YET...</div>;
  const content = posts[0]?.content as any;
  const images = content.blocks.filter((block: any) => block.type == "image");
  const image = images?.length > 0 ? images[0].data.file.url : null;
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl">Discover my Stories and creative ideas</h1>
      <div className="flex gap-4 relative h-[50vh] bg-neutral-600 justify-center items-center">
        {image && (
          <Image
            className="w-full h-full object-cover"
            alt="image"
            height={1000}
            width={1000}
            src={image}
          />
        )}
        <h1 className="absolute z-10 text-4xl font-bold ">{posts[0]?.title}</h1>
        <Link
          href={`posts/${posts[0]?.slug}`}
          className="absolute z-10 text-xl bottom-2 right-2"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};
