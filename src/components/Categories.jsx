import React from 'react'
import { readPosts } from '../utility/crudUtility'

const Categories = ({categories,selCateg,setSelCateg,handleChange}) => {
  
  return (
    <div className='flex justify-center items-center gap-4 mb-2'>
      {categories && categories.map(e=>
      <div className="flex bg-black shadow-sm shadow-stone-600 rounded-lg cursor-pointer justify-center items-center px-2" key={e.name}>
        <input type="checkbox" name={e.name} id={e.name} value={e.name} checked={selCateg.includes(e.name)} onChange={handleChange} className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-[50%] hover:shadow-md border bg-white border-black checked:bg-stone-600 checked:border-black shadow-inner"/>
        <p key={e.name} className='text-white  px-2 py-1 hover:text-stone-500 transition-all font-bold'>
          {e.name}</p>
      </div>
      )}
    </div>
  )
}

export default Categories
