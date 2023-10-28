"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PostImageProps {
  content: any;
  height: string;
  width: string;
}

export const PostImage: React.FC<PostImageProps> = ({
  content,
  height,
  width,
}) => {
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
        className={`h-${height} w-${width} bg-gray-500 flex justify-center items-center`}
      >
        ?
      </div>
    );

  return (
    <Image
      alt="image"
      height={1000}
      width={1000}
      className={`h-${height} w-${width} object-cover`}
      src={img}
    />
  );
};
