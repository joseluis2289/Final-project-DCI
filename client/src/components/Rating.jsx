import React from "react";

export default function Rating() {
  return (
    <figure className="rating">
      <img className="icon" src="icons/icon_star.svg" alt="One Rating Star" />
      <img className="icon" src="icons/icon_star.svg" alt="One Rating Star" />
      <img className="icon" src="icons/icon_star.svg" alt="One Rating Star" />
      <img
        className="icon"
        src="icons/icon_star_empty.svg"
        alt="One Rating Star"
      />
      <img
        className="icon"
        src="icons/icon_star_empty.svg"
        alt="One Rating Star"
      />
      <figcaption>(12)</figcaption>
    </figure>
  );
}
