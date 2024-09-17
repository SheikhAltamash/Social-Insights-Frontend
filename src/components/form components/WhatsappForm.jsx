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

  return (
    <div>
      <Navbar home={true}></Navbar>
   <div className="form">
        <h2>Enter WhatsApp Number</h2>
        <form  className="facefor">
          <div>
            <input
              placeholder="Enter Username or Mobile Number"
              type="text"             
              required
            />
          </div>
          <button
            type="submit"
            className={`button`}
            disabled={load}
          >
          Get Code
          </button>
        </form>
      </div>
    
    </div>
  );
};
