"use client";

import { ExtendedPost } from "@/types/Types";
import { useState } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async (value) => {
    await fetch("/api/search")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        const results = json.filter((post: ExtendedPost) => {
          return post && post.slug && post.slug.toLowerCase().includes(value);
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInputValue(value);
    fetchData(value);
  };
  return (
    <div className="min-h-screen w-full pt-20 p-10 flex flex-col gap-10 items-center">
      <div className="flex gap-2">
        <input
          className="p-2 border-2 text-black"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Type to search..."
        />
        <button className="py-2 px-3 border-2 border-white text-white">
          Search
        </button>
      </div>
      <div>
        {results.map((post: ExtendedPost) => (
          <div key={post.id}>
            <h1>{post.slug}</h1>
            <h1>{post.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
