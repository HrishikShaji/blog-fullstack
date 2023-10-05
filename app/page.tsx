import { CardList } from "@/components/CardList";
import { CategoryList } from "@/components/CategoryList";
import { EditorsPosts } from "@/components/EditorsPosts";
import { Featured } from "@/components/Featured";
import { Menu } from "@/components/Menu";
import { PopularPosts } from "@/components/PopularPosts";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  console.log(page);
  return (
    <main className="p-10 flex flex-col gap-5">
      <Featured />
      <CategoryList />
      <PopularPosts />
      <EditorsPosts />
      <div>
        <CardList page={page} />
      </div>
    </main>
  );
}
