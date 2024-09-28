import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./Data.css";
import Checkbox from "@mui/material/Checkbox";
import {
  downloadAllPdfsAtATime,
  downloadPdfWithLinks,
} from "./helperDatafunction";
import { useLocation } from "react-router-dom";

export const FbData = () => {
  const [visiblePost, setVisiblePost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [activeOption, setActiveOption] = useState("Posts");

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  const location = useLocation();
  let { case_no } = location.state;
  const fetchData = async (retries = 3) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/facebook/fbIndividual`,
        { case_no: case_no }
      );
      setData(response.data);
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
  useEffect(() => {
    fetchData();

    const eventSource = new EventSource(
      "http://localhost:8080/facebook/events"
    );
    eventSource.onmessage = (event) => {
      const newScreenshotData = JSON.parse(event.data);
      setData((prevData) => ({
        ...prevData,
        post: [...prevData.post, newScreenshotData],
      }));
    };
    return () => {
      eventSource.close();
    };
  }, [case_no]);

  const handleImageClick = (index) => {
    setVisiblePost(index);
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
      const post = data.post[index];
      downloadPdfWithLinks(post.cloudinary_url, post.links, index);
    });
    setSelectedPosts([]);
  };

  const handleClose = () => {
    setVisiblePost(null);
  };

  const handleClickOutside = (e) => {
    if (e.target.className === "overlay") {
      handleClose();
    }
  };

  return (
    <div className="main_div_post_fb">
      <Navbar home={true}></Navbar>
      {!loading == true && (
        <div className="div_name_posts">
          <p className="name_post_fb">
            Name : <span>{data.name}</span>
          </p>
          <p className="case_no_post_fb">
            Case number : <span>{data.case_no}</span>
          </p>
        </div>
      )}

      {loading ? (
        <p></p>
      ) : (
        <div className="options">
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
        </div>
      )}
      <div className="content">
        {activeOption === "Posts" && (
          <div className="content_posts">
            <div className="down_btns">
              {loading ? (
                <p></p>
              ) : (
                <button
                  className="download_all_btn all_download"
                  onClick={() => {
                    downloadAllPdfsAtATime(data.post);
                  }}
                >
                  Download all posts
                </button>
              )}
              {!selectedPosts.length > 0 ? (
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
            </div>

            <div className="main_post_div">
              {loading ? (
                <div class="container"></div>
              ) : (
                data.post.map((post, index) => (
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
                            {post.links && post.links.length > 0 ? (
                              <p className="p_post_video">
                                Videos or External links of a post
                              </p>
                            ) : (
                              <p></p>
                            )}
                            {post.links && post.links.length > 0 ? (
                              post.links.map((link, idx) => {
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
                              })
                            ) : (
                              <p>No links available</p> // Optionally, display a message when there are no links
                            )}
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
