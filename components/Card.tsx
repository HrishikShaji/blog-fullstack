import { Post } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import { EditorOutput } from "./EditorOutput";

interface CardProps {
  item: any;
}

export const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="flex relative h-[300px] w-full bg-gray-500">
      <div className="absolute z-10 flex flex-col gap-2">
        <div className="flex gap-2">
          <span>{item.createdAt.toString().substring(0, 10)}</span>
        </div>
        <h1 className="text-xl font-bold">{item.title}</h1>
        <EditorOutput content={item.content} />
        <Link href={`/posts/${item.slug}`}>See more</Link>
      </div>
    </div>
  );
};
