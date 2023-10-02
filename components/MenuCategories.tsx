import Link from "next/link";

export const MenuCategories = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Categories</h1>

      <div className="grid grid-cols-3">
        <Link href="/blog?cat=style">Style</Link>

        <Link href="/blog?cat=style">Culture</Link>
        <Link href="/blog?cat=style">Fashion</Link>
        <Link href="/blog?cat=style">Food</Link>
        <Link href="/blog?cat=style">Travel</Link>
        <Link href="/blog?cat=style">Coding</Link>
      </div>
    </div>
  );
};
