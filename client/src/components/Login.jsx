import React, { useState } from "react";
import { /* useSelector,*/ useDispatch } from "react-redux";
import { loginUser } from "../redux/actions";

export default function Login() {
  // const login = useSelector((state) => state.username);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState();
  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }
  return (
    <article>
      <h2>Login</h2>
      <form
        action=""
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Login Request!");
          fetch("./data.txt")
            .then((response) => {
              console.log(response);
              dispatch(loginUser(loginData));
            })
            .catch((err) => console.log(err));
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </article>
  );
}
