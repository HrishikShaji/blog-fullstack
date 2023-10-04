"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }
  return (
    <div className="flex flex-col gap-2">
      <input placeholder="Title" />
      <div className="flex h-[700px] flex-col items-start">
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-2 border-2 border-white"
        >
          Add
        </button>
        {open && (
          <div className="flex gap-2">
            <button className="px-3 py-2 border-white border-2">image</button>
            <button className="px-3 py-2 border-white border-2">file</button>
            <button className="px-3 py-2 border-white border-2">video</button>
          </div>
        )}
        <ReactQuill
          className="w-full h-full"
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
        <button className="px-3 py-2 border-white border-2">Publish</button>
      </div>
    </div>
  );
};

export default Page;
