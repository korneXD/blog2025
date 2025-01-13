import React from "react";
import { useContext } from "react";
import { CategContext } from "../context/CategContext";
import { NavLink } from "react-router-dom";

export const Home = () => {
  const { categories } = useContext(CategContext);
  console.log(categories);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start pb-4 pt-10">
      <p className="mb-2 text-xl uppercase italic text-white">- Categories -</p>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 px-4">
        {categories &&
          categories.map((obj) => (
            <NavLink
              to={"/posts?ctg=" + obj.name}
              key={obj.id}
              className="flex flex-col items-center justify-center rounded-md border border-stone-600 bg-black shadow-md shadow-stone-800"
            >
              <img
                src={obj.photoUrl}
                alt="photo"
                className="h-64 w-64 rounded-t-md border-b border-[#1b1b1f] bg-black object-cover"
              />
              <h1 className="py-2 text-xl font-extralight uppercase tracking-widest text-stone-300">
                {obj.name}
              </h1>
            </NavLink>
          ))}
      </div>
    </div>
  );
};
