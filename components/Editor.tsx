"use client";

import { uploadFiles } from "@/utils/uploadthing";
import EditorJS from "@editorjs/editorjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";

export const Editor = () => {
  const ref = useRef<EditorJS | null>();
  const [isMounted, setIsMounted] = useState(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");

  const initializedEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const inlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          LinkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  if (!file) {
                    return { success: 0, file: { url: null } };
                  }
                  const res = await uploadFiles({
                    files: [file],
                    endpoint: "imageUploader",
                  });
                  return {
                    success: 1,
                    file: {
                      url: res[0].url,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: inlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializedEditor();
      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    }

    return () => {
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, [isMounted, initializedEditor]);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async (payload: PostCreationRequest) => {
      const { data } = await axios.post("/api/comments", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Comment not posted",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Done",
        description: "Post Created Successfully",
        variant: "default",
      });
      router.push("/");
    },
  });

  const validatePostData = (inputs: unknown) => {
    const isValidData = PostValidator.parse(inputs);
    return isValidData;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const blocks = await ref.current?.save();
    const payload = {
      title: title,
      content: blocks,
      slug: slugify(title),
      cat: cat,
    };

    const validatedPostData = validatePostData(payload);

    createPost(validatedPostData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200 text-black">
      <form id="subreddit-post-form" className="w-fit" onSubmit={handleSubmit}>
        <div className="prose prose-stone dark:prose-invert">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <input
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            placeholder="Category"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]"></div>
        </div>
        <button className="text-white bg-black py-1 px-2 rounded-md">
          {isPending ? "uploading" : "POST"}
        </button>
      </form>
    </div>
  );
};
