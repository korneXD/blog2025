import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';

const Toastify = ({signin,err,signup,resetPw}) => {
    const {setMsg} = useContext(UserContext)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(err){
            toast.error(err,{position:"top-center"})
        } else if(signin || signup){
            toast.success(signin||signup,{position:"top-center"})
            setTimeout(()=>navigate('/'),1000)
        } else if(resetPw){
          toast.success(resetPw,{position: "top-center"})
          setTimeout(()=>navigate('/auth/in'),1000)
        }
        setMsg({})
    },[signin,signup,resetPw,err])

  return (
    <div>
      <ToastContainer/>
    </div>
  )
}

export default Toastify
