import React, { useState } from "react";
import { /* useSelector,*/ useDispatch } from "react-redux";
import { userLogin } from "../redux/actions";
//import { useHistory } from "react-router-dom";

export default function Login() {
  //let history = useHistory();
  // const login = useSelector((state) => state.username);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState();
  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }
  return (
    <article className='vbla'>
      <h2>Login</h2>
      <form
        action=''
        method='post'
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
                  //history.push("/profile");
                  data.logIn === true
                    ? alert(`Welcome`)
                    : alert("Your password is wrong! please try again!");
                  dispatch(userLogin(loginData));
                });
              } else {
                // connection is lost
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <button type='submit'>Login</button>
      </form>
    </article>
  );
}
