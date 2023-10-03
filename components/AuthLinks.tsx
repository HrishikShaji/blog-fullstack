"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const AuthLinks = () => {
  const { status } = useSession();
  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login">Login</Link>
      ) : (
        <>
          <Link href="/write">Write</Link>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}
    </>
  );
};
