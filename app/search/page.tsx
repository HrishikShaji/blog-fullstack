"use client";

import { ExtendedPost } from "@/types/Types";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CustomDropdown } from "@/components/CustomDropdown";
import { categoryValues, sortValues } from "@/utils/data";
import { PostImage } from "@/components/PostImage";
import { SearchResult } from "@/components/SearchResult";
import { SearchBar } from "@/components/SearchBar";

const Page = () => {
  const [finalResults, setFinalResults] = useState<ExtendedPost[]>([]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="min-h-screen w-full pt-20 p-10 flex flex-col gap-2 items-center">
      <SearchBar
        finalResults={finalResults}
        setFinalResults={setFinalResults}
      />
      <div className="w-full">
        {finalResults.length > 0 && (
          <div className="flex gap-2">
            <CustomDropdown
              setFinalResults={setFinalResults}
              inputValue={inputValue}
              values={sortValues}
              type="sort"
            />
            <CustomDropdown
              setFinalResults={setFinalResults}
              inputValue={inputValue}
              values={categoryValues}
              type="filter"
            />
          </div>
        )}
        {finalResults.map((post: ExtendedPost) => {
          const content = post.content as any;
          const desc = content.blocks.filter(
            (block: any) => block.type == "paragraph",
          );
          return (
            <div key={post.id} className="w-full p-5 flex gap-2">
              <PostImage content={post.content} height="40" width="40" />
              <div className="flex flex-col justify-between">
                <div>
                  <h1>{post.title}</h1>
                  <h1>{desc.data?.text}</h1>
                  <h1>{post.votes.length}</h1>
                  <h1>{post.catSlug}</h1>
                </div>
                <div>
                  {post.user.image && (
                    <Image
                      className="h-10 w-10 object-cover"
                      height={1000}
                      width={1000}
                      alt="image"
                      src={post?.user?.image}
                    />
                  )}
                  <div>
                    <h1>{post.user.email}</h1>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
