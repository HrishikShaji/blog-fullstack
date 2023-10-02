import { Card } from "./Card";
import { Pagination } from "./Pagination";

export const CardList = () => {
  return (
    <div>
      <h1 className="text-3xl">Recent Posts</h1>
      <div>
        <Card />
      </div>
      <Pagination />
    </div>
  );
};
