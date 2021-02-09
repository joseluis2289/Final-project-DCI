import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./redux/actions";
import Searchbar from "./components/Searchbar";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";
import Resource from "./components/Resource";
import NotFound from "./components/NotFound";
import "./App.css";

export default function App() {
  const login = useSelector((state) => state.username);
  const dispatch = useDispatch();
  console.log(login);
  return (
    <Router>
      <header className="app-header">
        <Link to="/">(LOGO)</Link>
        <h1>
          <Link to="/">Student Companion</Link>
        </h1>
        <nav>
          {/* Icons from https://material.io/resources/icons/ */}
          <Link to="/register">
            <img
              className="icon"
              src="icons/icon_register.svg"
              alt="Register Icon"
            />
            Register
          </Link>
          {login ? (
            <a
              href="/logout"
              onClick={(e) => {
                e.preventDefault();
                console.log("LOGOUT!");
                dispatch(logoutUser());
              }}
            >
              <img
                className="icon"
                src="icons/icon_logout.svg"
                alt="Logout Icon"
              />
              Logout
            </a>
          ) : (
            <Link to="/login">
              <img
                className="icon"
                src="icons/icon_login.svg"
                alt="Login Icon"
              />
              Login
            </Link>
          )}
        </nav>
      </header>
      <Searchbar />
      <main>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact={true}>
            {login ? (
              <React.Fragment>
                <Resource />
                <Resource />
              </React.Fragment>
            ) : (
              <Welcome />
            )}
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <footer></footer>
    </Router>
  );
}
