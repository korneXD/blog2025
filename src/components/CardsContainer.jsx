import React from 'react'
import { useEffect } from 'react'
import { readPosts } from '../utility/crudUtility'
import PostCard from './PostCard'
import { useState } from 'react'

const CardsContainer = ({posts}) => {

    
    
      
  return (
    <div className='flex justify-center items-center flex-row gap-2 flex-wrap'>
    {posts &&
      posts.map(e=>
        <PostCard title={e.title} id={e.id} author={e.author} photo={e.photo.url} story={e.story} category={e.category} key={e.id} photoId={e.photo.id} likes={e.likes}/>
        
      )
    }
    </div>
  )
}

export default CardsContainer
