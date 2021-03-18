import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout, filterCategory } from "../redux/actions";
import { Grid, Menu, Header, Icon, Dropdown } from "semantic-ui-react";
import "./Navbar.css";

export default function Navbar() {
  const logIn = useSelector((state) => state.logIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Grid
      verticalAlign="middle"
      padded
      columns={2}
      as="header"
      className="app-header"
    >
      <Grid.Row only="mobile">
        <Grid.Column width={14}>
          <Link to="/">
            <Header as="h1">Student Companion</Header>
          </Link>
        </Grid.Column>
        <Grid.Column textAlign={"center"} width={2}>
          <Dropdown item icon="bars" simple pointing="right">
            <Dropdown.Menu
              style={{
                margin: "1rem -1rem",
                backgroundColor: "var(--yellow-light",
              }}
            >
              <Dropdown.Item>
                <span style={{ color: "var(--violett-dark)" }}>
                  <Icon name="user" /> Hello, {user.name ? user.name : "Guest"}
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  history.push("/");
                }}
              >
                <Icon name="home" />
                Home
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  history.push("/about");
                }}
              >
                <Icon name="info circle" />
                About
              </Dropdown.Item>
              <Dropdown.Item>
                <Menu.Item
                  onClick={async () => {
                    await dispatch(filterCategory("general", true));
                    await dispatch(filterCategory("frontend", true));
                    await dispatch(filterCategory("backend", true));
                    await dispatch(filterCategory("database", true));
                    history.push("/home");
                  }}
                  style={{ color: "black" }}
                >
                  <Icon name="book" />
                  Resources
                </Menu.Item>
              </Dropdown.Item>
              {logIn ? (
                <React.Fragment>
                  <Dropdown.Item
                    onClick={() => {
                      history.push("/profile");
                    }}
                  >
                    <Icon name="user circle" />
                    Profile
                  </Dropdown.Item>
                  {user.resources !== [] && (
                    <Dropdown.Item
                      onClick={() => {
                        history.push("/my_resources");
                      }}
                    >
                      <Icon name="star" />
                      My Resources
                    </Dropdown.Item>
                  )}
                  {user.comments !== [] && (
                    <Dropdown.Item
                      onClick={() => {
                        history.push("/my_comments");
                      }}
                    >
                      <Icon name="comments" />
                      My Comments
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("LOGOUT!");
                      dispatch(userLogout());
                      history.push("/");
                    }}
                  >
                    <Icon name="logout" />
                    Logout
                  </Dropdown.Item>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Dropdown.Item
                    onClick={() => {
                      history.push("/register");
                    }}
                  >
                    <Icon name="signup" />
                    Register
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    <Icon name="sign-in" />
                    Login
                  </Dropdown.Item>
                </React.Fragment>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2} only="tablet computer">
        <Grid.Column floated="left" width={7}>
          <Link to="/">
            <Header as="h1">Student Companion</Header>
          </Link>
        </Grid.Column>

        <Grid.Column as="nav" textAlign={"right"} floated="right" width={9}>
          <Menu compact secondary>
            <Menu.Item
              onClick={() => {
                history.push("/");
              }}
            >
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                history.push("/about");
              }}
            >
              <Icon name="info circle" />
              About
            </Menu.Item>
            <Menu.Item
              onClick={async () => {
                await dispatch(filterCategory("general", true));
                await dispatch(filterCategory("frontend", true));
                await dispatch(filterCategory("backend", true));
                await dispatch(filterCategory("database", true));
                history.push("/home");
              }}
            >
              <Icon name="book" />
              Resources
            </Menu.Item>
            {logIn ? (
              <Menu.Item>
                <Dropdown
                  className="dropdown-label"
                  text={`Hello ${user.name}`}
                  icon="user"
                  simple
                >
                  <Dropdown.Menu
                    style={{
                      backgroundColor: "var(--yellow-light)",
                      border: "none",
                      margin: " -2rem ",
                    }}
                  >
                    <Dropdown.Item>
                      <span style={{ color: "var(--violett-dark)" }}>
                        <Icon name="user" /> Hello,{" "}
                        {user.name ? user.name : "Guest"}
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        history.push("/profile");
                      }}
                    >
                      <Icon name="user circle" />
                      Profile
                    </Dropdown.Item>
                    {user.resources === [] ? null : (
                      <Dropdown.Item
                        onClick={() => {
                          history.push("/my_resources");
                        }}
                      >
                        <Icon name="star" />
                        My Resources
                      </Dropdown.Item>
                    )}
                    {user.comments !== [] && (
                      <Dropdown.Item
                        onClick={() => {
                          history.push("/my_comments");
                        }}
                      >
                        <Icon name="comments" />
                        My Comments
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("LOGOUT!");
                        dispatch(userLogout());
                        history.push("/");
                      }}
                    >
                      <Icon name="logout" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            ) : (
              <React.Fragment>
                <Menu.Item
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  <Icon name="signup" />
                  Register
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  <Icon name="sign-in" />
                  Login
                </Menu.Item>
              </React.Fragment>
            )}
          </Menu>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
