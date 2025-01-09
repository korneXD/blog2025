import React from 'react'
import { Story } from '../components/Story.jsx'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import { CategContext } from '../context/CategContext.jsx'
import { NotFound } from './NotFound.jsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { uploadFile } from '../utility/uploadFile.js'
import { addPost } from '../utility/crudUtility.js'
import { DropDown } from '../components/DropDown.jsx'

export const AddEditPost = () => {
  const { user } = useContext(UserContext)
  const [loading,setLoading] = useState(false)
  const [photo,setPhoto] = useState(null)
  const [story,setStory] = useState(null)
  const [uploaded,setUploaded] = useState(false)
  const {categories} = useContext(CategContext)
  const [selCateg,setSelCateg] = useState(null)
  const {register,handleSubmit,formState:{errors},reset} = useForm()
  if(!user) return <NotFound />
  
  const onSubmit = async (data) => {
    setLoading(true)
    let newPostData={
        ...data,
        story,
        author: user.displayName,
        userId: user.uid,
        category: selCateg.name,
        likes: []
      }
    try {
      const file = data?.file ? data.file[0] : null
      const { url, id } = file ? await uploadFile(file) : {}
      delete newPostData.file
      newPostData={...newPostData,photo:{url,id}}
      console.log(newPostData);
      addPost(newPostData)
      setUploaded(true)
      reset()
      setPhoto(null)
      setStory(null)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex justify-start items-center pt-10 flex-col'>
      <p className='text-white text-3xl font-lonely mb-2 font-bold'>Add Post</p>
      <DropDown categories={categories} setSelCateg={setSelCateg} selCateg={selCateg}/>
      <Story setStory={setStory} uploaded={uploaded}/>
      <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center gap-4 flex-col'>
        <div className='flex justify-center items-center flex-col'>
          <label className='font-lonely text-xl text-white'>Post name:</label>
          <input {...register("title", {required: true})} type="text" className='rounded-lg px-2 shadow-lg shadow-black' />
          <p className='text-red-500 font-bold'>{errors.title &&'Name required!'}</p>
        </div>
        <div className='flex justify-center items-center flex-col'>
          <label className='font-lonely text-xl text-white'>Photo:</label>
          <input {...register('file', {
            validate: (value) => {
              if (!value[0]) {
                return true
              }
              const acceptedFormats = ['jpg', 'png','jfif']
              const fileExtension = value[0].name.split('.').pop().toLowerCase()
              if (!acceptedFormats.includes(fileExtension)) {
                return "Invalid file format"
              }
              if (value[0].size > 1 * 1000 * 1024) {
                return "Only images below 1MB"
              }
              return true
            }
          })} type="file" onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))} className='text-lg shadow-md shadow-black rounded-lg bg-slate-700 text-white' />
          <p className='text-red-500 font-lonely'>{errors?.file?.message}</p>
          <input type="submit" disabled={!selCateg || !story} value="Make Blog" className='font-lonely bg-slate-700 px-2 py-1 rounded-lg shadow-md shadow-black text-white hover:scale-105 transition-all hover:text-white cursor-pointer mt-4 font-bold text-md' />
        </div>
      </form>
      {loading &&
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 animate-spin text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>}
      {photo &&
        <div className="flex justify-center items-center">
          <img src={photo} alt="photoName" className='size-24' />
        </div>
      }
    </div>
  )
}