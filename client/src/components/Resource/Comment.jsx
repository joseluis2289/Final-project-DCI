import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/actions";
import axios from "axios";
import ModalBox from "../ModalBox";
import moment from "moment";
import { Button, Card, Header, Form, Input, Grid } from "semantic-ui-react";

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
    <Grid divided="vertically">
      <Grid.Row
        style={{ display: "flex", justifyContent: "space-around" }}
        column={2}
      >
        {props.data.user ? (
          <Header style={{ color: "blue" }} as="h4">
            {props.data.user.userName}
          </Header>
        ) : (
          <Header as="h4">anonymous</Header>
        )}

        <Card.Meta>{moment(props.data.date).fromNow()}</Card.Meta>

        <div>
          {props.data.user && props.data.user._id === user._id && !edit && (
            <div style={{ display: "flex" }}>
              <ModalBox function={delComment} text="X" />{" "}
              <Button
                style={{
                  fontSize: "10px",
                  width: "5px",
                  height: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "0",
                }}
                onClick={() => {
                  displayButtons(true);
                }}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </Grid.Row>
      {!edit && <p style={{ marginLeft: "15px" }}>{props.data.text}</p>}

      {edit && (
        <Form onSubmit={(e) => updateComment(e)}>
          <Input
            type="text"
            name="text"
            disabled={
              props.data.user._id === user._id && edit ? null : "disabled"
            }
            value={comment.text}
            onChange={formHandler}
          ></Input>
          {edit && (
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => {
                  displayButtons(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          )}
        </Form>
      )}

      {props.data.edited && <Card.Meta>Edited</Card.Meta>}
    </Grid>
  );
}
