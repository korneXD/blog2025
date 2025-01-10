import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Toastify from '../components/Toastify'

export const PwReset = () => {
  const {msg, resetPassword} = useContext(UserContext)

  const handleSubmit =(e)=>{
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    console.log(data.get('email'));
    resetPassword(data.get('email'))

  }

  return (
    <div className='flex justify-center items-start min-h-screen font-main pt-10'>
      <div className='p-6 rounded-[15px] shadow-sm shadow-stone-600 bg-black h-[300px] pt-16'>
        <h1 className='text-3xl font-bold text-center text-white'>Reset Password</h1>
        <form className="mt-6 mb-2 w-fit h-fit flex flex-col justify-center items-center" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <input
              name='email'
              placeholder="Email"
              className="shadow-sm shadow-stone-600 placeholder:text-md p-2 text-center mx-4 rounded-[40px] bg-[#1f1f1f] text-xl outline-none text-white placeholder-white"
            />
          </div>
          <button className='py-1 bg-[#101010] font-bold shadow-sm shadow-stone-600 text-white text-center rounded-[20px] w-[80%] hover:scale-y-105 transition-all mt-4 text-xl'>
            Reset
          </button>      
        </form>
        {msg && <Toastify {...msg}/>}
      </div>
    </div>
  )
}