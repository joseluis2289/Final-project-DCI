import React, { useState, useEffect, Fragment } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { Button, Card, Label, Item } from "semantic-ui-react";

export default function DisplayComments({ comments, displayCom, showComm }) {
  const [commentsArray, setCommentsArray] = useState(comments);

  const update = useSelector((state) => state.update);

  useEffect(() => {
    let arrayReversed = comments.reverse();
    setCommentsArray(arrayReversed);
  }, [update, showComm, comments]);

  return (
    <Item>
      <span>
        {
          <Fragment>
            <Button
              style={{ marginTop: "15px" }}
              onClick={() => {
                showComm(!displayCom);
              }}
            >
              show comments {parseInt(comments.length)} Comments{" "}
            </Button>
          </Fragment>
        }
      </span>
      <Item
        style={{
          overflow: "scroll",
          maxHeight: "150px",
          width: "450px",
          scrollBehavior: "smooth",
          marginTop: "15px",
        }}
      >
        {displayCom && (
          <Fragment>
            {commentsArray.map((comment) => (
              <Comment key={comment._id} data={comment}></Comment>
            ))}
          </Fragment>
        )}
      </Item>
    </Item>
  );
}
