import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { UserData } from "./context/UserContext";
import Account from "./pages/Account";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/misc/NotFound";
import Reels from "./pages/Reels";
import {Loading} from "./components/Loading";
import UserAccount from "./pages/UserAccount";
import Search from "./pages/Search";
import ChatPage from "./pages/ChatPage";

const App=()=>{
  const {loading,isAuth,user}=UserData()
  return (
    <>
      {loading?<h1><Loading/></h1>:<BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth?<Home />:<Login/>} />
          <Route path="/reels" element={isAuth?<Reels/>:<Login/>} />
          <Route path="/account" element={isAuth?<Account user={user}/>:<Login/>} />
          <Route path="/user/:id" element={isAuth?<UserAccount user={user}/>:<Login/>} />
          <Route path="/login" element={!isAuth?<Login />:<Home/>} />
          <Route path="/register" element={!isAuth?<Register />:<Home/>} />
          <Route path="/search" element={!isAuth?<Login />:<Search/>} />
          <Route path="/chat" element={!isAuth?<Login />:<ChatPage/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        {isAuth && <NavigationBar/>}
      </BrowserRouter>}
    </>
  )
}

export default App
