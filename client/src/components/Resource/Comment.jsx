import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/actions";
import axios from "axios";
import ModalBox from "../ModalBox";
import moment from "moment";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Image,
  Grid,
  GridRow,
  GridColumn,
  CardMeta,
  Item,
  CardDescription,
  Label,
  Header,
} from "semantic-ui-react";

export default function Comment(props) {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const [comment, setComment] = useState(props.data);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  //if user send request, the "edited" and "date" will be updated
  useEffect(() => {
    setComment({
      ...comment,
      edited: true,
    });
  }, [edit]);

  let displayButtons = (boolean) => {
    setEdit(boolean);
  };
  let formHandler = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
      edited: true,
    });
  };

  let updateComment = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `/comments/${comment._id}`,
      ContentType: "application/json; charset=utf-8",
      data: comment,
    })
      .then(async (response) => {
        await dispatch(updateData(update));
        setEdit(false);
        console.log("updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let delComment = () => {
    axios({
      method: "DELETE",
      url: `/comments/${props.data._id}`,
      ContentType: "application/json; charset=utf-8",
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
    <div style={{ border: "solid blue 1px" }} className="comment">
      {props.data.user ? (
        <h3>{props.data.user.userName}</h3>
      ) : (
        <h3>anonymous</h3>
      )}

      <span style={{ border: "solid red 1px" }}>
        {moment(props.data.date).fromNow()}
      </span>

      <div>
        {props.data.user && props.data.user._id === user._id && !edit && (
          <div style={{ border: "solid green 1px" }}>
            <ModalBox function={delComment} text="X" />{" "}
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

      {!edit && <p style={{ border: "solid red 1px" }}>{props.data.text}</p>}
      {edit && (
        <form onSubmit={(e) => updateComment(e)}>
          <input
            type="text"
            name="text"
            disabled={
              props.data.user._id === user._id && edit ? null : "disabled"
            }
            value={comment.text}
            onChange={formHandler}
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
              <button type="submit">Save</button>
            </div>
          )}
        </form>
      )}

      {props.data.edited && <span>Edited</span>}
    </div>
  );
}
