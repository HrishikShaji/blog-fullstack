"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import { Comment } from "./Comment";
import { CommentList } from "./CommentList";

interface CommentsProps {
  postSlug: string;
  isReply?: boolean;
  parentId?: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

export const Comments: React.FC<CommentsProps> = ({
  postSlug,
  isReply,
  parentId,
}) => {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher,
  );

  const [desc, setDesc] = useState("");
  const handleSubmit = async (desc: string) => {
    try {
      setLoading(true);

      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ desc, postSlug }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
      setDesc("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <h1>Comments</h1>
      {status === "authenticated" ? (
        <div className="flex gap-2 w-full">
          <textarea
            className="w-full bg-transparent border-b-2 text-white focus:outline-none border-white"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button
            onClick={() => handleSubmit(desc)}
            className="px-3 py-2 border-white border-2"
          >
            {loading ? "sending" : "Send"}
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className="flex flex-col gap-6 ">
        {isLoading ? (
          "Loading"
        ) : (
          <CommentList comments={data} postSlug={postSlug} />
        )}
      </div>
    </div>
  );
};
