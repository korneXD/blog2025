import React from 'react'
import 'quill/dist/quill.snow.css';  
import Editor from 'react-simple-wysiwyg';
import { useState } from 'react';
import { EditorProvider } from 'react-simple-wysiwyg';

export const Story = ({setStory}) => {
    const [html,setHtml] = useState('')

    return (
        <div className='mt-2 shadow-lg shadow-black mb-2'>
            <Editor value={html} onChange={(e)=>setHtml(e.target.value)}  onBlur={()=>setStory(html)} className='bg-white text-green-800' placeholder='Write your blog!'/>
        </div>
    );
};

