import { useState } from "react";

export const DropDown = ({ categories, selCateg, setSelCateg }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="select-none">
      <p
        className="cursor-pointer rounded-lg border border-stone-600 bg-black px-6 text-center text-lg font-extralight uppercase tracking-wide text-white shadow-md shadow-stone-800"
        onClick={() => setOpen((open) => !open)}
      >
        {selCateg ? selCateg : "Categories"}
      </p>
      {open && (
        <div className="mb-2 mt-1 flex flex-col items-center justify-center gap-1 rounded-lg bg-[#1f1f1f] px-2 py-2 shadow-md shadow-stone-800">
          {categories &&
            categories.map((categ) => (
              <p
                key={categ.name}
                onClick={() => {
                  setSelCateg(categ.name);
                  setOpen(false);
                }}
                className="w-full cursor-pointer rounded-lg bg-black px-2 text-center font-extralight uppercase tracking-wide text-white shadow-sm shadow-stone-600 transition-all hover:text-slate-400"
              >
                {categ.name}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};
