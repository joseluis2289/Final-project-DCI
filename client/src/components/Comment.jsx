import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../redux/actions";
import axios from "axios";
import ModalBox from "./ModalBox";

export default function Comment(props) {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const dispatch = useDispatch();

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
    <div className="comment">
      <h3>{props.data.user.userName}</h3>
      {props.data.edited && <span>Edited</span>}
      {props.data.user._id === user._id && <ModalBox function={delComment} />}
      <p>{props.data.text}</p>
      <span>
        {props.data.date
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-")
          .replaceAll("-", ".")}
      </span>
    </div>
  );
}
