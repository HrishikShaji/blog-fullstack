import { fetchPosts } from "@/lib/utils";
import { baseUrl } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";

export const Featured = async () => {
  const { posts } = await fetchPosts(`${baseUrl}/api/posts?page=1`);

  if (!posts[0]) return <div>NO POSTS YET...</div>;
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl">Discover my Stories and creative ideas</h1>
      <div className="flex gap-4 relative h-[50vh] bg-neutral-600 justify-center items-center">
        <h1 className="absolute z-10 text-4xl font-bold ">{posts[0]?.title}</h1>
        <Link href={`posts/${posts[0]?.slug}`}>Read more</Link>
      </div>
    </div>
  );
};
