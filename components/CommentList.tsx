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

  const toggleReplies = (index) => {
    const newShowReplies = [...showReplies];
    newShowReplies[index] = !newShowReplies[index];
    setShowReplies(newShowReplies);
  };

  return (
    <div>
      {comments.map((comment, index) => {
        console.log(comment);
        return (
          <div key={comment.id}>
            <Comment item={comment} postSlug={postSlug} />
            <button
              onClick={() => toggleReplies(index)}
              className="px-3 ml-10 py-2 border-2 border-white"
            >
              Replies
            </button>
            {showReplies[index] && comment.children.length > 0 && (
              <div className="ml-10">
                <CommentList comments={comment.children} postSlug={postSlug} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
