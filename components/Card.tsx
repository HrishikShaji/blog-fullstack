import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  item: Post;
}

export const Card: React.FC<CardProps> = ({ item }) => {
  const data = JSON.parse(item.content);
  const images = data.blocks.filter((block: any) => block.type == "image");

  return (
    <div className="flex relative h-[300px] w-full bg-gray-500 justify-center items-center overflow-hidden">
      <div className="flex gap-2 absolute z-10  top-2 left-2">
        <Image
          className="object-cover  w-12 h-12"
          height={1000}
          width={1000}
          alt=""
          src={item.user.image}
        />
        <div className="flex flex-col gap-0">
          <h1 className="font-semibold">{item.userEmail}</h1>
          <span className="text-xs">
            {item.createdAt.toString().substring(0, 10)}
          </span>
        </div>
      </div>
      <h1 className="text-xl font-bold absolute z-10">{item.title}</h1>
      {images.length > 0 ? (
        <Image
          className="object-cover absolute w-full h-full"
          height={1000}
          width={1000}
          alt=""
          src={images[0].data.file.url}
        />
      ) : null}
      <Link
        href={`/posts/${item.slug}`}
        className="absolute z-10 bottom-2 right-2"
      >
        See more
      </Link>
    </div>
  );
};
