import { Comments } from "@/components/Comments";
import { Menu } from "@/components/Menu";
import Image from "next/image";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
const Page = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  return (
    <div className="pt-40 p-10 flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        <Image
          className="h-20 w-20 rounded-full object-cover"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
          height={1000}
          width={1000}
          alt="image"
        />
        <div className="flex flex-col ">
          <span className="text-xl font-semibold">{data?.user.email}</span>
          <span className="text-sm text-gray-400">10.3.2023</span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
        <Image
          className="w-full h-full"
          src={data?.img}
          height={1000}
          width={1000}
          alt="image"
        />
      </div>
      <p>{data.desc}</p>
      <Comments postSlug={slug} />
    </div>
  );
};

export default Page;
