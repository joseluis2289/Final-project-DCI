import React from "react";

// Gets Rating (between 0 and 5) as decimal number in props.rating
export default function Rating(props) {
  let fullStars = 0;
  let display = [];

  // Validation
  if (props.rating >= 0 && props.rating <= 5) {
    fullStars = Math.floor(props.rating);
  }

  // Push as many full star images into the display arrays as the rounded down rating is
  for (let i = 1; i <= fullStars; i++) {
    display.push(
      <img
        key={i}
        id={"rating_" + i}
        className="icon"
        src="icons/icon_star.svg"
        alt="Full Star"
        onMouseEnter={() => {
          ratingHover(i);
        }}
      />
    );
  }

  // Fill the rest (until max = 5) with empty star images
  for (let j = fullStars + 1; j <= 5; j++) {
    display.push(
      <img
        key={j}
        id={"rating_" + j}
        className="icon"
        src="icons/icon_star_empty.svg"
        alt="Empty Star"
        onMouseEnter={() => {
          ratingHover(j);
        }}
      />
    );
  }

  function ratingHover(nrOfStars) {
    console.log(nrOfStars);
    let htmlStars = document.querySelectorAll("#icon");
    console.log(htmlStars);
  }

  return (
    <figure className="rating" role="group">
      {display.map((star) => star)}
      <span className="rating-users">(12)</span>
    </figure>
  );
}
