import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [updateData, setUpdateData] = useState();

  const profileHandler = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  //GET DATA TO DISPLAY
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/server/profile`,
    })
      .then((response) => {
        setUpdateData(response.data[0]);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateHandler = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      ulr: `http://localhost:3000/server/update`,
      data: updateData,
    })
      .then((response) => {
        console.log(response.data);
        alert("You have successfully update your profile");
        setUpdateData(response.data[0]);
      })
      .catch((err) => {
        console.error("Error to update", err);
      });
  };

  return (
    <div>
      <h2>Profile Update</h2>
      <form
        onSubmit={(e) => {
          updateHandler(e);
        }}
      >
        <label htmlFor="username">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          //value={updateData.name}
          onChange={profileHandler}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          //value={updateData.userName}
          onChange={profileHandler}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          //value={updateData.email}
          onChange={profileHandler}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          //value={updateData.password}
          onChange={profileHandler}
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          //value={updateData.password}
          onChange={profileHandler}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
