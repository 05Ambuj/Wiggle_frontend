import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { UserData } from "./context/UserContext";

const App=()=>{
  const {loading,isAuth,user}=UserData()
  return (
    <>
      {loading?<h1>Loading...</h1>:<BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth?<Home />:<Login/>} />
          <Route path="/login" element={!isAuth?<Login />:<Home/>} />
          <Route path="/register" element={!isAuth?<Register />:<Home/>} />
        </Routes>
      </BrowserRouter>}
    </>
  )
}

export default App
