import React, { useState } from "react";
import axios from "axios";

export default function UpdateComment(props) {
  const [comment, setComment] = useState(props.data);
  const [date, setDate] = useState(props.data.date);
  let formHandler = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  let updateComment = (e) => {
    e.preventDefault();
    setComment({
      ...comment,
      edited: true,
      date: Date.now,
    });
    axios({
      method: "PUT",
      url: `http://localhost:5000/comments/${comment._id}`,
      ContentType: "application/json",
      data: comment,
    })
      .then(function (response) {
        console.log("responde from request to update comment", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let delComment = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `http://localhost:5000/comments/${comment._id}`,
      ContentType: "application/json",
      data: comment,
    })
      .then((response) => {
        console.log("deleted", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <button
          className="delete-button"
          onClick={(e) => {
            setComment({ ...comment, deleted: true, date: Date.now });
            delComment(e);
          }}
        >
          X
        </button>
        {props.data.edited && (
          <span>
            Was already edited on{" "}
            {date
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-")
              .replaceAll("-", ".")}
          </span>
        )}
      </div>
      <form onSubmit={(e) => updateComment(e)}>
        <div>
          <label htmlFor="title">comment </label>
          {"  "}
          <textarea
            name="text"
            rows="10"
            cols="40"
            style={{ border: "solid black 2px" }}
            placeholder={props.data.text}
            onChange={formHandler}
          ></textarea>
        </div>
        <button type="submit">Update Comment</button>
      </form>
    </div>
  );
}
