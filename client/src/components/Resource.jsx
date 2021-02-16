import React, { useEffect, useState, Fragment } from "react";
import Rating from "./Rating";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// Gets reference ID as props.data.id
const Resource = (props) => {
  // If the preview image url in the database, or possibly coming from
  // an external API doesnt work, use a generic illustration instead.
  const [displayCom, setDisplayComm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "illustrations/road_to_knowledge.svg"
  );

  useEffect(() => {
    props.data.previewImage && setPreviewUrl(props.data.previewImage);
  }, []);

  return (
    <section className='resource-container'>
      <header>
        <hgroup>
          <div className='resource-title'>
            <h2>{props.data.title}</h2>
            <Rating
              rating={props.data.rating}
              num_rating={props.data.num_rating}
            />
          </div>
          <h3>
            {props.data.category.map((item) => {
              let name = item[0].toUpperCase() + item.substring(1);
              return <span>{name}</span>;
            })}
          </h3>
          <h3>(MEDIA TYPE)</h3>
          <h3>added by (USER)</h3>
        </hgroup>
        <button>Edit</button>
        <button>Delete</button>
      </header>
      <figure role='group'>
        <img
          className='resource-preview'
          src={previewUrl}
          alt='Illustration for Online Learning'
        />
        <figcaption>{props.data.paid}</figcaption>
      </figure>
      <p>
        <a target='_blank' rel='noreferrer' href={props.data.link}>
          {props.data.link}
        </a>
      </p>
      <p>(Reactions... 🦝)</p>
      <p>{props.data.num_views} views</p>
      <button>Add Comment</button>
      <button>Add Reaction</button>
      <h3>Description</h3>
      <p>{props.data.description}</p>
      <h3>
        Comments{" "}
        <img
          className='icon'
          src='https://img.icons8.com/material-rounded/72/give-way.png'
          alt='arrow'
          onClick={() => {
            setDisplayComm(!displayCom);
          }}
        ></img>
      </h3>
      {displayCom && (
        <Fragment>
          {props.data.comments ? (
            props.data.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))
          ) : (
            <p>There is no comment for the moment</p>
          )}
        </Fragment>
      )}
    </section>
  );
};

// Resource.propTypes = {
//   resources: PropTypes.array.isRequired,
// };
// const mapStateToProps = (state) => ({
//   resources: state.resources,
// });
// export default connect(mapStateToProps)(Resource);

export default Resource;
