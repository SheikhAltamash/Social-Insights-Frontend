import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
// import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

export const InstaForm = () => {
  const Data = {
    username: "",
    password: "",
    case_no: "",
    name: "",
  };
  const navigate = useNavigate();
  const [data, setData] = useState(Data);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showbtn, setshowbtn] = useState(false);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    const socket = new WebSocket(
      "ws://https://social-insights-backend.onrender.com/"
    );
    socket.onopen = () => console.log("WebSocket Connected");
    socket.onmessage = (event) => {
      const data1 = JSON.parse(event.data);
      if (data1.type === "progress") {
        setProgress(data1.status); // Update progress in real-time
      }
      if (data1.type === "crash") {
        setProgress(""); // Update progress in real-time
        setshowbtn(false);
        setLoading(false)
        setOpen(true);
        setData(Data);
        setError("Login failed. Please try again !!!");
        console.log("Server Crashed !!!")
      }
      if (data1.type === "done") {
        // Store in localStorage for persistence
        console.log("Current Data Before Navigation:", data);
        setData((prevData) => {
          navigate("/InstaData", {
            state: { ...prevData }, // Use latest data
          });
          return prevData; // Preserve state
        });
        console.log("From page insta Form", data);
      }
    
    };
    socket.onclose = () => console.log("WebSocket Disconnected");
    socket.onerror = (error) => console.error("WebSocket Error:", error);

    return () => socket.close();
  },[]);
  const handleSubmit = async (e) => {
    setOpen(false);
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://social-insights-backend.onrender.com/instagramlogin",
        {
          data,
        }
      );
      console.log(response.status);
      if (
        response.status === 200 &&
        (response.data.message === "Login successful !" ||
          response.data.message === "Already logged in !")
      ) {
      

        console.log("Login successful !");
        setLoading(false);
      } else {
        console.log("Login failed with status: ", response.status);
        setError("Login failed. Please check your credentials and try again.");
        setOpen(true);
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
        setError(error.response.data.message);
      } else if (error.request) {
        console.error("No response from the server:", error.request);
        setError("Login failed. No response from the server.");
      } else {
        console.error("Error setting up the login request:", error.message);
        setError("Login failed. Try Again");
      }
      setOpen(true);
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const showbtnbox = () => {
    setshowbtn(!showbtn);
  };

  const handleInputChange = (e, i) => {
    setData({
      ...data,
      [i]: e.target.value,
    });
    setOpen(false);
  };
  return (
    <div>
      <Navbar home={true} />
      <button onClick={showbtnbox}>
        <ArrowBackIcon></ArrowBackIcon>
      </button>

      <div className="face_buttons">
        {!showbtn && (
          <div>
            <button>
              <Link to={"/fbUsers"} className="face_buttons_link">
                See All User Data
              </Link>
            </button>{" "}
            <button
              className={`${!showbtn ? "" : "btn_close_ff"}`}
              onClick={() => {
                showbtnbox();
              }}
            >
              Add New User Data
            </button>
          </div>
        )}
      </div>
      <Box sx={{ width: "100%" }} className="Alert_fb">
        <Collapse in={open} className="col_er">
          {error && (
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              className="alertError"
            >
              {error}
            </Alert>
          )}
        </Collapse>
      </Box>
      {showbtn && progress == "" ? (
        <div className="form">
          <h2>Enter Instagram credentials</h2>
          <form onSubmit={handleSubmit} className="facefor">
            <div className="top_form_fb">
              <div>
                <input
                  type="number"
                  placeholder="Enter Case Number"
                  value={data.case_no}
                  required
                  onChange={(e) => {
                    handleInputChange(e, "case_no");
                  }}
                  className="numberTypeInput"
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
                value={data.username}
                onChange={(e) => {
                  handleInputChange(e, "username");
                }}
                required
              />
            </div>
            <div className="password-field">
              <input
                placeholder="Enter Password"
                type={passwordVisible ? "text" : "password"} // Toggle between text and password type
                value={data.password}
                onChange={(e) => {
                  handleInputChange(e, "password");
                }}
                required
              />
              <IconButton
                onClick={togglePasswordVisibility}
                edge="end"
                aria-label="toggle password visibility"
                className="but_vis"
              >
                {passwordVisible ? (
                  <VisibilityIcon className="but_i" />
                ) : (
                  <VisibilityOffIcon className="but_i" />
                )}
              </IconButton>
            </div>
            <button
              type="submit"
              className={`button ${loading ? "loading" : ""}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      {progress != "" && (
        <div>
          <div className="container"></div>
          <div className="progress">{progress}</div>
        </div>
      )}
    </div>
  );
};
