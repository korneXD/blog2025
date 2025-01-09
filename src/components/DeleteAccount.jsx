import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../utility/crudUtility'

const DeleteAccount = () => {
    const { user, logOutUser, deleteAccount } = useContext(UserContext)
    const [confirm,setConfirm] = useState(false)
    const navigate = useNavigate()

    const handleDelete = async()=>{
      setConfirm(false)
      await deleteAccount()
      logOutUser()
      navigate("/")
  }

  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <p className='px-2 py-1 rounded-xl text-white bg-red-500 cursor-pointer w-fit border border-black hover:scale-105 transition-all' onClick={()=>setConfirm(confirm=>!confirm)}>Delete Account</p>
      {confirm &&
        <div className='p-2 border border-black rounded-xl bg-green-900 mt-2'>
            <p>Are you sure to delete your account?</p>
            <div className="flex justify-center items-center flex-row gap-10 font-bold">
                <p onClick={handleDelete} className='px-2 py-1 bg-green-600 rounded-lg border border-black cursor-pointer'>Yes</p>
                <p onClick={()=>setConfirm(false)} className='px-2 py-1 bg-green-600 rounded-lg border border-black cursor-pointer'>No</p>
            </div>
        </div>
      }
    </div>
  )
}

export default DeleteAccount
