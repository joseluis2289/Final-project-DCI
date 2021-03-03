import React, { useState, useEffect, Fragment } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";

export default function DisplayComments({ comments }) {
  const [commentsArray, setCommentsArray] = useState(comments);
  const [displayCom, setDisplayComm] = useState(false);
  const update = useSelector((state) => state.update);

  useEffect(() => {
    console.log(commentsArray);
    let arrayReversed = comments.reverse();
    setCommentsArray(arrayReversed);
  }, [update]);

  return (
    <div>
      <span>
        {
          <Fragment>
            <div
              onClick={() => {
                setDisplayComm(!displayCom);
              }}
            >
              {parseInt(comments.length)} Comments{" "}
              <img
                className="icon"
                src="https://img.icons8.com/material-rounded/72/give-way.png"
                alt="arrow"
              ></img>{" "}
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
