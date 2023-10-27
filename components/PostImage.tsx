"use client";
import Image from "next/image";

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
  const images = content.blocks.filter((block: any) => block.type == "image");
  const image = images?.length > 0 ? images[0].data.file.url : null;

  if (!image)
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
      src={image}
    />
  );
};
