import Image from "next/image";

const getData = async (page: number) => {
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const Featured = async () => {
  const data = await getData(1);

  const content = JSON.parse(data.posts[0].content);
  const images = content.blocks.filter((block: any) => block.type == "image");
  const image = images.length > 0 ? images[0].data.file.url : null;
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl">Discover my Stories and creative ideas</h1>
      <div className="flex gap-4 relative h-[50vh] bg-neutral-600 justify-center items-center">
        {image && (
          <Image
            className="w-full h-full object-cover"
            alt="image"
            height={1000}
            width={1000}
            src={image}
          />
        )}
        <h1 className="absolute z-10 text-4xl font-bold ">
          {data?.posts[0].title}
        </h1>
        <button className="absolute z-10 text-xl bottom-2 right-2">
          Read more
        </button>
      </div>
    </div>
  );
};
