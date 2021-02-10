import React from "react";
import Star from "./Star";

// Gets Rating (between 0 and 5) as decimal number in props.rating
export default function Rating(props) {
  const [rating, setRating] = React.useState(props.rating);
  const [hoverRating, setHoverRating] = React.useState(0);
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    setRating(index);
    // post RATING by USER to backend
  };
  return (
    <section>
      <figure className="rating-container" role="group">
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <Star
              key={index}
              index={index}
              rating={rating}
              hoverRating={hoverRating}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onSaveRating={onSaveRating}
            />
          );
        })}
        <figcaption className="rating-details">
          <span className="rating-number">{rating}</span>
          <span className="rating-users">(12)</span>
        </figcaption>
      </figure>
    </section>
  );
}
