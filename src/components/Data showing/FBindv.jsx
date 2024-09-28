import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import axios from "axios";
import folderImg from "../../assets/folder.png";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
export const FBIndv = () => {
  let [data, setData] = useState([{}]);
  let [loading, setLoading] = useState(false);
  let [searchData, setSearchData] = useState("");
  let [chack, setCheck] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:8080/facebook/fbData");
      setData(response.data);
    };
    getData();
    setLoading(true);
  }, []);

  const truncateName = (name) => {
    if (!name) return "Unknown"; // Provide fallback if name is null or undefined
    return name.length > 13 ? `${name.slice(0, 14)}...` : name;
  };

  let navigate = useNavigate();

  // Handle input change to search by name or case number
  let handleChange = (e) => {
    let value = e.target.value.toLowerCase();
    setSearchData(value);
  };

  let filteredData = searchData
    ? data.filter((user) => {
        return (
          user.case_no?.toLowerCase().includes(searchData) ||
          user.name?.toLowerCase().includes(searchData)
        );
      })
    : data;

  return (
    <div>
      <Navbar></Navbar>
      {loading && (
        <div className="search_component">
          <SearchIcon className="search_icon"></SearchIcon>
          <input
            type="text"
            className="search_data_fb"
            placeholder="Search by name or case number"
            onChange={handleChange}
          />
        </div>
      )}
      {loading === false ? (
        <div className="container"></div>
      ) : (
        <div className="FbIndv_Data">
          {filteredData.map((user, i) => {
            return (
              <div
                key={i}
                className="fbIndv_data_div"
                onClick={() => {
                  navigate("/fbData", { state: { case_no: user.case_no } });
                }}
              >
                <img src={folderImg} className="folderImg" alt="folder" />
                <h6>{user.case_no}</h6>
                <h5>{truncateName(user.name)}</h5>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
