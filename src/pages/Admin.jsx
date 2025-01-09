import React from 'react'

export const Admin = () => {
  return (
    <div className='flex justify-start items-center min-h-screen pt-10 flex-col'>
      <p className='text-white text-3xl'>Admin</p>
      <hr className='border-blue-600 w-[300px] rounded-lg'/>
      <p className='text-stone-500'>Only admin can see this page.</p>
    </div>
  )
}