import { formatTimeToNow } from "@/lib/utils";
import { ExtendedPost } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  item: ExtendedPost;
}

export const Card: React.FC<CardProps> = ({ item }) => {
  const data = item.content as any;
  const images = data.blocks.filter((block: any) => block.type == "image");

  return (
    <div className="flex relative h-[300px] w-full bg-gray-500 justify-center items-center overflow-hidden">
      <div className="flex gap-2 absolute z-10  top-2 left-2">
        {item.user.image && (
          <Image
            className="object-cover  w-12 h-12"
            height={1000}
            width={1000}
            alt=""
            src={item.user.image}
          />
        )}
        <div className="flex flex-col gap-0">
          <h1 className="font-semibold">{item.userEmail}</h1>
          <span className="text-xs">
            {formatTimeToNow(new Date(item.createdAt))}
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
      <div className="absolute z-10 bottom-2 left-2 flex gap-2">
        <button className="px-2 py-1 border-white border-2">Like</button>
        <button className="px-2 py-1 border-white border-2">Dislike</button>
        <h1>{item.votes.length}</h1>
      </div>
    </div>
  );
};
