import React, { useState } from "react";
//import { useDispatch } from "react-redux";
//import { userLogin } from "../redux/actions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function Login() {
  // const login = useSelector((state) => state.username);
  //const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  return (
    <article>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit(() => {
          //e.preventDefault();
          console.log("Login Request!");
          fetch("/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          })
            .then((response) => {
              history.push("/");
              if (response.status === 200) {
                response.json().then((data) => {
                  console.log(data);
                  // dispatch(userLogin(data));
                  if (data.logIn === true) {
                    sessionStorage.setItem("email", data.email);
                    //ADD this to the logout => sessionStorage.clear();
                    alert(`Welcome`);
                  } else {
                    alert("Your password is wrong! please try again!");
                  }
                });
              } else {
                //
              }
            })
            .catch((err) => console.log(err));
        })}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => {
            handleChange(e);
          }}
          ref={register({ required: true, maxLength: 15, minLength: 3 })}
        />
        {errors.username && errors.username.type === "required" && (
          <span className="errorsMsg">Your Username is required</span>
        )}
        {errors.userName && errors.userName.type === "maxLength" && (
          <span>Max length exceeded</span>
        )}
        {errors.userName && errors.userName.type === "minLength" && (
          <span className="errorsMsg">Must be more than 3 character</span>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => {
            handleChange(e);
          }}
          ref={register({ required: true, maxLength: 15, minLength: 3 })}
        />
        {errors.password && errors.password.type === "required" && (
          <span className="errorsMsg">Your Password is required</span>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <span className="errorsMsg">Max length exceeded</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span className="errorsMsg">Must be more than 3 character</span>
        )}
        <button type="submit">Login</button>
      </form>
    </article>
  );
}
