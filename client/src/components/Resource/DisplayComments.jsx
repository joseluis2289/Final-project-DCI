import React, { useState, useEffect, Fragment } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";

export default function DisplayComments({
  comments,
  makeCom,
  displayCom,
  showComm,
  showMakeComm,
}) {
  const [commentsArray, setCommentsArray] = useState(comments);

  const update = useSelector((state) => state.update);

  useEffect(() => {
    let arrayReversed = comments.reverse();
    setCommentsArray(arrayReversed);
  }, [update, showComm, comments]);

  return (
    <div>
      <span>
        {
          <Fragment>
            <div
              onClick={() => {
                showComm(!displayCom);
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
