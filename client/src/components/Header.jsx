import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions";

export default function Header() {
  const logIn = useSelector((state) => state.loginData.logIn);
  const dispatch = useDispatch();
  return (
    <header className='app-header'>
      <Link to='/'>(LOGO)</Link>
      <h1>
        <Link to='/'>Student Companion</Link>
      </h1>
      <nav>
        {/* Icons from https://material.io/resources/icons/ */}
        {logIn ? (
          <React.Fragment>
            <Link to='/profile'>
              <img
                className='icon'
                src='icons/icon_profile.svg'
                alt='Profile Icon'
              />
              {logIn}
            </Link>
            <Link to='/add_resource'>
              <img
                className='icon'
                src='icons/icon_add_resource.svg'
                alt='Login Icon'
              />
              AddResource
            </Link>
            <Link to='/update_resource'>
              <img
                className='icon'
                src='icons/icon_update_resource.svg'
                alt='Login Icon'
              />
              UpdateResource
            </Link>
            <a
              href='/logout'
              onClick={(e) => {
                e.preventDefault();
                console.log("LOGOUT!");
                dispatch(userLogout());
              }}
            >
              <img
                className='icon'
                src='icons/icon_logout.svg'
                alt='Logout Icon'
              />
              Logout
            </a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to='/register'>
              <img
                className='icon'
                src='icons/icon_register.svg'
                alt='Register Icon'
              />
              Register
            </Link>
            <Link to='/login'>
              <img
                className='icon'
                src='icons/icon_login.svg'
                alt='Login Icon'
              />
              Login
            </Link>
          </React.Fragment>
        )}
      </nav>
    </header>
  );
}
