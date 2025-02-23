import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user,setUser]=useState([]);
    const [isAuth,setIsAuth]=useState(false);
    const [loading,setLoading]=useState(true);


    
    
    async function loginUser(email,password,navigate){
        try {
            const {data}=await axios.post("/api/auth/login",{email,password,navigate});
            toast.success(data.message);
            navigate("/");
            setIsAuth(true);
            setUser(data.user);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    
    async function fetchUser(){
        try {
            const {data}=await axios.get("/api/user/me")

            setUser(data)
            setIsAuth(true)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setIsAuth(false);
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])
  return (
    <UserContext.Provider value={{loginUser,isAuth,setIsAuth,loading,setLoading,user,setUser }}>
      {children}<Toaster/>
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
