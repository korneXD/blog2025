import React from "react";
import { readPosts } from "../utility/crudUtility";

const Categories = ({ categories, selCateg, setSelCateg, handleChange }) => {
  return (
    <div className="mb-2 flex flex-row flex-wrap items-center justify-center gap-4">
      {categories &&
        categories.map((e) => (
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg border border-stone-600 bg-black px-2 shadow-md shadow-stone-800"
            key={e.name}
          >
            <input
              type="checkbox"
              name={e.name}
              id={e.name}
              value={e.name}
              checked={selCateg.includes(e.name)}
              onChange={handleChange}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-[50%] border border-black bg-white shadow-inner transition-all checked:border-black checked:bg-stone-600 hover:shadow-md"
            />
            <p
              key={e.name}
              className="px-2 py-1 font-bold text-white transition-all hover:text-stone-500"
            >
              {e.name}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Categories;
