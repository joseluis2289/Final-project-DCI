import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions";

export default function Navbar() {
  const logIn = useSelector((state) => state.logIn);
  const dispatch = useDispatch();
  return (
    <header className="app-header">
      <Link to="/">(LOGO)</Link>
      <h1>
        <Link to="/results">Student Companion</Link>
      </h1>
      <nav>
        {/* Icons from https://material.io/resources/icons/ */}
        <Link to="/home">
          <img className="icon" src="icons/home.svg" alt="Home Icon" />
          Home
        </Link>
        {logIn ? (
          <React.Fragment>
            <Link to="/settings">
              <img className="icon" src="icons/settings.svg" alt="Login Icon" />
              Settings
            </Link>

            <a
              href="/logout"
              onClick={(e) => {
                e.preventDefault();
                console.log("LOGOUT!");
                dispatch(userLogout());
              }}
            >
              <img
                className="icon"
                src="icons/icon_logout.svg"
                alt="Logout Icon"
              />
              Logout
            </a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/register">
              <img
                className="icon"
                src="icons/icon_register.svg"
                alt="Register Icon"
              />
              Register
            </Link>
            <Link to="/login">
              <img
                className="icon"
                src="icons/icon_login.svg"
                alt="Login Icon"
              />
              Login
            </Link>
          </React.Fragment>
        )}
      </nav>
    </header>
  );
}
