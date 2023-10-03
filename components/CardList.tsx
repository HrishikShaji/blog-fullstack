"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Menu } from "./Menu";
import { Pagination } from "./Pagination";

const getData = async (page) => {
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

interface CardListProps {
  page: number;
}

export const CardList: React.FC<CardListProps> = ({ page }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/api/posts?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  console.log(data);
  return (
    <div>
      <h1 className="text-3xl w-full">Recent Posts</h1>
      <div className="flex gap-3">
        <div className="w-[75%]">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <Menu />
      </div>
      <Pagination />
    </div>
  );
};
