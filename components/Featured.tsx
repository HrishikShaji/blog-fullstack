import Image from "next/image";

export const Featured = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl">Discover my Stories and creative ideas</h1>
      <div className="flex gap-4 relative justify-center items-center">
        <Image
          className="w-full h-[50vh] object-cover"
          alt="image"
          height={1000}
          width={1000}
          src="https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=400"
        />
        <h1 className="absolute z-10 text-4xl font-bold">First post</h1>
        <button className="absolute z-10 text-xl bottom-2 right-2">
          Read more
        </button>
      </div>
    </div>
  );
};
