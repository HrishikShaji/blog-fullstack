"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CategoryList = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div className="flex flex-col gap-5 p-10">
      <h1 className="text-xl">Popular categories</h1>
      <div className="w-full flex justify-center items-center">
        <div className="flex gap-4">
          {data?.map((item) => (
            <Link href={`/blog?cat=${item.slug}`} key={item.id}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
