import React, { useState } from "react";
import axios from "axios";

export default function UpdateComment(props) {
  const [comment, setComment] = useState(props.data);
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
      <h3>{props.data.user.username}</h3>
      <div className="delete-button">
        <button onClick={delComment}>X</button>
      </div>
      {props.data.edited ? <span>Edited</span> : <span>Original</span>}
      <p>{props.data.text}</p>
    </div>
  );
}
