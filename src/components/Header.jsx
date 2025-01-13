import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { extractUrlAndId } from "../utility/utils";
import { useEffect } from "react";
import Footer from "./Footer";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logOutUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
    !user && setAvatar(null);
  }, [user, user?.photoURL]);

  const pages = [
    { path: "/", name: "Home" },
    { path: "/posts", name: "Posts" },
    { path: "/create", name: "AddPost" },
  ];

  return (
    <div className="mx-auto h-fit min-h-screen w-full bg-[#0f0f0f] font-main">
      <div className="mx-auto flex w-full items-center justify-center bg-black bg-cover bg-center bg-no-repeat">
        <div className="flex w-full items-center justify-center border-b-2 border-stone-600">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="hidden items-center gap-x-1 lg:flex">
              {!user ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex w-full flex-row items-center justify-center gap-4">
                    <div className="flex items-center justify-center">
                      <img
                        src="/logoipsum-288.svg"
                        alt="logo"
                        className="size-fit cursor-pointer"
                        onClick={() => navigate("/")}
                      />
                    </div>
                    <div className="hidden w-full flex-row items-center justify-center gap-10 border-l-2 border-r-2 border-stone-600 bg-black px-10 py-1 lg:flex">
                      <NavLink to={"/"}>
                        <p className="text-xl uppercase tracking-wide text-white transition-all hover:text-stone-400">
                          Home
                        </p>
                      </NavLink>
                      <NavLink to={"/posts"}>
                        <p className="text-xl uppercase tracking-wide text-white transition-all hover:text-stone-400">
                          Posts
                        </p>
                      </NavLink>
                      <NavLink
                        to={"https://github.com/korneXD/blog2025"}
                        target="_blank"
                      >
                        <p className="text-xl uppercase tracking-wide text-white transition-all hover:text-stone-400">
                          GitHub
                        </p>
                      </NavLink>
                    </div>
                    <div className="cursor-pointer px-2 py-1 text-xl text-white">
                      <NavLink
                        to={"/auth/in"}
                        className="flex flex-row items-center justify-center gap-2 transition-all hover:text-stone-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 text-stone-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        Login
                      </NavLink>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <div className="flex w-full flex-row items-center justify-center gap-4">
                    <div className="flex items-center justify-center">
                      <img
                        src="/logoipsum-288.svg"
                        alt="No Logo"
                        className="size-fit cursor-pointer"
                        onClick={() => navigate("/")}
                      />
                    </div>
                    <div className="hidden flex-row items-center justify-center gap-10 border-l-2 border-r-2 border-stone-600 bg-black px-10 py-1 lg:flex">
                      {pages.map((page) => (
                        <NavLink to={page.path} key={page.name}>
                          <p
                            className="text-xl uppercase tracking-wide text-white transition-all hover:text-stone-400"
                            key={page.name}
                          >
                            {page.name}
                          </p>
                        </NavLink>
                      ))}
                      <NavLink
                        to={"https://github.com/korneXD/blog2025"}
                        target="_blank"
                      >
                        <p className="text-xl uppercase tracking-wide text-white transition-all hover:text-stone-400">
                          GitHub
                        </p>
                      </NavLink>
                    </div>
                    <div className="flex cursor-pointer flex-row items-center justify-center gap-4 px-2 py-1 text-xl text-white">
                      <NavLink to={"/profile"}>
                        <div className="flex items-center justify-center">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt="avatar"
                              className="size-6 rounded-[50%] bg-slate-950 p-1"
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-8 text-stone-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          )}
                        </div>
                      </NavLink>
                      <NavLink
                        to={"/"}
                        onClick={logOutUser}
                        className="text-xl uppercase tracking-wide text-white transition-all hover:text-red-500"
                      >
                        Exit
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-full flex-row items-center justify-center lg:hidden">
              <div className="flex w-full flex-row items-center justify-between gap-2">
                <img
                  src="/logoipsum-288.svg"
                  alt="No Logo"
                  className="size-fit cursor-pointer"
                  onClick={() => navigate("/")}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="flex size-7 text-stone-600 lg:hidden"
                  onClick={() => setOpen((open) => !open)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
              {open && (
                <div className="fixed left-0 top-0 z-20 h-full w-full">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg border border-stone-900 bg-black px-4 py-3 shadow-md shadow-stone-900">
                    <p
                      className="absolute right-4 top-4 text-xl text-white"
                      onClick={() => setOpen(false)}
                    >
                      X
                    </p>
                    {pages.map((nav) => (
                      <NavLink
                        key={nav.name}
                        to={nav.path}
                        onClick={() => setOpen((open) => !open)}
                      >
                        <p className="px-2 py-1 text-2xl font-extralight uppercase tracking-wide text-white">
                          {nav.name}
                        </p>
                      </NavLink>
                    ))}
                    {!user ? (
                      <div className="flex flex-col items-center justify-center gap-8">
                        <div className="text-md cursor-pointer px-2 py-1 text-white">
                          <NavLink
                            to={"/auth/in"}
                            className="flex flex-row items-center justify-center gap-2 text-2xl uppercase tracking-wide"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-8 text-stone-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                            Login
                          </NavLink>
                        </div>
                        <div className="text-md cursor-pointer px-2 py-1 text-white">
                          <NavLink
                            to={"/auth/up"}
                            className="flex flex-row items-center justify-center gap-2 text-2xl uppercase tracking-wide"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-8 text-stone-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                              />
                            </svg>
                            Register
                          </NavLink>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="cursor-pointer px-2 py-1 text-2xl uppercase tracking-wide text-red-500">
                          <NavLink to={"/"} onClick={logOutUser}>
                            Exit
                          </NavLink>
                        </div>
                        <div className="cursor-pointer px-2 py-1 text-lg text-white">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt="avatar"
                              className="size-14 rounded-[50%] bg-slate-950 p-1"
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-8 text-stone-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};
