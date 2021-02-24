import React, { useState } from "react";
import axios from "axios";

export default function UpdateComment(props) {
  const [comment, setComment] = useState(props.data);

  let formHandler = (e) => {
    setComment({ ...comment, edited: true, [e.target.name]: e.target.value });
  };

  let updateComment = (e) => {
    e.preventDefault();
    setComment({ ...comment, date: Date.now });
    axios({
      method: "PUT",
      url: `http://localhost:5000/comment/${comment._id}`,
      ContentType: "application/json",
      data: comment,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let delComment = () => {
    setComment({ ...comment, deleted: true, date: Date.now });
    axios({
      method: "PUT",
      url: `http://localhost:5000/comments/${comment.id}`,
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
      <form onSubmit={updateComment}>
        <div className="delete-button">
          <button onClick={delComment}>X</button>
        </div>
        {props.data.edited ? <span>Edited</span> : <span>Original</span>}
        <div>
          <label htmlFor="title">description</label>
          <textarea
            name="description"
            rows="15"
            cols="70"
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
