import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { postData } from "../context/PostContext";
import {Loading} from "../components/Loading";

const Home = () => {
  const { posts,loading } = postData();
  return (
    <>
    {loading?<Loading/>:(<div>
      <AddPost type="post" />
      {posts && posts.length > 0 ? (
        posts.map((e) => <PostCard value={e} key={e._id} type="posts" />)
      ) : (
        <p>No Posts</p>
      )}
    </div>)}
    </>
  );
};

export default Home;
