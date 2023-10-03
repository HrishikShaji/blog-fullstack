import { Card } from "./Card";
import { Menu } from "./Menu";
import { Pagination } from "./Pagination";

const getData = async (page, cat) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
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
}

export const CardList: React.FC<CardListProps> = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div>
      <h1 className="text-3xl w-full">Recent Posts</h1>
      <div className="flex gap-3">
        <div className="w-[75%]">
          {posts?.map((item) => <Card item={item} key={item.id} />)}
        </div>
        <Menu />
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
};
