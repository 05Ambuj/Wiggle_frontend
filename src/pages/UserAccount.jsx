import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { postData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import axios from "axios";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Loading } from "../components/Loading";

const UserAccount = ({ user: loggedInUser }) => {
  const navigate = useNavigate();
  const { posts, reels } = postData();
  const [type, setType] = useState("posts");
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/" + params.id);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  console.log(user);

  let myPosts, myReels;

  if (posts) myPosts = posts.filter((post) => post.owner._id === user._id);
  if (reels) myReels = reels.filter((reel) => reel.owner._id === user._id);

  const prevReel = () => {
    if (index === 0) return null;
    setIndex(index - 1);
  };

  const nextReel = () => {
    if (index === myReels.length - 1) return null;
    setIndex(index + 1);
  };
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {user && (
            <>
              <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
                <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
                  <div className="image flex flex-col justify-between gap-4 mb-4">
                    <img
                      src={user.profilePic.url}
                      alt=""
                      className="w-[180px] h-[180px] rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-800 font-semibold">{user.name}</p>
                    <p className="text-gray-500 font-sm">{user.email}</p>
                    <p className="text-gray-500 font-sm">{user.gender}</p>
                    <p className="text-gray-500 font-sm">
                      {user.followers.length} followers
                    </p>
                    <p className="text-gray-500 font-sm">
                      {user.followings.length} followings
                    </p>
                  </div>
                </div>
                <div className="controls flex justify-center items-center p-4 bg-white rounded-md gap-7">
                  <button onClick={() => setType("posts")}>Posts</button>
                  <button onClick={() => setType("reels")}>Reels</button>
                </div>
                {type === "posts" &&
                  (myPosts && myPosts.length > 0 ? (
                    myPosts.map((e) => (
                      <PostCard type={"posts"} value={e} key={e._id} />
                    ))
                  ) : (
                    <p>No Posts yet</p>
                  ))}
                {type === "reels" &&
                  (myReels && myReels.length > 0 ? (
                    <div className="flex gap-3 justify-center items-center">
                      <PostCard
                        type={"reels"}
                        value={myReels[index]}
                        key={myReels[index]._id}
                      />
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
                  ) : (
                    <p>No Reels yet</p>
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserAccount;
