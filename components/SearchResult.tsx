"use client";
import { useRouter } from "next/navigation";
import { PostImage } from "./PostImage";

interface SearchResultProps {
  slug: string;
  content: any;
  title: string;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  slug,
  content,
  title,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/posts/${slug}`)}
      className="flex gap-2 cursor-pointer p-1 hover:bg-neutral-500 bg-neutral-600"
    >
      <PostImage content={content} size="small" />
      <div>
        <h1>{title}</h1>
      </div>
    </div>
  );
};
