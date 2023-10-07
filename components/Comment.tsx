import { Post } from "@/types/Types";
import Image from "next/image";
import { useState } from "react";

interface CommentProps {
  item: Post;
  postSlug: string;
}

export const Comment: React.FC<CommentProps> = ({ item, postSlug }) => {
  const [replyForm, setReplyForm] = useState(false);
  const [replies, setReplies] = useState(false);
  const [replyData, setReplyData] = useState(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const handleReply = async (desc: string, parentId: string) => {
    try {
      setLoading(true);

      await fetch("/api/replies", {
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

  const fetchReplies = async (parentId: string) => {
    setReplies(!replies);

    const data = await fetch(`/api/replies?parentId=${parentId}`, {
      method: "GET",
    });
    const res = await data.json();
    setReplyData(res);
  };
  return (
    <div
      className="flex flex-col gap-2 border-b border-gray-700 pb-5"
      key={item.id}
    >
      <div className="flex gap-2 items-center">
        <Image
          className="h-14 w-14 rounded-full"
          src={item.user.image}
          alt="image"
          height={1000}
          width={1000}
        />
        <div className="flex flex-col ">
          <span className="">{item.user.email}</span>
          <span className="text-sm text-gray-400">10.3.2023</span>
        </div>
      </div>
      <div>
        <p>{item.desc}</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setReplyForm(!replyForm)}
            className="px-3 py-2 border-2 border-white"
          >
            Reply
          </button>
          <button
            onClick={() => fetchReplies(item.id)}
            className="px-3 py-2 border-2 border-white"
          >
            Replies
          </button>
        </div>
        {replyForm && (
          <form className="">
            <input value={reply} onChange={(e) => setReply(e.target.value)} />
            <button onClick={() => handleReply(reply, item.id)}>Reply</button>
          </form>
        )}
        {replies && (
          <div>
            {replyData?.map((item) => (
              <div key={item.id}>
                <h1>{item.desc}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
