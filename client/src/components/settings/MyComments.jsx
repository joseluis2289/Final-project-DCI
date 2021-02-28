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
  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };
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
            {timeSince(new Date(Date.now() - comment.date))}
            {comment.date}
            <p>count how much time ago</p>
          </div>
        );
      })}
    </Fragment>
  );
}
