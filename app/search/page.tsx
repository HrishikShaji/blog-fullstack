"use client";

import { ExtendedPost } from "@/types/Types";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [suggestions, setSuggestions] = useState(false);
  const router = useRouter();
  const fetchData = async (value: string) => {
    if (value !== "") {
      console.log(value);
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

  const handleChange = (value: string) => {
    setInputValue(value);
    fetchData(value);
  };

  const handleSearch = async () => {
    setSuggestions(false);
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
  };

  const handleSort = async (sort: string) => {
    await fetch(`/api/search?sort=${sort}`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((post: ExtendedPost) => {
          return (
            post && post.slug && post.slug.toLowerCase().includes(inputValue)
          );
        });
        setFinalResults(results);
      });
  };

  const handleFilter = async (filter: string) => {
    await fetch(`/api/search?filter=${filter}`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((post: ExtendedPost) => {
          return (
            post && post.slug && post.slug.toLowerCase().includes(inputValue)
          );
        });
        setFinalResults(results);
      });
  };
  return (
    <div className="min-h-screen w-full pt-20 p-10 flex flex-col gap-2 items-center">
      <div className="w-[50vw] relative">
        <div className="flex gap-2 relative">
          <input
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
          <div className=" w-full max-h-[300px] overflow-y-scroll absolute z-10 bg-neutral-600 flex flex-col  ">
            {inputValue !== "" ? (
              results.map((post: ExtendedPost) => {
                const content = post.content as any;
                const images = content.blocks.filter(
                  (block: any) => block.type == "image",
                );
                const image =
                  images?.length > 0 ? images[0].data.file.url : null;
                return (
                  <div
                    key={post.id}
                    onClick={() => router.push(`/posts/${post.slug}`)}
                    className="flex gap-2 cursor-pointer p-1 hover:bg-neutral-500 bg-neutral-600"
                  >
                    {image ? (
                      <Image
                        alt="image"
                        height={1000}
                        width={1000}
                        className="h-10 w-10 object-cover"
                        src={image}
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-500 flex justify-center items-center">
                        ?
                      </div>
                    )}
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
          <>
            <div className="flex flex-col items-center gap-2">
              <h1>Sort By</h1>
              <div className="flex gap-2">
                <button onClick={() => handleSort("createdAt")}>Date</button>
                <button onClick={() => handleSort("views")}>Views</button>
                <button onClick={() => handleSort("votes")}>Likes</button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1>Filter By</h1>
              <div className="flex gap-2">
                <button onClick={() => handleFilter("style")}>Frontend</button>
                <button onClick={() => handleFilter("travel")}>Backend</button>
                <button onClick={() => handleFilter("coding")}>UI/UX</button>
                <button onClick={() => handleFilter("devops")}>DevOps</button>
                <button onClick={() => handleFilter("ai")}>AI</button>
                <button onClick={() => handleFilter("blockchain")}>
                  Blockchain
                </button>
              </div>
            </div>
          </>
        )}
        {finalResults.map((post: ExtendedPost) => {
          const content = post.content as any;
          const images = content.blocks.filter(
            (block: any) => block.type == "image",
          );
          const desc = content.blocks.filter(
            (block: any) => block.type == "paragraph",
          );
          console.log(desc);
          const image = images?.length > 0 ? images[0].data.file.url : null;
          return (
            <div key={post.id} className="w-full p-5 flex gap-2">
              {image ? (
                <Image
                  alt="image"
                  height={1000}
                  width={1000}
                  className="h-40 w-40 object-cover"
                  src={image}
                />
              ) : (
                <div className="h-40 w-40 bg-gray-500 flex justify-center items-center">
                  ?
                </div>
              )}
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
