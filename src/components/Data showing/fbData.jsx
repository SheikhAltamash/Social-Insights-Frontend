import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "./Data.css";
import Checkbox from "@mui/material/Checkbox";
import {
  downloadAllPdfsAtATime,
  downloadPdfWithLinks,
} from "./helperDatafunction";

export const FbData = () => {
  const [visiblePost, setVisiblePost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [activeOption, setActiveOption] = useState("Posts"); // Default active option is 'Posts'

  const handleOptionClick = (option) => {
    setActiveOption(option); // Set the clicked option as active
  };
  useEffect(() => {
    const fetchData = async (retries = 3) => {
      try {
        const response = await axios.get("http://localhost:8080/fbData");
        setPosts(response.data); // Update state with new data
      } catch (error) {
        if (retries > 0) {
          console.warn(`Retrying fetch, attempts left: ${retries}`);
          fetchData(retries - 1);
        } else {
          console.error("Error fetching data:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);
  const handleImageClick = (index) => {
    setVisiblePost(index); // Show the respective post's div
  };

  const handleCheckboxChange = (index) => {
    setSelectedPosts((prevSelectedPosts) =>
      prevSelectedPosts.includes(index)
        ? prevSelectedPosts.filter((i) => i !== index)
        : [...prevSelectedPosts, index]
    );
  };

  const downloadAllPdfs = () => {
    selectedPosts.forEach((index) => {
      const post = posts[index];
      downloadPdfWithLinks(post.cloudinary_url, post.links, index);
    });
    setSelectedPosts([]);
  };

  const handleClose = () => {
    setVisiblePost(null); // Hide the visible div
  };

  const handleClickOutside = (e) => {
    if (e.target.className === "overlay") {
      handleClose(); // Close the brief div if clicking on overlay (background)
    }
  };

  return (
    <div className="main_div_post_fb">
      <Navbar home={true}></Navbar>
     {loading?(<p></p>):( <div className="options">
        <div
          className={`one_option ${activeOption === "Posts" ? "active" : ""}`}
          onClick={() => handleOptionClick("Posts")}
        >
          <p>Posts</p>
          <div className="underline"></div>
        </div>
        <div
          className={`one_option ${
            activeOption === "Messages" ? "active" : ""
          }`}
          onClick={() => handleOptionClick("Messages")}
        >
          <p>Messages</p>
          <div className="underline"></div>
        </div>
        <div
          className={`one_option ${
            activeOption === "Followers" ? "active" : ""
          }`}
          onClick={() => handleOptionClick("Followers")}
        >
          <p>Followers</p>
          <div className="underline"></div>
        </div>
      </div>)}
      <div className="content">
        {activeOption === "Posts" && (
          <div className="content_posts">
            {loading ? (
              <p></p>
            ) : (
              <button
                className="download_all_btn"
                onClick={downloadAllPdfs}
                disabled={selectedPosts.length === 0}
              >
                Download selected posts
              </button>
            )}
            {loading ? (
              <p></p>
            ) : (
              <button
                className="download_all_btn all_download"
                onClick={() => {
                  downloadAllPdfsAtATime(posts);
                }}
              >
                Download all posts
              </button>
            )}

            <div className="main_post_div">
              {posts > 0 ? (
                <div class="container"></div>
              ) : (
                posts.map((post, index) => (
                  <div key={index} className="post_div">
                    <img
                      src={post.cloudinary_url}
                      alt="Post"
                      className={`post_img ${
                        selectedPosts.includes(index) ? "selected" : ""
                      }`}
                      onClick={() => handleImageClick(index)} // Show respective post on click
                    />
                    <span className="idx_post">{index + 1}</span>
                    <div className="checkbox_container">
                      <Checkbox
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        type="checkbox"
                        className="checkbox"
                        checked={selectedPosts.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </div>

                    {/* Brief Post Div - only visible when its respective image is clicked */}
                    {visiblePost === index && (
                      <div className="overlay" onClick={handleClickOutside}>
                        <div className="brief_post_div_visible">
                          <button className="close_btn" onClick={handleClose}>
                            <CloseIcon className="close_post"></CloseIcon>
                          </button>
                          <div className="img_post_overflow">
                            <img
                              src={post.cloudinary_url}
                              alt="Post"
                              className="brief_post_img"
                            />
                          </div>
                          <div className="link_div_post">
                            {post.links.map((link, idx) => {
                              return (
                                <a
                                  href={link}
                                  key={idx}
                                  className="a_link_post"
                                >
                                  <button className="link_button_post">
                                    Link {idx + 1}
                                  </button>
                                </a>
                              );
                            })}
                          </div>

                          <button
                            className="download_btn"
                            onClick={() =>
                              downloadPdfWithLinks(
                                post.cloudinary_url,
                                post.links,
                                index + 1
                              )
                            }
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {activeOption === "Messages" && (
          <div className="content_messages">
            {/* Your messages data goes here */}
            <p>This is the Messages section</p>
          </div>
        )}
        {activeOption === "Followers" && (
          <div className="content_followers">
            {/* Your followers data goes here */}
            <p>This is the Followers section</p>
          </div>
        )}
      </div>
    </div>
  );
};
