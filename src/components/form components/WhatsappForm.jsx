import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../Navbar";
import axios from "axios";
export const Whatsapp = () => {
  let [qr, setQr] = useState("");
  let [retryQr, setRetry] = useState(false);
  let [load, setload] = useState(false);
  let [timer, setTimer] = useState(40); // 40-second timer
  let [qrVisible, setQrVisible] = useState(true);
  const [showbtn, setshowbtn] = useState(false);
  const Data = {
    username: "",
    password: "",
    case_no: "",
    name: "",
  };
  const [data, setData] = useState(Data);
  const handleInputChange = (e, i) => {
    setData({
      ...data,
      [i]: e.target.value,
    });
  };
  const showbtnbox = () => {
    setshowbtn(!showbtn);
  };
  return (
    <div>
      <Navbar home={true}></Navbar>
      <div className="face_buttons">
        {!showbtn && (
          <button>
            <Link to={"/fbData"} className="face_buttons_link">
              See All User Data
            </Link>
          </button>
        )}
        <button
          className={`${!showbtn ? "" : "btn_close_ff"}`}
          onClick={() => {
            showbtnbox();
          }}
        >
          Add New User Data
        </button>
      </div>
      <div className="form">
        <h2>Enter WhatsApp Number</h2>
        <form className="facefor">
          <div className="top_form_fb">
            <div>
              <input
                type="text"
                placeholder="Enter Case Number"
                value={data.case_no}
                required
                onChange={(e) => {
                  handleInputChange(e, "case_no");
                }}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Name"
                value={data.name}
                required
                onChange={(e) => {
                  handleInputChange(e, "name");
                }}
              />
            </div>
          </div>
          <div>
            <input
              placeholder="Enter Username or Mobile Number"
              type="text"
              required
            />
          </div>
          <button type="submit" className={`button`} disabled={load}>
            Get Code
          </button>
        </form>
      </div>
    </div>
  );
};
