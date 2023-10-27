"use client";

import { ExtendedPost } from "@/types/Types";
import { useState } from "react";

interface CustomDropdownProps {
  values: any[];
  type: string;
  setFinalResults: (results: any) => void;
  inputValue: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  values,
  type,
  setFinalResults,
  inputValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleFunction = async (field: string) => {
    setSelectedItem(field);
    await fetch(`/api/search?${type}=${field}`)
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
    <div className="flex flex-col items-center gap-2 w-[200px]">
      <div className="flex gap-2 border-2 border-white  justify-between p-2 w-full">
        <h1>{selectedItem || "Sort By"}</h1>
        <button onClick={() => setIsOpen(!isOpen)}>Select</button>
      </div>
      {isOpen && (
        <div className="flex flex-col bg-neutral-500  w-full">
          {values.map((item, i) => (
            <button
              key={i}
              className="border-b-2 border-white py-2"
              onClick={() => handleFunction(item.value)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
