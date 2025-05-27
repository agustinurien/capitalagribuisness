import React, { useEffect, useState } from "react";
import { fetchBlogPosts } from "../../utils/firebaseUtils";
import "./NoticiaContainer.css";
import { IoCloseSharp } from "react-icons/io5";

const NoticiaContainer = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      console.log("Fetching blog posts...");
      try {
        const data = await fetchBlogPosts();
        console.log("Posts fetched:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    loadPosts();
  }, []);

  const selectedPost = posts.find((post) => post.id === open);

  return (
    <div className="noticiaContainer">
      {open && selectedPost && (
        <div className="noticiaDetail">
          <div className="noticiaDetailContent">
            <div className="noticiaDetailHeader">
              <h2>{selectedPost.Titulo}</h2>
              <button onClick={() => setOpen("")} className="closeButton">
                <IoCloseSharp />
              </button>
            </div>
            <div className="imgNoticiaContainer">
              <img
                src={selectedPost.imagenDestacada}
                alt={selectedPost.Titulo}
                className="noticiaImageDetail"
              />
            </div>
            <p>{selectedPost.Parrafo}</p>
          </div>
        </div>
      )}
      {posts.map((post) => (
        <div key={post.id} onClick={() => setOpen(post.id)} className="noticia">
          <div className="noticiaImage"></div>
          <div className="noticiaContent">
            <h2>{post.Titulo}</h2>
            <p>{post.Resumen}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticiaContainer;
