import React, { useState, useEffect, Fragment } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";

export default function DisplayComments({
  comments,
  displayCom,
  showComm,
  handleCreateCom,
}) {
  const [commentsArray, setCommentsArray] = useState(comments);

  const update = useSelector((state) => state.update);

  useEffect(() => {
    console.log(commentsArray);
    let arrayReversed = comments.reverse();
    setCommentsArray(arrayReversed);
  }, [update, showComm]);

  return (
    <div>
      <span>
        {
          <Fragment>
            <div
              onClick={() => {
                showComm(!displayCom);
                handleCreateCom(false);
              }}
            >
              {parseInt(comments.length)} Comments{" "}
            </div>
          </Fragment>
        }
      </span>
      {displayCom && (
        <Fragment>
          {commentsArray.map((comment) => (
            <Comment key={comment._id} data={comment}></Comment>
          ))}
        </Fragment>
      )}
    </div>
  );
}
