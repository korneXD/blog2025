import { addDoc, collection, onSnapshot, where, orderBy, query, serverTimestamp, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebaseApp"

export const readCategories=(setCategories)=>{
    const collectionRef=collection(db,'categories')
    const q = query(collectionRef,orderBy('name','asc'))
    const unsubscribe = onSnapshot(q,(snapshot)=>{
        setCategories(snapshot.docs.map(doc=>(
            {...doc.data(),id:doc.id}
        )))
    })
    return unsubscribe
}

export const addPost = async(formData)=>{
    const collectionRef = collection(db,'posts')
    const newItem = {...formData,timeStamp:serverTimestamp()}
    await addDoc(collectionRef,newItem)
}

export const readPosts=(setPosts,selCateg)=>{
    const collectionRef=collection(db,'posts')
    const q = selCateg.length == 0 ? query(collectionRef,orderBy('timeStamp','desc')) : query(collectionRef,where('category','in',selCateg))
    const unsubscribe = onSnapshot(q,(snapshot)=>{
        setPosts(snapshot.docs.map(doc=>(
            {...doc.data(),id:doc.id}
        )))
    })
    return unsubscribe
}

export const deletePost = async(id)=>{
    const docRef = doc(db,'posts',id)
    await deleteDoc(docRef)
}

export const readPost=async (setPost,id)=>{
    const docRef = doc(db,'posts',id)
    const unsubscribe = onSnapshot(docRef,(snapshot)=>{
        setPost({...snapshot.data(),id:snapshot.id})
        return unsubscribe
    })
    setPost({...docSnap.data(),id:docRef.id})
}

export const toggleLikes=async(id,uid)=>{
    const docRef = doc(db,'posts',id)
    const docSnap = await getDoc(docRef)
    const likesArr = docSnap.data().likes || []
    if(likesArr.includes(uid)){
        console.log('unlike');
        await updateDoc(docRef,{likes:likesArr.filter(id=>id!=uid)})
    } else{
        console.log('like');
        await updateDoc(docRef,{likes:[...likesArr,uid]})
    }
}