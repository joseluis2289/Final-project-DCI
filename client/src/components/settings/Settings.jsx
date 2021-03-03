import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="settings-navbar">
      <Link to="/profile">
        <img className="icon" src="icons/icon_profile.svg" alt="Profile Icon" />
        Profile
      </Link>
      <Link to="/add_resource">
        <img className="icon" src="icons/add.svg" alt="Login Icon" />
        AddResource
      </Link>{" "}
      <Link to="/my_resources">
        {" "}
        <img className="icon" src="icons/list.svg" alt="Login Icon" />
        MyResources
      </Link>{" "}
      <Link to="/my_comments">
        {" "}
        <img className="icon" src="icons/comment.svg" alt="Login Icon" />
        My Comments
      </Link>{" "}
    </div>
  );
}
