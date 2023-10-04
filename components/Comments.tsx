"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";

interface CommentsProps {
  postSlug: string;
}

const fetcher = async (url) => {
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

  const { data, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher,
  );
  return (
    <div className="flex flex-col gap-10">
      <h1>Comments</h1>
      {status === "authenticated" ? (
        <div className="flex gap-2">
          <textarea />
          <button>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className="flex flex-col gap-2">
        {isLoading
          ? "Loading"
          : data?.map((item) => (
              <div className="flex flex-col gap-4" key={item.id}>
                <div className="flex gap-2">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400"
                    alt="image"
                    height={1000}
                    width={1000}
                  />
                  <div>
                    <span>{item.user.email}</span>
                    <span>10.3.2023</span>
                  </div>
                </div>
                <div>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
