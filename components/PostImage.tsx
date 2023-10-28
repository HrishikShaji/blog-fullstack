"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PostImageProps {
  content: any;
  size: "small" | "medium";
}

export const PostImage: React.FC<PostImageProps> = ({ content, size }) => {
  const [img, setImg] = useState(null);
  useEffect(() => {
    // Use useEffect to fetch and set the image URL
    if (content && content.blocks) {
      const images = content.blocks.filter(
        (block: any) => block.type === "image",
      );
      const image = images?.length > 0 ? images[0].data.file.url : null;
      setImg(image);
    } else {
      setImg(content);
    }
  }, [content]); // Only run this effect when content changes

  if (!img)
    return (
      <div
        className={cn("bg-gray-500 flex justify-center items-center", {
          "w-10 h-10": size === "small",
          "w-40 h-40": size === "medium",
        })}
      >
        ?
      </div>
    );

  return (
    <Image
      alt="image"
      height={1000}
      width={1000}
      className={cn("object-cover", {
        "w-10 h-10": size === "small",
        "w-40 h-40": size === "medium",
      })}
      src={img}
    />
  );
};
