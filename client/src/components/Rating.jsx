import React, { useState, useEffect } from "react";
import Star from "./Star";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateData } from "../redux/actions";

// Gets Rating (between 0 and 5) as decimal number in props.rating
export default function Rating(props) {
  const update = useSelector((state) => state.update);
  const [rating, setRating] = useState(props.rating);
  const [hoverRating, setHoverRating] = useState(0);
  const dispatch = useDispatch();
  let history = useHistory();
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    setRating(index);
    const resourceId = props.resourceId;
    fetch("/resources/rating", {
      method: "POST",
      body: JSON.stringify({
        rate: index,
        resourceId,
        email: sessionStorage.getItem("email"),
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(updateData(update));
          response.json().then((data) => {
            console.log(data.average);
            if (data.isUserRateAccepted === false) {
              alert("You can only rate once!");
            }
          });
        } else {
          if (response.status === 401) {
            history.push("/login");
            alert("you need to login if you want to rate");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log("upadate changed");
  }, [update]);
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

        {/* This Component is also used in the Filter bar, but there
        we don't need the details. */}
        {props.usedInFilter ? (
          ""
        ) : (
          <figcaption className="rating-details">
            <span className="rating-number">{rating}</span>
            <span className="rating-users">({props.num_ratings})</span>
          </figcaption>
        )}
      </figure>
    </section>
  );
}
