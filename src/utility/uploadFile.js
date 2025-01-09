import axios from "axios";

export const uploadFile = async (file)=>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append('upload_preset',import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    try {
        
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME}/image/upload`,formData)
        return {url: response.data.secure_url, id:response.data.public_id}
    } catch (error) {
        console.log(error);
    }
}

//const url="http://localhost:5000/post/"
const url = "https://blog2025-server-1.onrender.com/post/"

    export const delPhoto=async(id)=>{
        try {
            await axios.delete(url+id)
        } catch (error) {
            console.log(error);
        }
    }