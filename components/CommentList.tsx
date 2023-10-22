"use client";

import { useState } from "react";
import { CommentChild } from "@/types/Types";
import { Comment } from "./Comment";
import useSWR from "swr";
import { date } from "zod";

interface CommentListProps {
  comments: any;
  postSlug: string | null;
  commentId?: string;
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

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  postSlug,
  commentId,
}) => {
  const [showReplies, setShowReplies] = useState(
    comments ? Array(comments.length).fill(false) : [],
  );
  const [replies, setReplies] = useState(null);
  const { data, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/comments/${commentId}?postSlug=${postSlug}`,
    fetcher,
  );
  const toggleReplies = async (index: number, commentId: string) => {
    const newShowReplies = [...showReplies];
    newShowReplies[index] = !newShowReplies[index];
    setShowReplies(newShowReplies);

    const response = await fetch(
      `http://localhost:3000/api/comments/${commentId}?postSlug=${postSlug}`,
      { method: "GET" },
    );
    const data = response.json();
    const res = data.then((res) => setReplies(res));
    console.log("replies are ", commentId, postSlug, replies);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {comments?.map((comment: any, index: number) => {
        return (
          <div
            key={comment.id}
            className="border-b-2 pb-4 flex flex-col gap-2 items-start border-white"
          >
            <Comment item={comment} postSlug={postSlug} />
            <button
              onClick={() => toggleReplies(index, comment.id)}
              className="px-2 font-semibold text-gray-400  py-1 text-xs border-2 border-gray-400 focus:outline-none"
            >
              {showReplies[index] ? "Hide Replies" : "Show Replies"}
            </button>
            {showReplies[index] && comment.children.length > 0 && (
              <div className="ml-10 w-full">
                <CommentList
                  comments={replies}
                  postSlug={postSlug}
                  commentId={comment.id}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
