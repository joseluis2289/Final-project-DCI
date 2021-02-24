import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import UpdateComment from "./UpdateComment";
import Resource from "../Resource";
import Settings from "./Settings";

export default function MyComments() {
  const user = useSelector((state) => state.user);
  const [userComments, setUserComments] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/comments/${user._id}`)
      .then((res) => {
        setUserComments(res.data.comments);
        console.log(res.data.comments);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Fragment>
      <Settings />
      <div className="references-container ">
        {userComments.map(
          (comment) =>
            !comment.deleted && (
              <div className="comment">
                <UpdateComment id={comment._id} data={comment} author={true} />
                <Link to="/resource">
                  <button>Go to Resource</button>
                </Link>
              </div>
            )
        )}
      </div>
    </Fragment>
  );
}
