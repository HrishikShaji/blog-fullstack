"use client";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CategoryList = () => {
  const [data, setData] = useState<Category[] | null>(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
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
