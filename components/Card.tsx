import Image from "next/image";
import Link from "next/link";

interface CardProps {
  item: Record<string, any>;
}

export const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="flex  gap-3">
      <Image
        height={1000}
        width={1000}
        alt="image"
        src="https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=400"
        className=" h-[300px] w-[300px]"
      />
      <div className="flex-1 flex flex-col gap-2">
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
