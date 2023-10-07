"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import { Post } from "@/types/Types";

interface CommentsProps {
  postSlug: string;
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

export const Comments: React.FC<CommentsProps> = ({ postSlug }) => {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher,
  );

  const [desc, setDesc] = useState("");
  const [reply, setReply] = useState("");
  const [replyForm, setReplyForm] = useState(false);
  const [replies, setReplies] = useState(false);
  const [replyData, setReplyData] = useState(null);
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
      mutate();
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
        {isLoading
          ? "Loading"
          : data?.map((item: Post) => (
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
                      <input
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      />
                      <button onClick={() => handleReply(reply, item.id)}>
                        Reply
                      </button>
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
            ))}
      </div>
    </div>
  );
};
