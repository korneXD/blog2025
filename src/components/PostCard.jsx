import React from 'react'
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Detail from './Detail';

const PostCard = ({title,photo,id,category,story,author,photoId,likes}) => {
  const [open,setOpen] = useState(false)
  
  return (
    <div className='flex justify-center items-center h-full flex-col border rounded-lg w-fit mx-auto' onClick={()=>setOpen(true)}>
      <div className="flex justify-center items-center">
        <img src={photo} alt={title} className='w-[400px] bg-white h-64 object-cover rounded-t-lg' />
      </div>
      <div className="flex justify-start items-center w-full p-2 flex-col">
        <h1 className='text-white'>{title}</h1>
        <p className='max-w-[300px] text-white truncate'>{story}</p>
      </div>
    </div>
  )
}

export default PostCard
