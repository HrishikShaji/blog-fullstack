import { CardList } from "@/components/CardList";
import { Menu } from "@/components/Menu";

const Page = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;
  const { sec } = searchParams;

  return (
    <div>
      <h1>{cat} Blog</h1>
      <div>
        <CardList page={page} cat={cat} sec={sec} />
      </div>
    </div>
  );
};

export default Page;
