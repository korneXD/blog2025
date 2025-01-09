import React from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { deletePost, readPost, toggleLikes } from '../utility/crudUtility'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { delPhoto } from '../utility/uploadFile'

const Detail = ({title,img,category,story,author,userId,id,photoId,likes}) => {
  const navigate = useNavigate()
  const {user} = useContext(UserContext)
  const [txt,setTxt] = useState(null)
  

  const handleLikes=async()=>{
    if(!user) setTxt("Nem vagy bejelentkezve!")
      else toggleLikes(id,user.uid)
      console.log(txt);
  }

const handleDelete=()=>{
  console.log(id);
  
  deletePost(id)
  delPhoto(photoId)  
  navigate('/posts')
  setOpen(false)
}

  return (
    <div className='flex justify-center items-center p-2 min-h-screen w-full'>
      <div className='flex justify-center bg-slate-900 items-center rounded-lg shadow-lg w-fit h-full py-4 px-4'>
        <div className="flex justify-around items-center flex-row w-full">
          <div className="flex justify-center items-center w-full">
            <img src={img} alt={title} className='w-[500px] rounded-lg'/>
          </div>
          <div className="flex justify-center items-center w-full h-full flex-col">
              <div className="flex justify-center items-center flex-row gap-6">
                <p className='text-white p-2 bg-slate-700 rounded-lg shadow-lg'><span className='font-bold'>Author:</span> {author}</p>
                <p className='text-white'>{category}</p>
              </div>
            <h1 className='text-white'>{title}</h1>
            <p className='text-white'>{story}</p>
            <p className='text-blue-500'>Likes: {likes.length || 0}</p>
            <button className='bg-blue-500 px-2 rounded-lg' onClick={handleLikes}>Like</button>
            {user && user.id==userId &&
              <div className="flex justify-center items-center gap-2">
                <button className='bg-red-500 px-2 rounded-lg' onClick={handleDelete}>Delete</button>
                <button className='bg-green-500 px-2 rounded-lg'>Update</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
