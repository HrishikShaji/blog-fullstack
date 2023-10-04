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
    <div className="">
      <div className="flex items-center gap-[50px]">
        <div className="flex-1 relative flex flex-col gap-10">
          <h1 className="text-3xl">{data.title}</h1>
          <div className="flex items-center gap-[20px]">
            <Image
              className="h-20 w-20 rounded-full object-cover"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
              height={1000}
              width={1000}
              alt="image"
            />
            <div className="relative h-[50px] w-[50px]">
              <span>{data.user.email}</span>
              <span>10.3.2023</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Image
            className="relative h-[350px]"
            src="https://images.pexels.com/photos/18427797/pexels-photo-18427797/free-photo-of-light-sea-dawn-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            height={1000}
            width={1000}
            alt="image"
          />
        </div>
      </div>
      <div className="flex gap-[50px]">
        <div className="flex-[5]">
          <p>{data.desc}</p>
          <div>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Page;
