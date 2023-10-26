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
                const images = content.blocks.filter(
                  (block: any) => block.type == "image",
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
    </div>
  );
};

export default Page;
