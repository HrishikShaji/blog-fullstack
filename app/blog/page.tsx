import { CardList } from "@/components/CardList";

type SearchParams = {
  cat: string;
  sec: string;
  page: string;
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
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
