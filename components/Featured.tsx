import Image from "next/image";

export const Featured = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl">Discover my Stories and creative ideas</h1>
      <div className="flex gap-4">
        <div className="w-[300px] h-[250px]">
          <Image
            className="w-[300px] h-[250px] object-cover"
            alt="image"
            height={1000}
            width={1000}
            src="https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
        </div>
        <div className="w-[50%] flex flex-col gap-5 items-start">
          <h1 className="text-xl">First post</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button>Read more</button>
        </div>
      </div>
    </div>
  );
};
