import { ExtendedPost } from "@/types/Types";
import { Card } from "./Card";
import { Pagination } from "./Pagination";
import { fetchPosts } from "@/lib/utils";
import { baseUrl } from "@/utils/data";

interface CardListProps {
  page: number;
  cat?: string;
  sec?: string;
}

export const CardList: React.FC<CardListProps> = async ({ page, cat, sec }) => {
  const { posts, count } = await fetchPosts(
    `${baseUrl}/api/posts?page=${page}&cat=${cat || ""}&${sec}=true`,
  );
  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-semibold w-full">Recent Posts</h1>

      <div className="flex  gap-3">
        <div className="w-full flex flex-col gap-3">
          {posts?.map((item: ExtendedPost) => {
            return <Card item={item} key={item.id} />;
          })}
        </div>
      </div>
      <Pagination
        cat={cat}
        page={page}
        hasNext={hasNext}
        sec={sec}
        hasPrev={hasPrev}
      />
    </div>
  );
};
