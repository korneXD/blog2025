import React from 'react'
import { auth } from '../utility/firebaseApp'
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile,  } from 'firebase/auth'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [msg, setMsg] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    const signInUser = async (email, password) => {
        setMsg({})
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setMsg({ signin: "Sikeres belépés!" })
        } catch (error) {
            console.log(error);
            setMsg({ err: error.message })
        }
    }

    const logOutUser = async () => {
        await signOut(auth)
        setMsg({})
    }

    const signUpUser = async (email, password, displayName) => {
        setMsg({})
        try {
            await createUserWithEmailAndPassword(auth, email, password, displayName)
            await updateProfile(auth.currentUser, { displayName })
            setMsg({ signup: "Sikeres regisztráció" })
        } catch (error) {
            console.log(error);
            setMsg({ err: error.message })
        }
    }

    const resetPassword = async (email)=>{
        setMsg({})
        try {
            await sendPasswordResetEmail(auth,email)
            setMsg({ resetPw: "Jelszó visszaállítási email elküldve" })
        } catch (error) {
            console.log(error);
            setMsg({ err: error.message })
        }
    }

    const updateUser = async (displayName,photoURL)=>{
        try {
            if(displayName && photoURL){
                 await updateProfile(auth.currentUser,{displayName,photoURL})
            } else if(displayName){
                 await updateProfile(auth.currentUser,{displayName})
            }else if(photoURL){
                 await updateProfile(auth.currentUser,{photoURL})
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteAccount = async()=>{
        try {
            await deleteUser(auth.currentUser)
            console.log("User deleted");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserContext.Provider value={{ user, signInUser, logOutUser, msg, setMsg, signUpUser, resetPassword, updateUser, deleteAccount }}>
            {children}
        </UserContext.Provider>
    )

} 