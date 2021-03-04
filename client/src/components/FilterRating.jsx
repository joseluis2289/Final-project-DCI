import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterRating } from "../redux/actions";
import Star from "./Star";

export default function FilterRating() {
  const [rating, setRating] = React.useState(false);
  const [hoverRating, setHoverRating] = React.useState(0);
  const dispatch = useDispatch();

  const onMouseEnter = (index) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = (index) => {
    setRating(index);
  };

  // FILTER -- RATING
  useEffect(() => {
    if (rating) dispatch(filterRating(rating));
    return () => {
      // cleanup
    };
  }, [rating, dispatch]);

  return (
    //className="rating-container"
    <figure
      style={{ width: "300px", height: "1vh" }}
      className="rating-container"
      role="group"
    >
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
    </figure>
  );
}
