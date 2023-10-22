"use client";

import { useState } from "react";
import { CommentChild } from "@/types/Types";
import { Comment } from "./Comment";
import useSWR from "swr";

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
    Array(comments.length).fill(false),
  );

  const { data, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/comments/${commentId}?postSlug=${postSlug}`,
    fetcher,
  );
  console.log(commentId);
  const toggleReplies = (index: number) => {
    const newShowReplies = [...showReplies];
    newShowReplies[index] = !newShowReplies[index];
    setShowReplies(newShowReplies);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {comments.map((comment: CommentChild, index: number) => {
        return (
          <div
            key={comment.id}
            className="border-b-2 pb-4 flex flex-col gap-2 items-start border-white"
          >
            <Comment item={comment} postSlug={postSlug} />
            <button
              onClick={() => toggleReplies(index)}
              className="px-2 font-semibold text-gray-400  py-1 text-xs border-2 border-gray-400 focus:outline-none"
            >
              {showReplies[index] ? "Hide Replies" : "Show Replies"}
            </button>
            {showReplies[index] && comment.children.length > 0 && (
              <div className="ml-10 w-full">
                <CommentList
                  comments={comment.children}
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
