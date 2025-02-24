import React, { useState } from "react";
import AddPost from "../components/AddPost";
import { postData } from "../context/PostContext";
import PostCard from "../components/PostCard";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const Reels = () => {
  const [index, setIndex] = useState(0);
  const { reels } = postData();

  const prevReel = () => {
    if (index === 0) {
      return null;
    }
    setIndex(index - 1);
  };

  const nextReel = () => {
    if (index === reels.length - 1) {
      return null;
    }
    setIndex(index + 1);
  };

  return (
    <>
      <div className="bg-gray-100">
        <AddPost type="reel" />
        <div className="flex gap-3 m-auto w-[300px] md:w-[500px]">
          {reels && reels.length > 0 ? (
            <PostCard
              value={reels[index]}
              key={reels[index]._id}
              type={"reel"}
            />
          ) : (
            <p>No Reels</p>
          )}
          <div className="button flex flex-col justify-center items-center gap-6">
            {index === 0 ? (
              ""
            ) : (
              <button
                onClick={prevReel}
                className="bg-gray-500 text-white py-5 px-5 rounded-full"
              >
                <MdOutlineKeyboardArrowUp />
              </button>
            )}
            {index === reels.length - 1 ? (
              ""
            ) : (
              <button
                onClick={nextReel}
                className="bg-gray-500 text-white py-5 px-5 rounded-full"
              >
                <MdOutlineKeyboardArrowDown />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reels;
