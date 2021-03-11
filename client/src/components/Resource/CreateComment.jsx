import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/actions";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, TextArea, Card, Popup } from "semantic-ui-react";

export default function CreateComment({
  resourceId,
  makeCom,
  showComm,
  showMakeComm,
}) {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const logIn = useSelector((state) => state.logIn);
  const [comment, setComment] = useState({
    resource: resourceId,
  });
  const dispatch = useDispatch();
  function openCom(newValue) {
    showMakeComm(newValue);
  }

  const addComment = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/comments",
      ContentType: "application/json; charset=utf-8",
      data: comment,
    })
      .then((res) => {
        showMakeComm(false);
        showComm(true);
        dispatch(updateData(update));
        console.log("here", res.data);
      })
      .catch((err) => console.log(err));
  };
  const formHandler = (e) => {
    setComment({ ...comment, user: user._id, [e.target.name]: e.target.value });
  };
  return (
    <Popup
      trigger={
        <div style={{ margin: "auto" }}>
          {logIn ? (
            <div
              onClick={() => {
                openCom(!makeCom);
              }}
            >
              <span style={{ fontSize: "20px" }}>
                <i
                  style={{ margin: "5px" }}
                  class="comment alternate outline icon"
                ></i>
              </span>
            </div>
          ) : (
            <Link
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "30px",
                fontSize: "20px",
              }}
              to="/login"
            >
              You must be logged in to post a comment{" "}
            </Link>
          )}
          {makeCom && (
            <Form onSubmit={(e) => addComment(e)}>
              {" "}
              <Card>
                <TextArea
                  name="text"
                  rows={2}
                  placeholder="Comment here..."
                  required
                  onChange={formHandler}
                />
                <Button
                  style={{ marginTop: "5px" }}
                  basic
                  color="blue"
                  type="submit"
                >
                  Add Comment
                </Button>
              </Card>
            </Form>
          )}
        </div>
      }
    >
      <Popup.Header>Click here to comment</Popup.Header>
    </Popup>
  );
}
