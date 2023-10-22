import { CommentChild } from "@/types/Types";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { formatTimeToNow } from "@/lib/utils";

interface CommentProps {
  item: CommentChild;
  postSlug: string | null;
}

export const Comment: React.FC<CommentProps> = ({ item, postSlug }) => {
  const [replies, setReplies] = useState(false);
  const [reply, setReply] = useState("");

  const { mutate: postComment, isPending } = useMutation({
    mutationFn: async ({ desc, postSlug, parentId }: any) => {
      const payload = {
        desc,
        postSlug,
        parentId,
      };
      const { data } = await axios.post("/api/comments", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Comment not posted",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setReply("");
    },
  });

  const handleReply = async (e: FormEvent, desc: string, parentId: string) => {
    e.preventDefault();
    postComment({
      desc,
      postSlug,
      parentId,
    });
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
              <span className="text-xs text-gray-400">
                {formatTimeToNow(new Date(item.createdAt))}
              </span>
            </div>
            <div>
              <p>{item.desc}</p>
            </div>
            <div className="w-full">
              <button
                onClick={() => setReplies(!replies)}
                className="py-1 px-2 border-gray-400 focus:outline-none text-gray-400 font-semibold text-xs border-2"
              >
                {replies ? "Cancel" : "Reply"}
              </button>
              {replies && (
                <form
                  className="w-full flex gap-2"
                  onSubmit={(e) => handleReply(e, reply, item.id)}
                >
                  <input
                    className="w-full bg-transparent border-b-2 focus:outline-none border-white"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="py-1 px-3 border-2 focus:outline-none border-gray-400 text-xs font-semibold text-gray-400"
                  >
                    {isPending ? "Replying" : "Reply"}
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
