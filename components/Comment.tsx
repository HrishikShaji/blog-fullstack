import { CommentChild, ExtendedPost } from "@/types/Types";
import Image from "next/image";
import { useState } from "react";

interface CommentProps {
  item: CommentChild;
  postSlug: string | null;
}

export const Comment: React.FC<CommentProps> = ({ item, postSlug }) => {
  const [replies, setReplies] = useState(false);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const handleReply = async (desc: string, parentId: string) => {
    try {
      setLoading(true);

      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ desc, postSlug, parentId }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDesc("");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col w-full gap-6 border-b border-gray-700 pt-2 pb-5"
      key={item.id}
    >
      <div>
        <div className="flex gap-2 items-start w-full">
          {item.user.image && (
            <Image
              className="h-14 w-14 rounded-full"
              src={item.user.image}
              alt="image"
              height={1000}
              width={1000}
            />
          )}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{item.user.email}</span>
              <span className="text-xs text-gray-400">10.3.2023</span>
            </div>
            <div>
              <p>{item.desc}</p>
            </div>
            <div className="w-full">
              <button
                onClick={() => setReplies(!replies)}
                className="py-1 px-3 border-2 border-white"
              >
                {replies ? "Cancel" : "Reply"}
              </button>
              {replies && (
                <form className="w-full flex gap-2">
                  <input
                    className="w-full bg-transparent border-b-2 focus:outline-none border-white"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    className="py-1 px-3 border-2 border-white"
                    onClick={() => handleReply(reply, item.id)}
                  >
                    Reply
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
