import React, { useState } from "react";
import { /* useSelector,*/ useDispatch } from "react-redux";
import { userLogin } from "../redux/actions";
//import axios from "axios";
//import { useForm } from "react-hook-form";

export default function Login() {
  // const login = useSelector((state) => state.username);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});
  // const { register, handleSubmit, errors } = useForm();
  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  // const axiosHandler = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: "POST",
  //     url: "http://localhost:5000/login",
  //     data: loginData,
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       dispatch(userLogin(loginData));
  //       // response.data.logIn === true
  //       //   ? alert(`Welcome`)
  //       //   : alert("Your password is wrong! please try again!");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }
  return (
    <article>
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Login Request!");
          fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          })
            .then((response) => {
              if (response.status === 200) {
                response.json().then((data) => {
                  console.log(data);
                  dispatch(userLogin(loginData));
                  data.logIn === true
                    ? alert(`Welcome`)
                    : alert("Your password is wrong! please try again!");
                });
              } else {
                // connection is lost
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
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
        <button type="submit">Login</button>
      </form>
    </article>
  );
}
