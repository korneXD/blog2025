import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../utility/crudUtility";

const DeleteAccount = () => {
  const { user, logOutUser, deleteAccount } = useContext(UserContext);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setConfirm(false);
    await deleteAccount();
    logOutUser();
    navigate("/");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <p
        className="w-fit cursor-pointer rounded-xl border border-stone-600 bg-red-500 px-2 py-1 font-extralight uppercase tracking-wide text-white shadow-md shadow-stone-800 transition-all hover:scale-105"
        onClick={() => setConfirm((confirm) => !confirm)}
      >
        Delete Account
      </p>
      {confirm && (
        <div className="mt-2 rounded-xl bg-[#1f1f1f] p-2 shadow-sm shadow-stone-600">
          <p className="font-extralight uppercase tracking-wide text-white">
            Are you sure to delete your account?
          </p>
          <div className="flex flex-row items-center justify-center gap-10 font-bold">
            <p
              onClick={handleDelete}
              className="cursor-pointer rounded-lg bg-black px-2 py-1 text-white shadow-sm shadow-stone-600"
            >
              Yes
            </p>
            <p
              onClick={() => setConfirm(false)}
              className="cursor-pointer rounded-lg bg-black px-2 py-1 text-white shadow-sm shadow-stone-600"
            >
              No
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
