import React, { useState } from "react";
import { Navbar } from "./Navbar";
import "./homenav.css";
import LanguageIcon from "@mui/icons-material/Language";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InsightsIcon from "@mui/icons-material/Insights";
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Home = () => {
  let [open, setopen] = useState();

  return (
    <div>
      <Navbar className="nav_home" color={"#646cffaa"}></Navbar>
      <div className="mainHome">
        <h2 className="con">Connect Account</h2>
        <p className="theory">
          <span>Social Insights</span> is a prototype tool designed to fetch{" "}
          <span>Facebook</span> posts in the form of high-quality screenshots.{" "}
          <br /> This streamlined solution automates data retrieval from user
          profiles, making it easier to capture and analyze visual content.{" "}
          <br /> Currently, it supports fetching only posts, laying the
          groundwork for future social media data extraction capabilities{" "}
        </p>

        <div className="features">
          <div className="one">
            <LanguageIcon className="icon_features"></LanguageIcon>
            <h3>Cross-Platform Access</h3>
            <p>
              Collect data from <span>Facebook</span>, <span>Instagram</span>,
              and <span>X</span>.
            </p>
          </div>
          <div className="one">
            <FitScreenOutlinedIcon className="icon_features"></FitScreenOutlinedIcon>
            <h3>Automated Screenshots</h3>
            <p>
              Automatically take screenshot of <span>Posts</span>,{" "}
              <span>Messages</span>, <span>About</span>, <span>Follwers</span>{" "}
              of individual user account.
            </p>
          </div>
          <div className="one">
            <CameraAltIcon className="icon_features"></CameraAltIcon>
            <h3>Automated Image Recognition</h3>
            <p>
              Easily analyze images to understand <span>content</span> and brand
              sentiment
            </p>
          </div>
          <div className="one">
            <SearchOutlinedIcon className="icon_features"></SearchOutlinedIcon>
            <h3>Identifying Extremist Content:</h3>
            <p>
              Flags extremist symbols or sentiments to prevent radicalization.
            </p>
          </div>
          <div className="one">
            <AccountBalanceWalletIcon className="icon_features"></AccountBalanceWalletIcon>
            <h3>Secure Data Storage</h3>
            <p>
              Use of <span>bcrypt</span> and <span>crypto</span> for encryption
              and making data safe{" "}
            </p>
          </div>
          <div className="one">
            <InsightsIcon className="icon_features"></InsightsIcon>
            <h3>Real-time Results</h3>
            <p>Get instant inssignts and monitor trends as they happen</p>
          </div>
          <div className="one">
            <BlurOnOutlinedIcon className="icon_features"></BlurOnOutlinedIcon>
            <h3>Sentiment Analysis</h3>
            <p>Understand user sentiment and track activities</p>
          </div>
          <div className="one">
            <ArrowDownwardOutlinedIcon className="icon_features"></ArrowDownwardOutlinedIcon>
            <h3>Effortless Integration</h3>
            <p>
              Our platform is designed for easy integration and rapid deployment
            </p>
          </div>
        </div>

        <div className="buttons">
          <Link className="home_link" to={"/FacebookForm"}>
            <button>Connect Facebook</button>
          </Link>
          <Link className="home_link" to={"/InstaForm"}>
            {" "}
            <button>Connect Instagram</button>
          </Link>
          <Link className="home_link" to={"/Xform"}>
            <button> Connect X</button>
          </Link>
        </div>

        <div className="form"></div>
      </div>
    </div>
  );
};
