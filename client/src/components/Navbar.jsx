import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions";
import { Dropdown, Icon } from "semantic-ui-react";

export default function Navbar() {
  const logIn = useSelector((state) => state.logIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const move = (e, { value }) => {
    history.push(value);
  };
  const trigger = (
    <span>
      <Icon name="user" /> Hello, {`${user.name}`}
    </span>
  );

  const options = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user.name}</strong>
        </span>
      ),
      disabled: true,
    },
    { key: "profile", text: "Profile", value: "/profile" },
    { key: "stars", text: "My Resources", value: "/my_resources" },
    { key: "explore", text: "My Comments", value: "/my_comments" },
    { key: "sign-out", text: "Sign Out", value: "/logout" },
  ];

  return (
    <header className="app-header">
      <Link to="/">(LOGO)</Link>
      <h1>
        <Link to="/">Student Companion</Link>
      </h1>
      {logIn ? (
        <Dropdown trigger={trigger} options={options} onChange={move} />
      ) : null}

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
