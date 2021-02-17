import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Register() {
  const [registerData, setRegisterData] = useState({});
  const { register, handleSubmit, errors } = useForm();

  function handleChange(e) {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  }
  let history = useHistory();
  return (
    <article>
      <h2>Register</h2>
      <form
        onSubmit={handleSubmit(() => {
          // e.preventDefault();
          console.log("Login Request!");
          fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify(registerData),
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          })
            .then((result) => result.json())
            .then((response) => {
              console.log(response);
              if (response.msg === false) {
                console.log("if");
                alert("this email is already taken");
              } else if (response.validation) {
                console.log("esle if");
                setRegisterData({ success: response.success });
                alert("Name and password need 3+ characters");
              } else {
                history.push("/login");
                console.log("else");
                response
                  ? alert(`SUCCESSFULLY REGISTER ${response.userName}`)
                  : alert("error to register");
              }
            })
            .catch((err) => console.log(err));
        })}
      >
        <label htmlFor="username">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            handleChange(e);
          }}
          ref={register({ required: true, maxLength: 15, minLength: 3 })}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="userName"
          id="username"
          onChange={(e) => {
            handleChange(e);
          }}
          ref={register({ required: true, maxLength: 15, minLength: 3 })}
        />
        {errors.userName && "Your Username is required"}
        {errors.userName && errors.userName.type === "maxLength" && (
          <span className="errorsMsg">Max length exceeded</span>
        )}
        {errors.userName && errors.userName.type === "minLength" && (
          <span className="errorsMsg">
            Your Username Must be more than 3 character
          </span>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            handleChange(e);
          }}
          ref={register({ required: true })}
        />
        {errors.email && "Your Email is required"}

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
        {errors.password && "Your password is require"}
        {errors.password && errors.password.type === "maxLength" && (
          <span>Max length exceeded</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span>Must be more than 3 character</span>
        )}

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          onChange={(e) => {
            handleChange(e);
          }}
          ref={register({ required: true })}
        />
        {errors.confirmPassword && "Please confirm your password"}

        <button type="submit">Register</button>
      </form>
    </article>
  );
}
