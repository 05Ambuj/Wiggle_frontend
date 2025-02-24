import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { postData } from "../context/PostContext";

const Home = () => {
  const { posts } = postData();
  return (
    <div>
      <AddPost type="post" />
      {posts && posts.length > 0 ? (
        posts.map((e) => <PostCard value={e} key={e._id} type="posts" />)
      ) : (
        <p>No Posts</p>
      )}

      {/* <PostCard type="post" /> */}
    </div>
  );
};

export default Home;
