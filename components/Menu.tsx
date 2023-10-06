import { MenuPosts } from "./MenuPosts";
import { MenuCategories } from "./MenuCategories";

export const Menu = () => {
  return (
    <div className="flex flex-col gap-4">
      <MenuPosts heading="Popular posts" />
      <MenuCategories />
      <MenuPosts heading="Editors picks" />
    </div>
  );
};
