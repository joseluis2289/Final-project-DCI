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
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Fragment>
      <Settings />
      {userComments.map((comment) => {
        return (
          <div className='references-container '>
            <h3>{comment.text}</h3>
            <h2>{comment.resource.title}</h2>
            <img
              className='comment-image'
              src={comment.resource.previewImage}
              alt='preview'
            ></img>
            {comment.date}
          </div>
        );
      })}
    </Fragment>
  );
}
