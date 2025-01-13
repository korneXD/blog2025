import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, readPost, toggleLikes } from "../utility/crudUtility";
import { useState } from "react";
import parse from "html-react-parser";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { delPhoto } from "../utility/uploadFile";

const Detail = ({}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const params = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    readPost(setPost, params.id);
  }, [post]);

  const handleLikes = () => {
    if (!user) console.log("Nem vagy bejelentkezve");
    else toggleLikes(post.id, user.uid);
  };

  useEffect(() => {
    console.log(post.likes?.length);
  }, [post.likes?.length]);

  const handleDelete = () => {
    deletePost(params.id);
    delPhoto(post.photo?.id);
    navigate("/posts");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-start p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="absolute left-2 size-6 cursor-pointer text-stone-600 transition-all hover:scale-105 hover:text-white"
        onClick={() => navigate("/posts")}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>

      <h1 className="max-w-[80%] break-words pb-2 text-3xl font-extralight text-white">
        {post.title}
      </h1>
      <img
        src={post.photo?.url}
        alt="Hiányzó fotó!"
        className="h-fit w-[450px] select-none rounded-lg border-2 border-stone-600 object-contain shadow-md shadow-stone-800"
      />
      <div className="mx-auto flex w-full items-start justify-between px-2 py-2">
        <div className="flex flex-row items-center justify-center gap-4">
          <h1 className="flex flex-row gap-2 text-lg font-extralight text-white">
            Made by:
            <span className="text-lg font-normal text-stone-500">
              {post.author}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <button onClick={handleLikes}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
            </button>
            <p className="text-blue-500">{post.likes?.length || 0}</p>
          </div>
        </div>
        {user && post && user.uid == post.userId && (
          <div className="flex flex-row items-center justify-center gap-4">
            <button
              className="rounded-[50%] bg-blue-500 px-1 py-1"
              onClick={() => navigate("/update/" + post.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="rounded-[50%] bg-red-500 px-1 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 px-10">
        <p className="left-4 flex gap-2 text-lg font-extralight text-white md:absolute">
          Description:
        </p>
        <p className="ml-6 mt-0 w-[80%] max-w-[80%] break-all rounded-lg border border-stone-600 bg-[#1f1f1f] px-2 py-1 text-xl text-white shadow-md shadow-stone-800 md:mt-0">
          {parse(post.story || "")}
        </p>
      </div>
    </div>
  );
};

export default Detail;
