import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { readCategories } from "../utility/crudUtility";

export const CategContext = createContext()
export const CategProvider=({children})=>{
    const [categories,setCategories] = useState(null)
    useEffect(()=>{
        readCategories(setCategories)
    },[])
    return (
        <CategContext.Provider value={{categories}}>
            {children}
        </CategContext.Provider>
    )
}