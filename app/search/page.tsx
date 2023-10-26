"use client";

import { ExtendedPost } from "@/types/Types";
import { useState } from "react";
import Image from "next/image";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [suggestions, setSuggestions] = useState(false);
  const router = useRouter();
  const fetchData = async (value) => {
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

  const handleChange = (value) => {
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
  return (
    <div className="min-h-screen w-full pt-20 p-10 flex flex-col gap-2 items-center">
      <div>
        <div className="flex gap-2">
          <input
            onClick={() => setSuggestions(true)}
            className="p-2 border-2 text-black"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Type to search..."
          />
          <button
            onClick={() => handleSearch()}
            className="py-2 px-3 border-2 border-white text-white"
          >
            Search
          </button>
        </div>
        {suggestions && (
          <div className="w-full max-h-[300px] overflow-y-scroll flex flex-col gap-2 ">
            {inputValue !== "" ? (
              results.map((post: ExtendedPost) => {
                const content = post.content as any;
                console.log(content);
                const images = content.blocks.filter(
                  (block: any) => block.type == "image",
                );
                const desc = content.blocks.filter(
                  (block: any) => block.type == "paragraph",
                );
                const image =
                  images?.length > 0 ? images[0].data.file.url : null;
                return (
                  <div
                    key={post.id}
                    onClick={() => router.push(`/posts/${post.slug}`)}
                    className="flex gap-2 cursor-pointer py-1 hover:bg-neutral-600 bg-neutral-800"
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
