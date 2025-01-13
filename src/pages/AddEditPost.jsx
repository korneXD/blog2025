import React from "react";
import { Story } from "../components/Story.jsx";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { CategContext } from "../context/CategContext.jsx";
import { NotFound } from "./NotFound.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadFile } from "../utility/uploadFile.js";
import { addPost, readPost, updatePost } from "../utility/crudUtility.js";
import { DropDown } from "../components/DropDown.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const AddEditPost = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [story, setStory] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const { categories } = useContext(CategContext);
  const [selCateg, setSelCateg] = useState(null);
  const [post, setPost] = useState(null);
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (params?.id) {
      readPost(setPost, params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (post) {
      setValue("title", post?.title);
      setSelCateg(post.category);
      setStory(post?.story);
      setPhoto(post.photo.url);
    }
  }, [post]);

  if (!user) return <NotFound />;

  const onSubmit = async (data) => {
    setLoading(true);
    if (params.id) {
      try {
        updatePost(params.id, { ...data, category: selCateg, story });
      } catch (error) {
        console.log("update", error);
      } finally {
        setLoading(false);
      }
    } else {
      let newPostData = {
        ...data,
        story,
        author: user.displayName,
        userId: user.uid,
        category: selCateg,
        likes: [],
      };
      try {
        const file = data?.file ? data.file[0] : null;
        const { url, id } = file ? await uploadFile(file) : {};
        delete newPostData.file;
        newPostData = { ...newPostData, photo: { url, id } };
        console.log(newPostData);
        addPost(newPostData);
        setUploaded(true);
        reset();
        setPhoto(null);
        setStory(null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-start pt-10">
      <p className="font-lonely mb-2 text-xl uppercase italic text-white">
        - Add Post -
      </p>
      <DropDown
        categories={categories}
        selCateg={selCateg}
        setSelCateg={setSelCateg}
      />
      <Story setStory={setStory} uploaded={uploaded} story={story} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="flex flex-col items-center justify-center">
          <label className="text-xl font-extralight uppercase tracking-wide text-white">
            Post name:
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="rounded-lg border-2 border-stone-600 px-2 shadow-md shadow-stone-800"
          />
          <p className="font-bold text-red-500">
            {errors.title && "Name required!"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <label className="text-xl font-extralight uppercase tracking-wide text-white">
            Photo:
          </label>
          <input
            disabled={params.id}
            {...register(
              "file",
              params.id
                ? {}
                : {
                    required: true,
                    validate: (value) => {
                      if (!value[0]) {
                        return true;
                      }
                      const acceptedFormats = [
                        "jpg",
                        "png",
                        "jfif",
                        "jpeg",
                        "webp",
                      ];
                      const fileExtension = value[0].name
                        .split(".")
                        .pop()
                        .toLowerCase();
                      if (!acceptedFormats.includes(fileExtension)) {
                        return "Invalid file format";
                      }
                      if (value[0].size > 1 * 1000 * 1024) {
                        return "Only images below 1MB";
                      }
                      return true;
                    },
                  },
            )}
            type="file"
            onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
            className="w-[80%] rounded-lg border border-stone-600 bg-[#1f1f1f] text-lg font-extralight uppercase tracking-wide text-white shadow-md shadow-stone-800"
          />
          <p className="text-lg italic text-red-500">{errors?.file?.message}</p>
          <input
            type="submit"
            disabled={!selCateg || !story}
            value="Make Blog"
            className="text-md mt-4 cursor-pointer rounded-lg border border-stone-600 bg-[#1f1f1f] px-2 py-1 font-extralight uppercase tracking-wide text-white shadow-md shadow-stone-800 transition-all hover:scale-105 hover:text-white"
          />
        </div>
      </form>
      {loading && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 animate-spin text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      )}
      {photo && (
        <div className="flex items-center justify-center">
          <img src={photo} alt="photoName" className="size-24" />
        </div>
      )}
    </div>
  );
};
