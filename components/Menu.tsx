import Link from "next/link";
import Image from "next/image";
import { MenuPosts } from "./MenuPosts";

export const Menu = () => {
  return (
    <div className="flex flex-col gap-4">
      <MenuPosts heading="Popular posts" />
      <div className="flex flex-col gap-4">
        <h1>Categories</h1>
        <div className="grid grid-cols-3 gap-3">
          <Link href="/">Style</Link>
          <Link href="/">Style</Link>
          <Link href="/">Style</Link>
          <Link href="/">Style</Link>
          <Link href="/">Style</Link>
          <Link href="/">Style</Link>
        </div>
      </div>
      <MenuPosts heading="Editors picks" />
    </div>
  );
};
