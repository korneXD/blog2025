import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { extractUrlAndId } from "../utility/utils";
import { useEffect } from "react";
import Footer from "./Footer";

export const Header = () => {
    const [open, setOpen] = useState(false);
    const { user, logOutUser } = useContext(UserContext)
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
        !user && setAvatar(null)
    }, [user, user?.photoURL])

    const pages = [
        { path: '/', name: 'Home' },
        { path: '/posts', name: 'Posts' },
        { path: '/create', name: 'AddPost' },
    ]

    return (
        <div className="h-fit w-full mx-auto bg-[#0f0f0f] font-main min-h-screen">
            <div className="bg-black bg-cover bg-center bg-no-repeat mx-auto w-full flex justify-center items-center">
                <div className="flex items-center justify-center w-full border-b-2 border-stone-600">
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-x-1">
                            {!user ?
                                <div className="flex justify-center items-center flex-col gap-2">
                                    <div className="flex justify-center items-center flex-row w-full gap-4">
                                        <div className="flex justify-center items-center">
                                            <img src="logoipsum-288.svg" alt="logo"/>
                                        </div>
                                        <div className="hidden lg:flex w-full flex-row justify-center items-center gap-10 bg-black py-1 border-l-2 px-10 border-r-2 border-stone-600">
                                            <NavLink to={"/"}>
                                                <p className="hover:text-stone-400 transition-all text-white text-xl uppercase tracking-wide">Home</p>
                                            </NavLink>
                                            <NavLink to={"/posts"}>
                                                <p className="hover:text-stone-400 transition-all text-white uppercase tracking-wide text-xl">Posts</p>
                                            </NavLink>
                                            <NavLink to={"/posts"}>
                                                <p className="hover:text-stone-400 transition-all text-white uppercase tracking-wide text-xl">Contact</p>
                                            </NavLink>
                                            <NavLink to={"https://github.com/korneXD/blog2025"} target="_blank">
                                                <p className="hover:text-stone-400 transition-all text-white uppercase tracking-wide text-xl">GitHub</p>
                                            </NavLink>
                                        </div>
                                        <div className="px-2 py-1 text-xl cursor-pointer text-white">
                                            <NavLink to={'/auth/in'} className="flex flex-row gap-2 justify-center items-center hover:text-stone-400 transition-all">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-stone-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                Login
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="flex justify-center items-center flex-col gap-2  w-full">
                                <div className="flex justify-center items-center flex-row w-full gap-4">
                                    <div className="flex justify-center items-center">
                                    <img src="logoipsum-288.svg" alt="" />
                                    </div>
                                    <div className="hidden lg:flex flex-row justify-center items-center gap-10 bg-black py-1 border-l-2 px-10 border-r-2 border-stone-600">
                                        {pages.map(page=>
                                            <NavLink to={page.path} key={page.name}>
                                            <p className="hover:text-stone-400 transition-all text-white text-xl uppercase tracking-wide" key={page.name}>{page.name}</p>
                                        </NavLink>
                                        )}
                                        <NavLink to={"/posts"}>
                                            <p className="hover:text-stone-400 transition-all text-white uppercase tracking-wide text-xl">Contact</p>
                                        </NavLink>
                                        <NavLink to={"https://github.com/korneXD/blog2025"} target="_blank">
                                            <p className="hover:text-stone-400 transition-all text-white uppercase tracking-wide text-xl">GitHub</p>
                                        </NavLink>
                                    </div>
                                    <div className="px-2 py-1 text-xl cursor-pointer text-white flex-row flex justify-center items-center gap-4">
                                        <NavLink to={'/profile'}>
                                            <div className="flex justify-center items-center">
                                                {avatar ?
                                                    <img src={avatar} alt="avatar" className="rounded-[50%] size-6 p-1  bg-slate-950" /> : <img src="bart.png" alt="avatar" className="rounded-[50%] size-6 p-1  bg-slate-950" />
                                                }
                                            </div>
                                        </NavLink>
                                        <NavLink to={"/"} onClick={logOutUser} className="text-white uppercase tracking-wide text-xl hover:text-red-500 transition-all">
                                            Exit
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                               
                            }
                        </div>
                        <div className="lg:hidden flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 lg:hidden flex text-amber-400" onClick={() => setOpen(open => !open)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            {open &&
                                <div className="absolute flex justify-center items-center mt-72 mr-6 flex-col">
                                    <div className="flex w-full h-full justify-start items-center flex-col bg-black p-2 rounded-lg border border-stone-900 shadow-md shadow-stone-900">
                                        {pages.map((nav) => (
                                            <NavLink key={nav.name} to={nav.path}>
                                                <p className="hover:scale-105 transition-all text-white text-lg hover:text-blue-600">{nav.name}</p>
                                            </NavLink>
                                        ))}
                                        {!user ?

                                            <div className="flex justify-center items-center flex-col gap-3">
                                                <div className="hover:text-blue-600 hover:bg-stone-900 px-2 py-1 text-md font-bold cursor-pointer hover:scale-105 transition-all text-white bg-blue-600 rounded-lg">
                                                    <NavLink to={'/auth/up'}>
                                                        Register
                                                    </NavLink>
                                                </div>
                                                <div className="hover:text-blue-600 px-2 py-1 text-md font-bold cursor-pointer hover:scale-105 transition-all text-white bg-stone-900 rounded-lg ">
                                                    <NavLink to={'/auth/in'}>
                                                        Log in
                                                    </NavLink>
                                                </div>
                                            </div>
                                            :
                                            <div className="flex justify-center items-center gap-3 flex-col">
                                                <div className="hover:text-blue-600 hover:bg-stone-900 px-2 py-1 text-lg font-bold cursor-pointer hover:scale-105 transition-all text-white bg-cyan-600 rounded-lg">
                                                    <NavLink to={'/'} onClick={logOutUser}>
                                                        Exit
                                                    </NavLink>
                                                </div>
                                                <div className="hover:text-blue-600 hover:bg-stone-900 px-2 py-1 text-lg font-bold cursor-pointer hover:scale-105 transition-all text-white bg-blue-600 rounded-lg">
                                                    <NavLink to={'/profile'}>Profile</NavLink>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
           <Footer />
        </div>
    );
}