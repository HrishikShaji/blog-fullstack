import { Comments } from "@/components/Comments";
import { EditorOutput } from "@/components/EditorOutput";

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const data = await getData(slug);
  console.log(data.content, "iohfuef");
  return (
    <div className="pt-40 p-10 flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        <div className="flex flex-col ">
          <span className="text-xl font-semibold">{data?.user.email}</span>
          <span className="text-sm text-gray-400">10.3.2023</span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
      </div>
      <EditorOutput content={data.content} />
      <Comments postSlug={slug} />
    </div>
  );
};

export default Page;
