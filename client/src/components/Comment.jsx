import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Comment(props) {
  const user = useSelector((state) => state.user._id);
  const [comment, setComment] = useState({
    user: user,
    resource: props.resourceId,
  });
  const addComment = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/comments",
      ContentType: "application-json",
      data: comment,
    })
      .then((res) => {
        console.log(res.msg);
      })
      .catch((err) => console.log(err));
  };
  const formHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={(e) => addComment(e)}>
        {" "}
        <div>
          <label htmlFor='title'>Comment:</label>
          <textarea
            name='text'
            rows='5'
            cols='33'
            style={{ border: "solid black 2px" }}
            placeholder='Please comment here...'
            onChange={formHandler}
          ></textarea>
        </div>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}
