import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoHome,GoHomeFill  } from "react-icons/go";
import { BsCameraReels,BsCameraReelsFill  } from "react-icons/bs";
import { IoSearchCircle,IoSearchCircleOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesSharp,IoChatbubbleEllipsesOutline  } from "react-icons/io5";
import { RiAccountCircleFill,RiAccountCircleLine  } from "react-icons/ri";

const NavigationBar = () => {

    const [tab,setTab]=useState(window.location.pathname)
    

  return (
    <div className="fixed bottom-0 w-full bg-white py-3">
      <div className="flex justify-around">
        <Link to={"/"} onClick={()=>setTab("/")} className="flex flex-col items-center text-2xl">
          <span>
            {tab==='/'?<GoHomeFill />:<GoHome />}
          </span>
        </Link>
        <Link to={"/reels"} onClick={()=>setTab("/reels")} className="flex flex-col items-center text-2xl">
          <span>
            {tab==='/reels'?<BsCameraReelsFill />:<BsCameraReels />}
          </span>
        </Link>
        <Link to={"/search"} onClick={()=>setTab("/search")} className="flex flex-col items-center text-2xl">
          <span>
            {tab==='/search'?<IoSearchCircle />:<IoSearchCircleOutline />}
          </span>
        </Link>
        <Link to={"/chat"} onClick={()=>setTab("/chat")} className="flex flex-col items-center text-2xl">
          <span>
            {tab==='/chat'?<IoChatbubbleEllipsesSharp />:<IoChatbubbleEllipsesOutline />}
          </span>
        </Link>
        <Link to={"/account"} onClick={()=>setTab("/account")} className="flex flex-col items-center text-2xl">
          <span>
            {tab==='/account'?<RiAccountCircleFill />:<RiAccountCircleLine />}
          </span>
        </Link>

      </div>
    </div>
  );
};

export default NavigationBar;
