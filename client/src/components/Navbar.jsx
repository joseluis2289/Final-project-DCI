import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions";
import { Grid, Menu, Header, Icon } from "semantic-ui-react";

export default function Navbar() {
  const logIn = useSelector((state) => state.logIn);
  const dispatch = useDispatch();
  return (
    <Grid columns={2} as="header" className="app-header">
      <Grid.Row>
        <Grid.Column width={8}>
          <Link to="/">
            <Header as="h1">
              <Icon name="book" />
              Student Companion
            </Header>
          </Link>
        </Grid.Column>
        <Grid.Column as="nav" textAlign={"right"} width={8}>
          <Menu compact>
            <Menu.Item>
              <Link to="/home">
                <Icon name="home" />
                Home
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
          </Menu>{" "}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
