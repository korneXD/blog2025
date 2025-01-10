import React from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { deletePost, readPost, toggleLikes } from '../utility/crudUtility'
import { useState } from 'react'
import parse from 'html-react-parser';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { delPhoto } from '../utility/uploadFile'

const Detail = ({ }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const params = useParams()
  const [post, setPost] = useState({})
  useEffect(() => {
    readPost(setPost, params.id)
  })

  const handleLikes = () => {
    if (!user) console.log("Nemvagy bejelentkezve");
    else toggleLikes(post.id, user.uid)
  }

  const handleDelete = () => {
    deletePost(params.id)
    navigate('/posts')
    setOpen(false)
  }

  return (
    <div className='flex justify-start items-center p-2 w-full mx-auto flex-col min-h-screen'>
      <h1 className='text-white font-bold text-2xl pb-2'>{post.title}</h1>
      <img src={post.photo?.url} alt="img" className='w-full h-[250px] object-cover rounded-lg shadow-sm shadow-stone-600' />
      <div className="flex justify-between items-start mx-auto w-full py-2 px-2">
        <div className="flex flex-row gap-4 justify-center items-center">
          <h1 className='text-white font-bold text-lg'>Made by: <span className='font-normal text-stone-500'>{post.author}</span></h1>
          <div className="flex justify-center items-center gap-2">
          <button onClick={handleLikes}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
          </svg>
          </button>
          <p className='text-blue-500'>{post.likes?.length || 0}</p>
          </div>
        </div>
        {user && post && (user.uid == post.userId) &&
          <div className="flex justify-center items-center gap-4 flex-row">
            <button className='bg-blue-500 px-1 py-1 rounded-[50%]' onClick={()=>navigate('/update/'+post.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            </button>
            <button onClick={handleDelete} className='bg-red-500 px-1 py-1 rounded-[50%]'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </button>
          </div>
        }
      </div>
      <div className="flex w-full px-10 justify-center items-center">
        <p className='text-white max-w-[80%]'>{parse(post.story || "")}</p>
      </div>
    </div>
  )
}

export default Detail
