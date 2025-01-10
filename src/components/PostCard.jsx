import React from 'react'
import { NavLink } from 'react-router-dom'
import parse from 'html-react-parser';

const PostCard = ({title,photo,id,story,author,category}) => {
  
  return (
    <NavLink to={"/post/"+id} className='flex justify-center items-center h-full flex-col shadow-sm shadow-stone-600 mt-6 rounded-lg w-fit mx-auto bg-black'>
      <div className="flex justify-start items-start w-full px-5 pt-2">
        <h1 className='text-white font-bold text-lg'>Made by: <span className='font-normal text-stone-500'>{author}</span></h1>
      </div>
      <div className="flex justify-center items-center p-2">
        <img src={photo} alt={title} className='w-[400px] bg-[#1f1f1f] h-64 object-cover rounded-lg p-2 ' />
      </div>
      <h1 className='text-white font-bold'>Category: <span className='text-stone-500 font-normal'>{category}</span></h1>
      <div className="flex justify-start items-center w-full pb-2 flex-col">
        <h1 className='text-white font-bold text-2xl max-w-[300px] truncate'>{title}</h1>
        <p className='max-w-[300px] text-white truncate italic'>{parse(story)}</p>
      </div>
    </NavLink>
  )
}

export default PostCard
