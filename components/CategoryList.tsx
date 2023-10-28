import { fetchPosts } from "@/lib/utils";
import { baseUrl } from "@/utils/data";
import { Category } from "@prisma/client";
import Link from "next/link";

export const CategoryList = async () => {
  const data = await fetchPosts(`${baseUrl}/api/categories`);
  return (
    <div className="flex flex-col gap-5 py-10">
      <h1 className="text-3xl font-semibold">Popular categories</h1>
      <div className="w-full flex">
        <div className="flex gap-4">
          {data?.map((item: Category) => (
            <Link href={`/blog?cat=${item.slug}`} key={item.id}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
