import React from "react";

const Footer = () => {
  return (
    <div className="sticky bottom-0 left-0 mx-auto flex w-full flex-col items-center justify-center border-t-2 border-stone-600 bg-black px-1 py-0 md:flex-row">
      <h1 className="flex h-fit w-[90%] items-center justify-center gap-2 border-b-2 border-l-2 border-r-2 border-stone-600 px-4 py-2 text-white md:h-[40px] md:border-b-0 md:border-r-0">
        Made by: <span className="text-stone-400">Halmosi Kornél</span>
      </h1>
      <h1 className="flex h-fit w-[90%] flex-row items-center justify-center gap-2 border-l-2 border-r-2 border-stone-600 px-4 py-2 text-white md:h-[40px]">
        GitHub:{" "}
        <span className="text-stone-400">
          <a href="https://github.com/korneXD/blog2025" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        </span>
      </h1>
    </div>
  );
};

export default Footer;
