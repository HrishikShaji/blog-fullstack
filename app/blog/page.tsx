import { CardList } from "@/components/CardList";
import { Menu } from "@/components/Menu";

const Page = () => {
  return (
    <div>
      <h1>Style Blog</h1>
      <div>
        <CardList page={2} />
      </div>
    </div>
  );
};

export default Page;
