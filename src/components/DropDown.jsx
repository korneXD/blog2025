import { useState } from "react";

   
  export const DropDown = ({categories,selCateg,setSelCateg})=>{
    const [open,setOpen] = useState(false)

    return (
      <div className="select-none">
        <p className="bg-slate-800 rounded-lg border border-black text-lg font-bold text-center px-6 cursor-pointer shadow-md text-white shadow-black" onClick={()=>setOpen(open=>!open)}>
            {selCateg ? selCateg.name : "Categories"}
            </p>
        {open &&
            <div className="flex justify-center items-center flex-col bg-slate-600 px-2 py-1 rounded-lg mb-2 gap-1">
                {categories && categories.map(categ=>
                <p key={categ.name} onClick={()=>{setSelCateg(categ); setOpen(false)}} className="cursor-pointer bg-slate-700 w-full text-center px-2 rounded-lg text-white font-bold hover:text-slate-400 transition-all">{categ.name}</p>
              )}
            </div>
        }
      </div>
    );
  }