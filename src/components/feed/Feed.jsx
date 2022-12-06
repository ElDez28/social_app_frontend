import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { useEffect } from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import axios from "axios";
function Feed({ id }) {
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { isLoading, error, sendRequest } = useHttp();
  const [newPost, setNewPost] = useState({});

  useEffect(() => {
    (async () => {
      const res = await sendRequest(
        "get",
        `${process.env.REACT_APP_BACKEND_URL}/posts`
      );
      setPosts(res.data);
    })();
  }, [sendRequest, newPost]);

  const addPost = async (post) => {
    setNewPost({ ...post, likes: [] });
  };
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share addPost={addPost}></Share>

        {isLoading && (
          <LoadingSpinner className="lds-dual-bigRing"></LoadingSpinner>
        )}
        {posts.length > 0 &&
          posts.map((item, i) => {
            const img = item.img
              ? `${process.env.REACT_APP_BACKEND_SHORT}/public/images/posts/${item.img}`
              : "";
            return (
              <Post
                key={i}
                username={item.userId.username}
                time={item.createdAt}
                userImage={`${process.env.REACT_APP_BACKEND_SHORT}/public/images/users/${item.userId.photo}`}
                text={item.desc}
                img={img}
                likes={item.likes.length}
                comment={item.comment}
                id={item._id}
              ></Post>
            );
          })}
      </div>
    </div>
  );
}

export default Feed;
