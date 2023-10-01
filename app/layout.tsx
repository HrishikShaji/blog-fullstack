import { Navbar } from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-neutral-900 text-white">
        <div className="max-w-[1000px] ml-auto mr-auto bg-neutral-800">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
