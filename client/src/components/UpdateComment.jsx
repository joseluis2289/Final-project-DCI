import React from "react";

export default function UpdateComment(props) {
  return (
    <div>
      <h3>{props.data.user.username}</h3>
      {props.data.edited ? <span>Edited</span> : <span>Original</span>}
      <p>{props.data.text}</p>
    </div>
  );
}
