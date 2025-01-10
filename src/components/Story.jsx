import React from 'react'
import 'quill/dist/quill.snow.css';  
import Editor from 'react-simple-wysiwyg';
import { useState } from 'react';
import { EditorProvider } from 'react-simple-wysiwyg';
import { useEffect } from 'react';

export const Story = ({setStory,story}) => {
    const [html,setHtml] = useState('')

    useEffect(()=>{
        setHtml(story)
    },[story])

    return (
        <div className='mt-2 shadow-lg shadow-black mb-2'>
            <Editor value={html} onChange={(e)=>setHtml(e.target.value)}  onBlur={()=>setStory(html)} className='bg-[#1f1f1f] text-white' placeholder='Write your blog!'/>
        </div>
    );
};

