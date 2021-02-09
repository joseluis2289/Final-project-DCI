import React, { useState } from "react";

export default function Register() {
  const [registerData, setRegisterData] = useState();
  function handleChange(e) {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  }
  return (
    <article>
      <h2>Register</h2>
      <form
        action=""
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Login Request!");
          fetch("./data.txt")
            .then((response) => {
              console.log(response);
            })
            .catch((err) => console.log(err));
        }}
      >
        <label htmlFor="username">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </article>
  );
}
