import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/actions";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CreateComment(props) {
  const user = useSelector((state) => state.user._id);
  const update = useSelector((state) => state.update);
  const logIn = useSelector((state) => state.logIn);
  const [makeCom, setMakeComm] = useState(false);
  const [editCom, setEditComm] = useState(false);
  const [comment, setComment] = useState({
    resource: props.resourceId,
  });
  const dispatch = useDispatch();
  function handleCom() {
    props.handleCom(false);
  }

  const addComment = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/comments",
      ContentType: "application/json",
      data: comment,
    })
      .then((res) => {
        handleCom();
        dispatch(updateData(update));
        console.log("here", res.data);
      })
      .catch((err) => console.log(err));
  };
  const formHandler = (e) => {
    setComment({ ...comment, user, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {logIn ? (
        <div
          onClick={() => {
            setMakeComm(!makeCom);
          }}
        >
          <span>
            <img className="icon" src="icons/comment.svg" alt="Login Icon" />
          </span>
        </div>
      ) : (
        <Link to="/login">LogIn to comment </Link>
      )}
      {makeCom && (
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
              required
              onChange={formHandler}
            ></textarea>
          </div>
          <button type="submit">Add Comment</button>
        </form>
      )}
    </div>
  );
}
