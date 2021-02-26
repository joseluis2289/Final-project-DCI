import React from "react";

export default function Comment(props) {
  return (
    <div className='comment'>
      <h3>{props.data.user.userName}</h3>
      {props.data.edited && <span>Edited</span>}
      <p>{props.data.text}</p>
      <span>
        {props.data.date
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-")
          .replaceAll("-", ".")}
      </span>
    </div>
  );
}
