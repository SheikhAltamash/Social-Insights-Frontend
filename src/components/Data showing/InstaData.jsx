import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
// import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "./Data.css";
import {
  downloadAllPdfsAtATime,
  downloadPdfWithLinks,
} from "./helperDatafunction";
import { useLocation } from "react-router-dom";
// import { ContactlessOutlined } from "@mui/icons-material";

export const InstaData = () => {
  // const [visiblePost, setVisiblePost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [activeOption, setActiveOption] = useState("Posts");

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  const location = useLocation();
const receivedData = location.state || {
  username: localStorage.getItem("username"),
  password: localStorage.getItem("password"),
  case_no: localStorage.getItem("case_no"),
  name: localStorage.getItem("name"),
};
  
  const fetchData = async (retries = 3) => {
    try {
      console.log(receivedData);
      console.log("sending request to the server");
      const response = await axios.post(
        `https://social-insights-backend.onrender.com/InstaIndividual`,
        { case_no: receivedData.case_no || 1244321 }
      );
      // const response = await axios.post(
      //   `http://localhost:8080/InstaIndividual`,
      //   { case_no: receivedData.case_no || 1244321 }
      // );
      setData(response.data);
      console.log(response.data);
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
    
  }, []);

 


  const downloadAllPdfs = () => {
    selectedPosts.forEach((index) => {
      const post = data.post[index];
      downloadPdfWithLinks(post.cloudinary_url, post.links, index);
    });
    setSelectedPosts([]);
  };

  
  //   setVisiblePost(null);
  // };

  // const handleClickOutside = (e) => {
  //   if (e.target.className === "overlay") {
  //     handleClose();
  //   }
  // };

  return (
    <div className="main_div_post_fb">
      <Navbar home={true}></Navbar>
      {!loading == true && (
        <div className="div_name_posts">
          <p className="name_post_fb">
            Name : <span>{receivedData.name}</span>
          </p>
          <p className="case_no_post_fb">
            Case number : <span>{receivedData.case_no}</span>
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
            <p>Chats</p>
            <div className="underline"></div>
          </div>
          <div
            className={`one_option ${
              activeOption === "Messages" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("Messages")}
          >
            <p>Posts</p>
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
                <div className="container"></div>
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
                <div></div>
              ) : data.chats && data.chats.length > 0 ? (
                data.chats.map((chat, index) => (
                  <div
                    key={index}
                    className="post_div"
                    onClick={() => (window.location.href = chat.url)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* <span className="idx_post">{chat.name}</span> */}
                    <a href={chat.url}>{chat.name}</a>
                  </div>
                ))
              ) : (
                <div className="container"></div>
              )}
            </div>
          </div>
        )}

        {activeOption === "Messages" && (
          <div className="content_messages">
            <div className="main_post_div">
              <a href={data.posts}>
                <div className="post_div">Posts</div>
              </a>
            </div>
          </div>
        )}
        {activeOption === "Followers" && (
          <div className="content_followers">
            <div className="main_post_div">
              <a href={data.followers}>
                <div className="post_div">Followers</div>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
