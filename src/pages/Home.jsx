import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { NavLink } from 'react-router-dom'

export const Home = () => {
  const {categories} = useContext(CategContext)
  console.log(categories);

  return (
    <div className='flex justify-start flex-col items-center pt-10 min-h-screen'>
      <p className='text-white mb-2 text-xl italic uppercase'>- Categories -</p>
      <div className="flex justify-center items-center flex-row gap-4">
        {categories &&
          categories.map(obj=>
            <NavLink to={'/posts?ctg='+obj.name} key={obj.id} className="flex justify-center items-center flex-col rounded-lg bg-black shadow-sm shadow-stone-600">
              <img src={obj.photoUrl} alt="photo" className='w-64 h-64 object-cover rounded-t-md border-b bg-black border-[#1b1b1f]'/>
              <h1 className='text-stone-300 text-xl tracking-wide py-2 font-bold'>{obj.name}</h1>
            </NavLink>
          )
        }
      </div>
    </div>
  )
}