import { Card } from "./Card";
import { Menu } from "./Menu";
import { Pagination } from "./Pagination";

const getData = async (page, cat, sec) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}&${sec}=true`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

interface CardListProps {
  page: number;
  cat?: string;
  sec?: string;
}

export const CardList: React.FC<CardListProps> = async ({ page, cat, sec }) => {
  const { posts, count } = await getData(page, cat, sec);
  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  console.log(sec, page, count);
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-semibold w-full">Recent Posts</h1>

      <div className="flex  gap-3">
        <div className="w-full flex flex-col gap-3">
          {posts?.map((item) => <Card item={item} key={item.id} />)}
        </div>
      </div>
      <Pagination page={page} hasNext={hasNext} sec={sec} hasPrev={hasPrev} />
    </div>
  );
};
