"use client";

import { useState } from "react";
import { Comment } from "../components/Comment";

interface CommentListProps {
  comments: any;
  postSlug: string | null;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  postSlug,
}) => {
  const [showReplies, setShowReplies] = useState(
    Array(comments.length).fill(false),
  );

  const toggleReplies = (index: number) => {
    const newShowReplies = [...showReplies];
    newShowReplies[index] = !newShowReplies[index];
    setShowReplies(newShowReplies);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {comments.map((comment, index: number) => {
        return (
          <div
            key={comment.id}
            className="border-b-2 pb-4 flex flex-col gap-2 items-start border-white"
          >
            <Comment item={comment} postSlug={postSlug} />
            <button
              onClick={() => toggleReplies(index)}
              className="px-3  py-1 border-2 border-white"
            >
              {showReplies[index] ? "Hide Replies" : "Show Replies"}
            </button>
            {showReplies[index] && comment.children.length > 0 && (
              <div className="ml-10 w-full">
                <CommentList comments={comment.children} postSlug={postSlug} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
