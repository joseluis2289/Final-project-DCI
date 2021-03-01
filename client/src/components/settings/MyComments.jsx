import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import UpdateComment from "./UpdateComment";
import Resource from "../Resource";
import Settings from "./Settings";

export default function MyComments() {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/comments/${user._id}`)
      .then((res) => {
        setUserComments(res.data.comments);
        console.log("comments", res.data);
      })
      .catch((err) => console.log(err));
  }, [update]);
  return (
    <Fragment>
      <Settings />
      {userComments ? (
        <Fragment>
          {" "}
          {userComments.map((comment) => {
            return (
              !comment.deleted && (
                <div className="update-comment">
                  <div>
                    <h2>{comment.resource.title}</h2>
                    <img
                      className="comment-image"
                      src={comment.resource.previewImage}
                      alt="preview"
                    ></img>
                  </div>
                  <UpdateComment data={comment} />
                </div>
              )
            );
          })}
        </Fragment>
      ) : (
        <Fragment>
          <h1>Go to Login</h1>
          <Link to="/login">here </Link>
        </Fragment>
      )}
    </Fragment>
  );
}
