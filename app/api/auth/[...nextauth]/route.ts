import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { authOptions } from "@/utils/auth";

export default NextAuth(authOptions);
