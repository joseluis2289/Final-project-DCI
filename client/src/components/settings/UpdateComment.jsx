import React, { useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../redux/actions";

export default function UpdateComment(props) {
  const update = useSelector((state) => state.update);
  const [comment, setComment] = useState(props.data);
  const [date, setDate] = useState(props.data.date);
  const [alert, setAlert] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
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
        dispatch(updateData(update));
        response.data.nModified > 0 && setAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let delComment = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/comments/${props.data._id}`,
      ContentType: "application/json",
    })
      .then((response) => {
        dispatch(updateData(update));
        console.log(response);
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
      {alert && <p>data updated</p>}
      {deleted && <p>comment deleted</p>}
    </div>
  );
}
