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

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
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
    <div className="flex flex-col gap-2">
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Category" onChange={(e) => setCat(e.target.value)} />
      <div className="flex h-[700px] flex-col items-start">
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
        <ReactQuill
          className="w-full h-full"
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
        <button
          onClick={handleSubmit}
          className="px-3 py-2 border-white border-2"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Page;
