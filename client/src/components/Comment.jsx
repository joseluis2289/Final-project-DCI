import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../redux/actions";
import axios from "axios";
import ModalBox from "./ModalBox";

export default function Comment(props) {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState(props.data);
  const [edit, setEdit] = useState(false);
  const update = useSelector((state) => state.update);
  const dispatch = useDispatch();

  //if user send request, the "edited" and "date" will be upated
  useEffect(() => {
    setComment({
      ...comment,
      edited: true,
      date: Date.now(),
    });
  }, [edit]);

  let displayButtons = (boolean) => {
    setEdit(boolean);
  };
  let formHandler = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  let updateComment = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `/comments/${comment._id}`,
      ContentType: "application/json",
      data: comment,
    })
      .then(function (response) {
        response.data.nModified > 0 && dispatch(updateData(update));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let delComment = () => {
    axios({
      method: "DELETE",
      url: `/comments/${props.data._id}`,
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
      <span>
        {props.data.date
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-")
          .replaceAll("-", ".")}
      </span>

      <div>
        {props.data.user._id === user._id && !edit && (
          <div>
            <ModalBox function={delComment} />{" "}
            <button
              onClick={() => {
                displayButtons(true);
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <form onSubmit={(e) => updateComment(e)}>
        <input
          disabled={
            props.data.user._id === user._id && edit ? null : "disabled"
          }
          value={props.data.text}
          name="text"
        ></input>
        {edit && (
          <div>
            <button
              onClick={() => {
                displayButtons(false);
              }}
            >
              Cancel
            </button>
            <button>Save</button>
          </div>
        )}
      </form>
      {props.data.edited && <span>Edited</span>}
    </div>
  );
}
