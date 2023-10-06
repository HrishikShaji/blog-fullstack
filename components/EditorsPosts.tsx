import Image from "next/image";
import Link from "next/link";

export const EditorsPosts = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">Editor's Picks</h1>

      <div className="flex gap-5 items-center justify-between">
        <div className="flex gap-4">
          <div className="flex relative h-[150px] w-[250px]">
            <Image
              height={1000}
              width={1000}
              alt="image"
              src="https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=400"
              className=" h-full w-full absolute"
            />
            <div className="absolute z-10 flex flex-col gap-2">
              <div className="flex gap-2">
                <span>name</span>
              </div>
              <Link href="/blog?sec=Editor">See more</Link>
            </div>
          </div>
          <div className="flex relative h-[150px] w-[250px]">
            <Image
              height={1000}
              width={1000}
              alt="image"
              src="https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=400"
              className=" h-full w-full absolute"
            />
            <div className="absolute z-10 flex flex-col gap-2">
              <div className="flex gap-2">
                <span>name</span>
              </div>
              <Link href="/blog?cat=Editor">See more</Link>
            </div>
          </div>
        </div>
        <button className="px-3 py-2 border-2 border-white">
          <Link href="/blog?sec=editor">See more</Link>
        </button>
      </div>
    </div>
  );
};
