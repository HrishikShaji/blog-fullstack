import Link from "next/link";

export const CategoryList = () => {
  return (
    <div className="flex flex-col gap-5 p-10">
      <h1 className="text-xl">Popular categories</h1>
      <div className="w-full flex justify-center items-center">
        <div className="flex gap-4">
          <Link href="/blog?cat=style">Style</Link>
          <Link href="/blog?cat=style">Fashion</Link>
          <Link href="/blog?cat=style">Food</Link>
          <Link href="/blog?cat=style">Travel</Link>
          <Link href="/blog?cat=style">Coding</Link>
        </div>
      </div>
    </div>
  );
};
