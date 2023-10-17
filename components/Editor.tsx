"use client";

import { uploadFiles } from "@/utils/uploadthing";
import EditorJS from "@editorjs/editorjs";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const Editor = () => {
  const ref = useRef<EditorJS | null>();
  const titleRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();
  const router = useRouter();

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
                  console.log(file);
                  const res = await uploadFiles([file], "imageUploader");
                  console.log(res[0]);
                  return {
                    success: 1,
                    file: {
                      url: res[0].fileUrl,
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
  }, [isMounted]);

  const titleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    const blocks = await ref.current?.save();

    const payload = {
      title: data.title,
      content: blocks,
    };

    console.log(payload);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200 text-black">
      <form
        id="subreddit-post-form"
        className="w-fit"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <textarea
            ref={titleRef}
            onChange={titleChange}
            placeholder="title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]"></div>
        </div>
      </form>
    </div>
  );
};
