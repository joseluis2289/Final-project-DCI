import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Comment(props) {
  const user = useSelector((state) => state.loginData.user._id);
  const [comment, setComment] = useState({
    user: user,
    resource: props.resourceId,
  });
  const addComment = (e) => {
    e.preventDefault();
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
      </form>
    </div>
  );
}
