import React from 'react'
import { readPosts } from '../utility/crudUtility'

const Categories = ({categories,selCateg,setSelCateg,handleChange}) => {
  
  return (
    <div className='flex justify-center items-center gap-4 mb-2'>
      {categories && categories.map(e=>
        <p key={e.name} className='text-white bg-slate-800 px-2 py-1 rounded-lg hover:text-slate-400 cursor-pointer transition-all font-bold'>
          <input type="checkbox" name={e.name} id={e.name} value={e.name} checked={selCateg.includes(e.name)} onChange={handleChange}/>
          {e.name}</p>
      )}
    </div>
  )
}

export default Categories
