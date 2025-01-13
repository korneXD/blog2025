import React from "react";
import { NavLink } from "react-router-dom";
import parse from "html-react-parser";

const PostCard = ({ title, photo, id, story, author, category }) => {
  return (
    <NavLink
      to={"/post/" + id}
      className="mx-auto mt-2 flex h-full w-fit flex-col items-center justify-center rounded-lg border border-stone-600 bg-black shadow-md shadow-stone-800"
    >
      <div className="flex w-full items-start justify-start px-5 pt-2">
        <h1 className="text-lg font-extralight text-white">
          Made by: <span className="font-normal text-stone-500">{author}</span>
        </h1>
      </div>
      <div className="flex items-center justify-center p-2">
        <img
          src={photo}
          alt={title}
          className="h-64 w-[400px] rounded-lg bg-[#1f1f1f] object-cover p-2"
        />
      </div>
      <h1 className="font-extralight text-white">
        Category:{" "}
        <span className="font-normal uppercase tracking-wide text-stone-500">
          {category}
        </span>
      </h1>
      <div className="flex w-full flex-col items-center justify-start pb-2">
        <h1 className="max-w-[300px] truncate text-2xl font-extralight text-white">
          {title}
        </h1>
        <p className="max-w-[300px] truncate font-extralight italic text-white">
          {parse(story)}
        </p>
      </div>
    </NavLink>
  );
};

export default PostCard;
