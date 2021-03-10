import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions";
import { Grid, Menu, Header, Icon, Dropdown } from "semantic-ui-react";
import "./Navbar.css";

export default function Navbar() {
  const logIn = useSelector((state) => state.logIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const move = (e, { value }) => {
    if (value === "/home") {
      e.preventDefault();
      dispatch(userLogout());
    }
    history.push(value);
  };
  const trigger = (
    <span>
      <Icon name="user" /> Hello, {`${user.name}`}
    </span>
  );

  const loggedOptions = [
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
    { key: "sign-out", text: "Sign Out", value: "/home" },
  ];
  return (
    <Grid
      verticalAlign="middle"
      padded
      columns={2}
      as="header"
      className="app-header"
    >
      <Grid.Row>
        <Grid.Column textAlign={"center"} width={2} only="mobile">
          <Dropdown item icon="bars" simple>
            <Dropdown.Menu>
              <Dropdown.Item disabled>
                <span>
                  <Icon name="user" /> Hello, {`${user.name}`}
                </span>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/about">
                  <Icon name="info circle" />
                  About
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/">
                  <Icon name="book" />
                  Material
                </Link>
              </Dropdown.Item>
              {logIn ? (
                <React.Fragment>
                  <Dropdown.Item>
                    <Link to="/profile">
                      <Icon name="user circle" />
                      Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/my_resources">
                      <Icon name="star" />
                      My Resources
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/my_comments">
                      <Icon name="comment" />
                      My Comments
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/logout">
                      <Icon name="logout" />
                      Logout
                    </Link>
                  </Dropdown.Item>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Dropdown.Item>
                    <Link to="/register">
                      <Icon name="signup" />
                      Register
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/login">
                      <Icon name="sign-in" />
                      Login
                    </Link>
                  </Dropdown.Item>
                </React.Fragment>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
        <Grid.Column width={14} only="mobile">
          <Link to="/">
            <Header as="h1">Student Companion</Header>
          </Link>
        </Grid.Column>

        <Grid.Column width={9} only="tablet computer">
          <Link to="/">
            <Header as="h1">Student Companion</Header>
          </Link>
        </Grid.Column>

        <Grid.Column
          as="nav"
          textAlign={"right"}
          width={7}
          only="tablet computer"
        >
          <Menu compact secondary>
            <Menu.Item>
              <Link to="/about">
                <Icon name="info circle" />
                About
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">
                <Icon name="book" />
                Learn
              </Link>
            </Menu.Item>
            {logIn ? (
              <React.Fragment>
                <Menu.Item>
                  <Link to="/settings">
                    <Icon name="setting" />
                    Settings
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <a
                    href="/logout"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("LOGOUT!");
                      dispatch(userLogout());
                    }}
                  >
                    <Icon name="logout" />
                    Logout
                  </a>
                </Menu.Item>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Menu.Item>
                  <Link to="/register">
                    <Icon name="signup" />
                    Register
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/login">
                    <Icon name="sign-in" />
                    Login
                  </Link>
                </Menu.Item>
              </React.Fragment>
            )}
          </Menu>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
