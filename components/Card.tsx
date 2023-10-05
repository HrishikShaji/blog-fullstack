import Image from "next/image";
import Link from "next/link";

interface CardProps {
  item: Record<string, any>;
}

export const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="flex relative h-[300px] w-full">
      <Image
        height={1000}
        width={1000}
        alt="image"
        src={item?.img}
        className=" h-full w-full  object-cover"
      />
      <div className="absolute z-10 flex flex-col gap-2">
        <div className="flex gap-2">
          <span>{item.createdAt.substring(0, 10)}</span>
          <span>{item.catSlug}</span>
        </div>
        <h1 className="text-xl font-bold">{item.title}</h1>
        <p>{item.desc.substring(0, 60)}</p>
        <Link href={`/posts/${item.slug}`}>See more</Link>
      </div>
    </div>
  );
};
