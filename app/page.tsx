import { CardList } from "@/components/CardList";
import { CategoryList } from "@/components/CategoryList";
import { EditorsPosts } from "@/components/EditorsPosts";
import { Featured } from "@/components/Featured";
import { PopularPosts } from "@/components/PopularPosts";

type SearchParams = {
  page: string;
};

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <main className="pt-40 p-10 flex flex-col gap-5">
      <Featured />
    </main>
  );
}
