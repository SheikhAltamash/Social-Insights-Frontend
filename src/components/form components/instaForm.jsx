import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from '../Navbar';

export const InstaForm = () => {
  return (
    <div>
      <Navbar home={true} ></Navbar>
      <h1 className="protoError">
        This route is under development. Please check back later as we continue
        to enhance the functionality of our prototype.
      </h1>
      <Link className="home_link" to={"/"}>
        <button className='btn'>Back To Home</button>
      </Link>
    </div>
  );
}
