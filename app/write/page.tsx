"use client";

import { warn } from "console";
import { useState } from "react";
import ReactQuill from "react-quill";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div>
      <input placeholder="Title" />
      <div>
        <button>Add</button>
        {open && (
          <div className="flex gap-2">
            <button>image</button>
            <button>file</button>
            <button>video</button>
          </div>
        )}
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
    </div>
  );
};

export default Page;
