import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import CreateComment from "./CreateComment.jsx";
import Comment from "./Comment";

// Gets reference ID as props.data.id
const Resource = (props) => {
  // If the preview image url in the database, or possibly coming from
  // an external API doesnt work, use a generic illustration instead.
  const user = useSelector((state) => state.user._id);
  const [displayCom, setDisplayComm] = useState(false);
  const [makeCom, setMakeComm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "illustrations/road_to_knowledge.svg"
  );

  useEffect(() => {
    props.data.previewImage && setPreviewUrl(props.data.previewImage);
  }, [props.data.previewImage]);

  return (
    <section className="resource-container">
      <header>
        <hgroup>
          <div className="resource-title">
            <h2>{props.data.title}</h2>
            <Rating
              rating={props.data.rating}
              num_ratings={props.data.num_ratings}
              resourceId={props.data._id}
            />
          </div>
          <div className="category">
            <h3>
              {props.data.category.map((item, index) => {
                let name = item[0].toUpperCase() + item.substring(1);
                return <span key={index}>{name} </span>;
              })}
            </h3>
          </div>
          <h3>added by {props.data.user.name}</h3>
        </hgroup>
      </header>
      <figure role="group">
        <img
          className="resource-preview"
          src={previewUrl}
          alt="Illustration for Online Learning"
        />
        <figcaption>{props.data.paid ? "paid" : "free"}</figcaption>
      </figure>
      <p>
        <a target="_blank" rel="noreferrer" href={props.data.link}>
          {props.data.link}
        </a>
      </p>
      <p>{props.data.num_views} views</p>

      <h3>Description</h3>
      <p>{props.data.description}</p>
      <span>
        See Comments{" "}
        <img
          className="icon"
          src="https://img.icons8.com/material-rounded/72/give-way.png"
          alt="arrow"
          onClick={() => {
            setDisplayComm(!displayCom);
          }}
        ></img>{" "}
      </span>
      {user ? (
        <span>
          Comment{" "}
          <img
            className="icon"
            src="icons/comment.svg"
            alt="Login Icon"
            onClick={() => {
              setMakeComm(!makeCom);
            }}
          />
        </span>
      ) : (
        <Link to="/login">LogIn to comment </Link>
      )}

      {displayCom && (
        <Fragment>
          {props.data.comments ? (
            props.data.comments.map((comment) => (
              <Comment key={comment._id} data={comment}></Comment>
            ))
          ) : (
            <p>There is no comment for the moment</p>
          )}
        </Fragment>
      )}
      {makeCom && <CreateComment resourceId={props.data._id} />}
    </section>
  );
};

export default Resource;
