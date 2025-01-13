import React from "react";
import { NotFound } from "./NotFound";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { uploadFile } from "../utility/uploadFile";
import { useEffect } from "react";
import { extractUrlAndId } from "../utility/utils";
import DeleteAccount from "../components/DeleteAccount";

export const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "nincs",
    },
  });

  if (!user) {
    return <NotFound />;
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const file = data?.file ? data.file[0] : null;
      const { url, id } = file ? await uploadFile(file) : null;
      updateUser(data.displayName, url + "/" + id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full select-none flex-col items-center justify-start gap-2 pt-10">
      <p className="text-2xl uppercase italic tracking-wide text-white">
        - Profile -
      </p>
      <div className="flex w-[70%] flex-col items-center justify-center gap-2 rounded-lg border border-stone-600 bg-black p-4 shadow-md shadow-stone-800">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-fit flex-col items-center justify-center gap-4"
        >
          <div className="flex flex-col items-center justify-center">
            <label className="text-xl font-extralight uppercase tracking-wide text-white">
              Nickname:
            </label>
            <input
              {...register("displayName")}
              type="text"
              className="rounded-lg border border-stone-600 px-2 shadow-md shadow-stone-800"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label className="text-xl font-extralight uppercase tracking-wide text-white">
              Avatar:
            </label>
            <input
              {...register("file", {
                validate: (value) => {
                  if (!value[0]) {
                    return true;
                  }
                  const acceptedFormats = ["jpg", "png"];
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
              })}
              type="file"
              onChange={(e) =>
                setAvatar(URL.createObjectURL(e.target.files[0]))
              }
              className="w-[70%] rounded-lg border border-stone-600 bg-[#1f1f1f] text-lg font-extralight uppercase tracking-wide text-white shadow-md shadow-stone-800"
            />
            <p className="text-lg italic text-red-500">
              {errors?.file?.message}
            </p>
            <input
              type="submit"
              value="Change"
              className="mt-4 cursor-pointer rounded-lg border border-stone-600 bg-[#1f1f1f] px-2 py-1 font-main font-extralight uppercase tracking-wide text-white shadow-md shadow-stone-800 transition-all hover:scale-105"
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
        {avatar && (
          <div className="flex items-center justify-center">
            <img src={avatar} alt="photoName" className="size-24" />
          </div>
        )}
        <DeleteAccount />
      </div>
    </div>
  );
};
