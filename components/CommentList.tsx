"use client";

import { useState } from "react";
import { Comment } from "./Comment";
import { useQuery } from "@tanstack/react-query";
import { ref } from "firebase/storage";

interface CommentListProps {
  comments: any;
  postSlug: string | null;
  commentId?: string;
  refetch?: () => void;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  postSlug,
  commentId,
  refetch,
}) => {
  const [showReplies, setShowReplies] = useState(
    comments ? Array(comments.length).fill(false) : [],
  );
  const [replies, setReplies] = useState([]);
  const toggleReplies = async (index: number, commentId: string) => {
    const newShowReplies = [...showReplies];
    newShowReplies[index] = !newShowReplies[index];
    setShowReplies(newShowReplies);
  };

  console.log(refetch);

  return (
    <div className="w-full overflow-x-hidden">
      {comments?.map((comment: any, index: number) => {
        return (
          <div
            key={comment.id}
            className="border-b-2 pb-4 flex flex-col gap-2 items-start border-white"
          >
            <Comment refetch={refetch} item={comment} postSlug={postSlug} />
            <button
              onClick={() => toggleReplies(index, comment.id)}
              className="px-2 font-semibold text-gray-400  py-1 text-xs border-2 border-gray-400 focus:outline-none"
            >
              {showReplies[index] ? "Hide Replies" : "Show Replies"}
            </button>
            {showReplies[index] && (
              <div className="ml-10 w-full">
                <CommentListContainer
                  commentId={comment.id}
                  postSlug={postSlug}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const CommentListContainer: React.FC<{
  commentId: string;
  postSlug: string | null;
}> = ({ commentId, postSlug }) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["replies", commentId, postSlug],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/comments/${commentId}?postSlug=${postSlug}`,
        { method: "GET" },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch replies");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching replies</div>;
  }

  return (
    <CommentList
      comments={data}
      postSlug={postSlug}
      refetch={refetch}
      commentId={commentId}
    />
  );
};
