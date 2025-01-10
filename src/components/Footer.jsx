import React from 'react'

const Footer = () => {
  return (
    <div className=" sticky bottom-0 left-0 flex justify-center items-center flex-row mx-auto w-full bg-black border-t-2 border-stone-600 px-1 ">
    <h1 className="text-white border-l-2 px-4 border-stone-600 py-2 border-r-2">Made by: <span className="text-stone-400">Halmosi Kornél</span></h1>
    <h1 className="text-white border-r-2 px-4 border-stone-600 py-2">Email: <span className="text-stone-400">korcika2005@gmail.com</span></h1>
    <h1 className="text-white border-r-2 px-4 border-stone-600 py-2 flex-row flex gap-2 justify-center items-center">GitHub: <span className="text-stone-400"><a href="https://github.com/korneXD/blog2025" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
    </a></span></h1>
</div>
  )
}

export default Footer
