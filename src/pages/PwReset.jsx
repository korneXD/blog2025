import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Toastify from "../components/Toastify";

export const PwReset = () => {
  const { msg, resetPassword } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("email"));
    resetPassword(data.get("email"));
  };

  return (
    <div className="mx-auto flex min-h-screen w-fit items-start justify-center pt-10 font-main">
      <div className="flex h-[300px] w-fit flex-col items-center justify-center rounded-[15px] border border-stone-600 bg-black px-3 py-1 pt-16 shadow-md shadow-stone-800">
        <h1 className="text-center text-2xl font-extralight uppercase tracking-wide text-white">
          Reset Password
        </h1>
        <form
          className="mb-2 mt-6 flex h-fit w-fit flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <input
              name="email"
              placeholder="Email"
              className="placeholder:text-md mx-4 w-fit max-w-[200px] rounded-[40px] border border-stone-600 bg-[#1f1f1f] p-2 text-center text-xl font-extralight uppercase tracking-wide text-white placeholder-white shadow-md shadow-stone-800 outline-none"
            />
          </div>
          <button className="mt-4 w-[80%] rounded-[20px] border border-stone-600 bg-[#101010] py-1 text-center text-xl font-extralight uppercase tracking-wide text-white shadow-md shadow-stone-800 transition-all hover:scale-y-105">
            Reset
          </button>
        </form>
        {msg && <Toastify {...msg} />}
      </div>
    </div>
  );
};
