import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast"

const PostContext=createContext()

export const PostContextProvider=({children})=>{
    const [posts, setPosts] = useState([])
    const [reels, setReels] = useState([])

    async function fetchPosts() {
        try {
            const {data}=await axios.get("/api/post/all")

            setPosts(data.posts)
            setReels(data.reels)
        } catch (error) {
            console.log(error);
        }
    }

    async function addPost(formData,setFile,setCaption,setFilePrev,type ) {
        try {
            const {data}=await axios.post("/api/post/new?type="+type,formData)
            toast.success(data.message)
            fetchPosts()
            setFile("")
            setFilePrev("")
            setCaption("")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
      fetchPosts()
    }, [])
    
    return <PostContext.Provider value={{reels,posts,addPost}}>
        {children}
    </PostContext.Provider>
}

export const postData=()=> useContext(PostContext);