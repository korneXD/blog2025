import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { extractUrlAndId } from "../utility/utils";
import { useEffect } from "react";

export const Header = () => {
    const [open, setOpen] = useState(false);
    const { user, logOutUser } = useContext(UserContext)
    const [avatar,setAvatar] = useState(null)

    useEffect(()=>{
      user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
      !user && setAvatar(null)
    },[user,user?.photoURL])
  
    const pages = [
        { path: '/', name: 'Home' },
        { path: '/posts', name: 'Posts' },
        { path: '/create', name: 'AddPost' },
    ]

    return (
        <div className="h-fit w-full mx-auto bg-slate-950 font-main px-4 border-l-2 border-r-2 border-green-700 min-h-screen">
            <div className="bg-slate-900 bg-cover bg-center bg-no-repeat backdrop-blur-sm mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 shadow-md shadow-black rounded-lg border-b border-black">
                <div className="flex items-center justify-between">
                    <NavLink to={'/'} className='flex justify-center items-center flex-row group'>
                        <h1 className="text-white font-bold text-3xl -ml-3 font-lonely group-hover:scale-105 transition-all">Blog</h1>
                    </NavLink>
                    <div className="flex items-center gap-4">

                        <div className="hidden lg:flex items-center gap-x-3">
                            {!user ?
                                <div className="flex justify-center items-center flex-row gap-3">
                                    <div className="mr-4 hidden lg:flex flex-row justify-center items-center gap-6">
                                        <NavLink to={"/"}>
                                            <p className="hover:scale-105 transition-all text-white text-lg font-lonely">Home</p>
                                        </NavLink>
                                        <NavLink to={"/posts"}>
                                            <p className="hover:scale-105 transition-all text-white text-lg font-lonely">Posts</p>
                                        </NavLink>
                                    </div>
                                    <div className="px-2 py-1 text-lg font-bold cursor-pointer hover:scale-105 transition-all text-black font-lonely bg-white rounded-lg">
                                        <NavLink to={'/auth/up'}>
                                            Register
                                        </NavLink>
                                    </div>
                                    <div className="px-2 py-1 text-lg font-bold cursor-pointer hover:scale-105 transition-all text-white font-lonely bg-stone-500 rounded-lg">
                                        <NavLink to={'/auth/in'}>
                                            Login
                                        </NavLink>
                                    </div>
                                </div>
                                :
                                <div className="flex justify-center items-center gap-3 flex-row">
                                    {pages.map((nav) => (
                                        <NavLink key={nav.name} to={nav.path}>
                                            <p className="hover:scale-105 transition-all text-white text-lg  font-lonely">{nav.name}</p>
                                        </NavLink>
                                    ))}
                                    <div className="font-lonely px-2 py-1 text-2xl font-bold cursor-pointer hover:scale-105 transition-all bg-white rounded-lg border-2 border-black group">
                                        <NavLink to={'/'} onClick={logOutUser} className="font-outline text-white group-hover:text-black">
                                            Exit
                                        </NavLink>
                                    </div>
                                    <NavLink to={'/profile'}>
                                        <div className="flex justify-center items-center border-4 border-slate-700 p-1 rounded-[50%]">
                                            {avatar ? 
                                            <img src={avatar} alt="avatar" className="rounded-[50%] size-12 p-1  bg-slate-950" /> : <img src="bart.png" alt="avatar" className="rounded-[50%] size-12 p-1  bg-slate-950" />    
                                        }
                                        </div>
                                    </NavLink>
                                    
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
        </div>
    );
}