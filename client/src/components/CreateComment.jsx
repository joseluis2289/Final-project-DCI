import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function CreateComment(props) {
  const user = useSelector((state) => state.user._id);
  const [comment, setComment] = useState({
    resource: props.resourceId,
  });
  const addComment = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/comments",
      ContentType: "application/json",
      data: comment,
    })
      .then((res) => {
        console.log("here", res.data);
      })
      .catch((err) => console.log(err));
  };
  const formHandler = (e) => {
    setComment({ ...comment, user, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={(e) => addComment(e)}>
        {" "}
        <div>
          <label htmlFor="title">Comment:</label>
          <textarea
            name="text"
            rows="5"
            cols="33"
            style={{ border: "solid black 2px" }}
            placeholder="Please comment here..."
            onChange={formHandler}
          ></textarea>
        </div>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}
