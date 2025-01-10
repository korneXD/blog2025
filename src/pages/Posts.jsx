import React from 'react'
import { readPosts } from '../utility/crudUtility'
import { useState } from 'react'
import { useEffect } from 'react'
import CardsContainer from '../components/CardsContainer'
import Categories from '../components/Categories'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { useSearchParams } from 'react-router-dom'
import SearchBox from '../components/SearchBox'

export const Posts = () => {
  const [searchParams] = useSearchParams()
  const {categories} = useContext(CategContext)
  const [posts,setPosts] = useState([])
  const [selCateg,setSelCateg] = useState(searchParams.get('ctg') ? [searchParams.get('ctg')] : [])
  useEffect(()=>{
    readPosts(setPosts,selCateg)
    console.log(posts);
  },[selCateg])
  console.log(searchParams.get('ctg'));
  console.log(selCateg);
  
  const handleChange =(e)=>{
    const {value,checked}=e.target
    setSelCateg(prev=>checked ? [...prev,value] : prev.filter(categ=>categ!=value))
  }

  return (
    <div className='flex justify-start items-center pt-10 flex-col pb-6 overflow-y-hidden min-h-screen w-full'>
    <p className='text-white text-xl font-lonely mb-2 uppercase tracking-wide italic'>- Posts -</p>
    <Categories categories={categories} selCateg={selCateg} setSelCateg={setSelCateg} handleChange={handleChange}/>
    {posts && <SearchBox items={posts.map(obj=>({id: obj.id,name: obj.title}))}/>}
    <CardsContainer posts={posts}/>
  </div>
  )
}