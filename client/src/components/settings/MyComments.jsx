import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import UpdateComment from "./UpdateComment";
import Settings from "./Settings";

export default function MyComments() {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/comments/${user._id}`)
      .then((res) => {
        setUserComments(res.data.comments);
        console.log("comments", res.data);
      })
      .catch((err) => console.log(err));
  }, [update, user._id]);
  return (
    <Fragment>
      <Settings />
      {userComments ? (
        <Fragment>
          {" "}
          {userComments.map((comment) => {
            return (
              comment.resource && (
                <div key={comment._id} className="update-comment">
                  <div>
                    <h2>
                      {comment.resource
                        ? `${comment.resource.title}`
                        : "This resource was deleted"}
                    </h2>
                    <img
                      className="comment-image"
                      src={
                        comment.resource
                          ? `${comment.resource.previewImage}`
                          : "illustrations/road_to_knowledge.svg"
                      }
                      alt="preview"
                    ></img>
                  </div>
                  <UpdateComment data={comment} />
                  <Link to={`/resources/resource/${comment.resource._id}`}>
                    Go to Resource{" "}
                  </Link>
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