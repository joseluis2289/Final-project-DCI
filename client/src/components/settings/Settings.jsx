import React from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div>
      <Link to="/add_resource">
        <img
          className="icon"
          src="icons/icon_add_resource.svg"
          alt="Login Icon"
        />
        AddResource
      </Link>{" "}
      <Link to="/my_resources">MyResources</Link>{" "}
      <Link to="/update_resource">
        <img
          className="icon"
          src="icons/icon_update_resource.svg"
          alt="Login Icon"
        />
        UpdateResource
      </Link>{" "}
    </div>
  );
}
