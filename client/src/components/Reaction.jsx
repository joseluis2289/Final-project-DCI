import React from "react";

export default function Reaction({ love, like, dislike }) {
  return (
    <div>
      <img
        className='reaction-icon'
        src='https://img.icons8.com/flat-round/2x/filled-like.png'
        alt='loved'
        srcSet=''
      />{" "}
      <span>{love}</span>{" "}
      <img
        className='reaction-icon'
        src='https://img.icons8.com/color/2x/happy.png'
        alt='like'
        srcSet=''
      />{" "}
      <span>{like}</span>{" "}
      <img
        className='reaction-icon'
        src='https://img.icons8.com/fluent/2x/disappointed.png'
        alt='dislike'
        srcSet=''
      />{" "}
      <span>{dislike}</span>{" "}
    </div>
  );
}
