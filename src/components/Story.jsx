import React from "react";
import "quill/dist/quill.snow.css";
import Editor from "react-simple-wysiwyg";
import { useState } from "react";
import { useEffect } from "react";

export const Story = ({ setStory, story }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(story);
  }, [story]);

  return (
    <div className="mb-2 mt-2 w-fit shadow-lg shadow-black">
      <Editor
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        onBlur={() => setStory(html)}
        className="max-w-[472px] bg-[#1f1f1f] text-white sm:w-full"
        placeholder="Write your blog!"
        containerProps={{ style: { width: 300 } }}
      />
    </div>
  );
};
