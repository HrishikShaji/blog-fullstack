import { baseUrl } from "@/utils/data";
import { Category } from "@prisma/client";
import Link from "next/link";

const fetchCategories = async () => {
  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const CategoryList = async () => {
  const data = await fetchCategories();
  return (
    <div className="flex flex-col gap-5 py-10">
      <h1 className="text-3xl font-semibold">Popular categories</h1>
      <div className="w-full flex">
        <div className="flex gap-4">
          {data?.map((item: Category) => (
            <Link
              className="px-3 py-2 border-2 border-white"
              href={`/blog?cat=${item.slug}`}
              key={item.id}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
