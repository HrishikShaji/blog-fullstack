"use client";

import { ExtendedPost } from "@/types/Types";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CustomDropdown } from "@/components/CustomDropdown";
import { categoryValues, sortValues } from "@/utils/data";
import { PostImage } from "@/components/PostImage";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [suggestions, setSuggestions] = useState(false);
  const router = useRouter();
  const fetchData = async (value: string) => {
    if (value !== "") {
      await fetch("/api/search")
        .then((response) => response.json())
        .then((json) => {
          const results = json.filter((post: ExtendedPost) => {
            return post && post.slug && post.slug.toLowerCase().includes(value);
          });
          setResults(results);
        });
    }
  };

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== searchRef.current && e.target !== inputRef.current) {
        setSuggestions(false);
      }
    });
  }, []);

  const handleChange = (value: string) => {
    setInputValue(value);
    fetchData(value);
  };

  const handleSearch = async () => {
    setSuggestions(false);
    if (inputValue !== "") {
      await fetch("/api/search")
        .then((response) => response.json())
        .then((json) => {
          const results = json.filter((post: ExtendedPost) => {
            return (
              post && post.slug && post.slug.toLowerCase().includes(inputValue)
            );
          });
          setFinalResults(results);
        });
    }
  };

  return (
    <div className="min-h-screen w-full pt-20 p-10 flex flex-col gap-2 items-center">
      <div className="w-[50vw] relative">
        <div className="flex gap-2 relative">
          <input
            ref={inputRef}
            onClick={() => setSuggestions(true)}
            className="p-2 border-2 text-black w-full"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Type to search..."
          />
          <button
            onClick={() => handleSearch()}
            className="p-2  absolute font-semibold text-black right-0"
          >
            Search
          </button>
        </div>
        {suggestions && (
          <div
            ref={searchRef}
            className=" w-full max-h-[300px] overflow-y-scroll absolute z-10 bg-neutral-600 flex flex-col  "
          >
            {inputValue !== "" ? (
              results.map((post: ExtendedPost) => {
                return (
                  <div
                    key={post.id}
                    onClick={() => router.push(`/posts/${post.slug}`)}
                    className="flex gap-2 cursor-pointer p-1 hover:bg-neutral-500 bg-neutral-600"
                  >
                    <PostImage content={post.content} height="10" width="10" />
                    <div>
                      <h1>{post.title}</h1>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Suggestions</h1>
            )}
          </div>
        )}
      </div>
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
