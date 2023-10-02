import { Card } from "./Card";
import { Menu } from "./Menu";
import { Pagination } from "./Pagination";

export const CardList = () => {
  return (
    <div>
      <h1 className="text-3xl w-full">Recent Posts</h1>
      <div className="flex gap-3">
        <div className="w-[75%]">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <Menu />
      </div>
      <Pagination />
    </div>
  );
};
