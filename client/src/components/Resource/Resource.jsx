import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import CreateComment from "./CreateComment.jsx";
import DisplayComments from "./DisplayComments";

// Gets reference ID as props.data.id
const Resource = (props) => {
  // If the preview image url in the database, or possibly coming from
  // an external API doesnt work, use a generic illustration instead.
  const update = useSelector((state) => state.update);
  const [makeCom, setMakeComm] = useState(false);
  const [displayCom, setDisplayComm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "illustrations/road_to_knowledge.svg"
  );
  //create function to allow the child component "CreateComment" to change "displayCom" state
  function showMakeComm(newValue) {
    setMakeComm(newValue);
  }
  function showComm(newValue) {
    setDisplayComm(newValue);
  }

  useEffect(() => {
    props.data.previewImage && setPreviewUrl(props.data.previewImage);
  }, [props.data.previewImage, update]);

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
      <DisplayComments
        comments={props.data.comments}
        displayCom={displayCom}
        showComm={showComm}
      />

      <CreateComment
        resourceId={props.data._id}
        makeCom={makeCom}
        showComm={showComm}
        showMakeComm={showMakeComm}
      />
    </section>
  );
};

export default Resource;
