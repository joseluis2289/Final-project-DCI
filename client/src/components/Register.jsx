import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [registerData, setRegisterData] = useState({});

  function handleChange(e) {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  }
  let history = useHistory();
  return (
    <article>
      <h2>Register</h2>
      <form
        action=""
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Login Request!");
          fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify(registerData),
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          })
            .then((response) => {
              console.log(response);
              history.push("/login");
              setRegisterData({ success: response.data.success });
              if (response.msg === false) {
                alert("this email is already taken");
              } else {
                response.data
                  ? alert("SUCCESSFULLY REGISTER")
                  : alert("error to register");
                console.log(response.data);
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        <label htmlFor="username">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="userName"
          id="username"
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <button type="submit">Register</button>
      </form>
    </article>
  );
}
