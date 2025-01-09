import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { NavLink } from 'react-router-dom'

export const Home = () => {
  const {categories} = useContext(CategContext)
  console.log(categories);

  return (
    <div className='flex justify-start flex-col items-center pt-10'>
      <p className='text-white text-3xl font-lonely'>Home</p>
      <hr className='border-slate-500 w-[850px] rounded-lg'/>
      <p className='text-white font-lonely'>Categories</p>
      <div className="flex justify-center items-center flex-row gap-4">
        {categories &&
          categories.map(obj=>
            <NavLink to={'/posts?ctg='+obj.name} key={obj.id} className="flex justify-center items-center flex-col gap-2 border-2 border-stone-700 rounded-xl bg-slate-800 shadow-md shadow-slate-800">
              <img src={obj.photoUrl} alt="photo" className='w-64 h-64 object-cover rounded-t-xl border-b-2 border-stone-600 bg-slate-600'/>
              <h1 className='font-lonely text-white text-2xl font-bold'>{obj.name}</h1>
            </NavLink>
          )
        }
      </div>
    </div>
  )
}