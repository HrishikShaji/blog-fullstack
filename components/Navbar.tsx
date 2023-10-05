import Link from "next/link";
import { AuthLinks } from "./AuthLinks";

export const Navbar = () => {
  return (
    <div className="p-5 fixed top-0 z-50 bg-neutral-900 w-[1000px] flex justify-between ">
      <div className="">
        <h1 className="text-xl font-bold">BLOG</h1>
      </div>
      <div className="flex gap-2">
        <Link href="/">Home</Link>
        <Link href="/">Contact</Link>
        <Link href="/">About</Link>
        <AuthLinks />
      </div>
    </div>
  );
};
