import React from "react";
import Rating from "./Rating";

export default function Resource() {
  return (
    <section className="resource-container">
      <header>
        <hgroup>
          <div className="resource-title">
            <h2>(TITLE)</h2>
            <Rating />
          </div>
          <h3>(TOPIC) / (MEDIA TYPE)</h3>
          <h3>added by (USER)</h3>
          <button>Edit</button>
          <button>Delete</button>
        </hgroup>
      </header>
      <figure role="group">
        <img
          className="illustration"
          src="illustrations/road_to_knowledge.svg"
          alt="Illustration for Online Learning"
        />
        <figcaption>FREE</figcaption>
      </figure>
      <p>URL</p>
      <p>Reactions</p>
      <p>Popularity</p>
      <button>Add Comment</button>
      <button>Add Reaction</button>
      <h3>Description</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
        perspiciatis amet aspernatur dolores vel, aperiam voluptate earum,
        recusandae voluptatibus nesciunt pariatur maxime iste consequatur quos
        tempore accusamus qui repellendus reiciendis?
      </p>
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
