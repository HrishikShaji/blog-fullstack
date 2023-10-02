import Image from "next/image";
import Link from "next/link";

export const Card = () => {
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
          <span>date</span>
          <span>time</span>
        </div>
        <h1 className="text-xl font-bold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Link href="/">See more</Link>
      </div>
    </div>
  );
};
