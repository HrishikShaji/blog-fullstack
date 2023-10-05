"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cache, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import Image from "next/image";

const storage = getStorage(app);

const Page = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [file, setFile] = useState(null);
  const { data, status } = useSession();
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");

  const router = useRouter();

  useEffect(() => {
    const upload = () => {
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        },
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: cat,
      }),
    });
    console.log(res);
  };
  return (
    <div className="flex flex-col gap-6 pt-40 p-10">
      <input
        className="border-b border-gray-700 bg-transparent p-2 focus:outline-none"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border-b border-gray-700 bg-transparent p-2 focus:outline-none"
        placeholder="Category"
        onChange={(e) => setCat(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-2 border-2 border-white"
        >
          Add
        </button>
        {open && (
          <div className="flex gap-2">
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className="px-3 py-2 border-white border-2">
              <label htmlFor="image">Image</label>
            </button>
            <button className="px-3 py-2 border-white border-2">file</button>
            <button className="px-3 py-2 border-white border-2">video</button>
          </div>
        )}
      </div>
      {media && (
        <Image
          src={media}
          height={1000}
          width={1000}
          alt="image"
          className="w-full h-full object-cover"
        />
      )}
      <textarea
        className="w-full min-h-screen p-2 focus:outline-none bg-transparent"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tell your story..."
      />
      <button
        onClick={handleSubmit}
        className="px-3 py-2 border-white border-2"
      >
        Publish
      </button>
    </div>
  );
};

export default Page;
