import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("token");

  return(
    <div className="container"> 
        <p>Your are successfully logged out</p>
        <Link to="/">Go to the main Page</Link>
    </div>
  );
};

export default Logout;