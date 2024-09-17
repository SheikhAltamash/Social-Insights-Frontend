import React, { useState } from "react";
import { Navbar } from "../Navbar";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export const FacebookForm = () => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    setLoading(true); // Set loading to true to disable button
    try {
      // Send the login request with username and password
      const response = await axios.post("http://localhost:8080/fblogin", {
        data,
      });

      if (
        response.status === 200 &&
        (response.data.message === "Login successful" ||
          response.data.message === "Already logged in")
      ) {
        console.log("Login successful");
        setLoading(false); // Reset loading state on success
        navigate("/fbData"); // Navigate to fbData route if login is successful
      } else {
        console.log("Login failed with status: ", response.status);
        setError("Login failed. Please check your credentials and try again.");
        setOpen(true); // Show error alert if login fails
        setLoading(false); // Reset loading state on error
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
      setOpen(true); // Show error alert if there is an exception
      setLoading(false); // Reset loading state on error
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
  };
  return (
    <div>
      <Navbar home={true} />

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
            >
              {error}
            </Alert>
          )}
        </Collapse>
      </Box>
      {showbtn ? (
        <div className="form">
          <h2>Enter Facebook credentials</h2>
          <form onSubmit={handleSubmit} className="facefor">
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
        <p></p>
      )}
    </div>
  );
};
