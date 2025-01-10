import { useState } from "react";

   
  export const DropDown = ({categories,selCateg,setSelCateg})=>{
    const [open,setOpen] = useState(false)

    return (
      <div className="select-none">
        <p className="bg-black rounded-lg text-lg font-bold text-center px-6 cursor-pointer shadow-sm text-white shadow-stone-600" onClick={()=>setOpen(open=>!open)}>
            {selCateg ? selCateg : "Categories"}
            </p>
        {open &&
            <div className="flex justify-center items-center flex-col bg-[#1f1f1f] shadow-sm shadow-stone-600 px-2 py-2 rounded-lg  mt-1 mb-2 gap-1">
                {categories && categories.map(categ=>
                <p key={categ.name} onClick={()=>{setSelCateg(categ.name); setOpen(false)}} className="cursor-pointer bg-black w-full text-center px-2 rounded-lg text-white font-bold hover:text-slate-400 transition-all shadow-sm shadow-stone-600">{categ.name}</p>
              )}
            </div>
        }
      </div>
    );
  }