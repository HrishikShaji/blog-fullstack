import { Comments } from "@/components/Comments";
import { EditorOutput } from "@/components/EditorOutput";
import { formatTimeToNow } from "@/lib/utils";
import { ExtendedPost } from "@/types/Types";
import Image from "next/image";

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

  const data: ExtendedPost = await getData(slug);
  const jdata = JSON.parse(data.content as any);
  return (
    <div className="pt-40 p-10 flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        {data.user.image && (
          <Image
            height={1000}
            width={1000}
            className="h-12 w-12 object-cover"
            alt="image"
            src={data.user.image}
          />
        )}
        <div className="flex flex-col ">
          <span className="text-xl font-semibold">{data?.user.email}</span>
          <span className="text-sm text-gray-400">
            {formatTimeToNow(new Date(data.createdAt))}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
      </div>
      <EditorOutput content={jdata} />

      <Comments postSlug={slug} />
    </div>
  );
};

export default Page;
