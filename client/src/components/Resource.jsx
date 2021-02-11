import React, { useEffect, useState } from "react";
import Rating from "./Rating";

// Gets reference ID as props.id
export default function Resource(props) {
  // If the preview image url in the database, or possibly coming from
  // an external API doesnt work, use a generic illustration instead.
  const [previewUrl, setPreviewUrl] = useState(props.data.previewImg);
  useEffect(() => {
    let imageCheck = document.createElement("img");
    imageCheck.src = props.data.previewImg;
    imageCheck.onerror = () => {
      // the static illustration to use instead
      setPreviewUrl("illustrations/road_to_knowledge.svg");
    };
    return () => {
      imageCheck.remove();
    };
  }, [props.data.previewImg]);

  return (
    <section className="resource-container">
      <header>
        <hgroup>
          <div className="resource-title">
            <h2>{props.data.title}</h2>
            <Rating
              rating={props.data.rating}
              num_rating={props.data.num_rating}
            />
          </div>
          <h3>
            {/* props.data.category is an array of categories */}
            {props.data.category.reduce(
              (fullString, category) => fullString + ", " + category
            )}
          </h3>
          <h3>(MEDIA TYPE)</h3>
          <h3>added by (USER)</h3>
        </hgroup>
        <button>Edit</button>
        <button>Delete</button>
      </header>
      <figure role="group">
        <img
          className="resource-preview"
          src={previewUrl}
          alt="Illustration for Online Learning"
        />
        <figcaption>{props.data.paid}</figcaption>
      </figure>
      <p>
        <a target="_blank" rel="noreferrer" href={props.data.link}>
          {props.data.link}
        </a>
      </p>
      <p>(Reactions... 🦝)</p>
      <p>{props.data.num_views} views</p>
      <button>Add Comment</button>
      <button>Add Reaction</button>
      <h3>Description</h3>
      <p>{props.data.description}</p>
      <h3>Comments</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        minus distinctio, earum cumque tenetur quidem eos tempora modi quos
        atque iusto esse. Excepturi sint nulla saepe ipsa aliquam sit corporis.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio eos
        modi, culpa dolores beatae ullam aspernatur odio deserunt corrupti
        blanditiis veritatis vel adipisci tempora, amet vitae soluta repudiandae
        molestias ea?
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi vel
        nostrum sit atque nisi illo officia minus ipsam fugit animi, quaerat
        suscipit eos tempore inventore. Possimus commodi enim earum atque.
      </p>
    </section>
  );
}
