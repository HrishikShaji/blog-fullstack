"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex justify-center h-screen items-center">
      <div>
        <div
          className="px-3 py-2 border-white border-2 cursor-pointer"
          onClick={() => signIn("google")}
        >
          Signin with Google
        </div>
      </div>
    </div>
  );
};

export default Page;
