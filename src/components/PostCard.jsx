import React, { useEffect, useState } from "react";
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { postData } from "../context/PostContext";

const PostCard = ({ type, value }) => {
  const [isLike, setIsLike] = useState(false);
  const [show, setShow] = useState(false);
  const [comment,setComment]=useState("")
  const {user}=UserData()
  const {likePost,addComment}=postData()

  useEffect(()=>{
    for(let i=0;i<value.likes.length;i++){
      if(value.likes[i]===user._id)
        setIsLike(true)
    }
  },[value,user._id])

  const likeHandler=()=>{
    setIsLike(!isLike)
    likePost(value._id)
  }

  const addCommentHandler=(e)=>{
    e.preventDefault()
    addComment(value._id,comment,setComment,setShow)
  }


  return (
    <div className="bg-gray-100 flex justify-center items-center pt-3 pb-14">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-row gap-2 pb-1 ">
            <img
              src={value.owner.profilePic.url}
              alt="Profile Picture"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-gray-800 font-semibold">{value.owner.name}</p>
              <div className="text-gray-500 text-sm"></div>
            </div>
          </div>
          <div className="text-gray-500 ">
            <button className="cursor-pointer hover:bg-gray-50 rounded-full p-1 text-2xl">
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-800">{value.caption}</p>
        </div>

        <div className="mb-4">
          {type === "posts" ? (
            <img
              src={value.post.url}
              alt="Post Image"
              className="w-[450px] h-[600px] object-cover rounded-md"
            />
          ) : (
            <video
              src={value.post.url}
              alt=""
              className="w-[450px] h-[600px] object-cover rounded-md"
              autoPlay
              controls
            />
          )}
        </div>
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <span
              onClick={likeHandler}
              className="text-red-500 text-2xl cursor-pointer"
            >
              {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
            </span>
            <button className="hover:bg-gray-50 rounded-full p-1">
              {value.likes.length} likes
            </button>
          </div>
          <button
            className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
            onClick={() => setShow(!show)}
          >
            <BsChatFill />
            <span>{value.comments.length} comments</span>
          </button>
        </div>
        {show && (
          <form onSubmit={addCommentHandler} className="flex gap-3">
            <input
              type="text"
              className="custom-input"
              placeholder="Enter Comment"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
            />
            <button type="submit" className="bg-gray-100 rounded-lg px-5 py-2">Add</button>
          </form>
        )}
        <hr className="mt-2 mb-2" />
        <p className="text-gray font-semibold"> Comments</p>
        <hr className="mt-2 mb-2" />
        <div className="mt-4 ">
          <div className="comments max-h-[200px] overflow-y-auto">
            {value.comments && value.comments.length > 0 ? (
              value.comments.map((e) => <Comment value={e} key={e._id}/>)
            ) : (
              <p>No Comments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

export const Comment = ({value}) => {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <img src="new.jpg" alt="" />
      <div className="">
        <p className="text-gray-800 font-semibold">{value.name}</p>
        <p className="text-gray-500 font-sm">{value.comment}</p>
      </div>
    </div>
  );
};
