import React, { useState } from "react";
import axios from "axios";

export default function UpdateResource() {
  const [resource, setResource] = useState({
    userID: "usermodel",
    category: ["database"],
    edited: true,
    deleted: false,
    _id: "60251a5d1cd6cb4e195f81b7",
    previewImage:
      "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg",
    title: "Introduction to MongoDB",
    link: "https://www.coursera.org/learn/introduction-mongodb?",
    date: "2021-02-11T11:51:57.699Z",
    rating: 4,
    num_views: 41.946,
    paid: "free",
    description:
      "This course will get you up and running with MongoDB quickly, and teach you how to leverage its power for data analytics. We'll start by mastering the fundamentals of MongoDB, including MongoDB’s Document data model, importing data into a cluster, working with our CRUD API and Aggregation Framework. These topics will be taught through a demo application which will give you a great first encounter of how simple and practical it can be to build applications with MongoDB.In addition to these essential topics, you will also learn and work with useful MongoDB tools and services. You will work with Atlas, MongoDB's database as a service, MongoDB Compass, a schema visualization tool, as well as many other useful command-line utilities.",
    comments: [],
    __v: 0,
  });

  let defineCategory = (e) => {
    let categories = resource.category;
    let cat = categories.indexOf(e.target.value);
    if (cat === -1) {
      categories.push(e.target.value);
    } else if (cat !== -1) {
      categories.splice(cat, 1);
    }
    setResource({ ...resource, [e.target.name]: categories });
  };

  let formHandler = (e) => {
    setResource({ ...resource, edited: true, [e.target.name]: e.target.value });
  };

  let updateResource = (e) => {
    e.preventDefault();
    setResource({ ...resource, date: Date.now });
    axios({
      method: "PUT",
      url: `http://localhost:5000/resources/${resource._id}`,
      ContentType: "application/json",
      data: resource,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let delResource = (e) => {
    e.preventDefault();
    axios({
      method: "DEL",
      url: `http://localhost:5000/resources/${resource.id}`,
    })
      .then(function (response) {
        console.log("resource1 deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={updateResource}>
        <button onClick={delResource}>X</button>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            placeholder={resource.title}
            onChange={formHandler}
          />
        </div>
        <img
          src={resource.previewImage}
          alt='preview'
          style={{ width: "100px", height: "100px" }}
        ></img>
        <div>
          <label htmlFor='link'>Link</label>
          <p>{resource.link}</p>
        </div>
        <div name='category' onChange={defineCategory}>
          <label htmlFor='link'>Category</label>
          <label htmlFor='frontend'>
            <input
              type='checkbox'
              name='category'
              value='frontend'
              checked={resource.category.indexOf("frontend") > -1}
            />
            Frontend
          </label>

          <label htmlFor='backend'>
            <input
              type='checkbox'
              name='category'
              value='backend'
              checked={resource.category.indexOf("backend") > -1}
            />
            Backend
          </label>

          <label htmlFor='database'>
            <input
              type='checkbox'
              name='category'
              value='database'
              checked={resource.category.indexOf("database") > -1}
            />
            Database
          </label>

          <label htmlFor='general'>
            <input
              type='checkbox'
              name='category'
              value='general'
              checked={resource.category.indexOf("general") > -1}
            />
            General
          </label>
        </div>

        <div name='paid' onChange={formHandler}>
          <label htmlFor='link'>Paid</label>
          <div>
            <label htmlFor='access_paid'>
              <input
                type='radio'
                name='paid'
                id='access_paid'
                value='paid'
                checked={resource.paid.includes("paid")}
              />
              Yes
            </label>

            <label htmlFor='access_free'>
              <input
                type='radio'
                name='paid'
                id='access_free'
                value='free'
                checked={resource.paid.includes("free")}
              />
              No
            </label>
          </div>
        </div>
        <div>
          <label htmlFor='title'>description</label>
          <textarea
            name='description'
            rows='15'
            cols='70'
            style={{ border: "solid black 2px" }}
            placeholder={resource.description}
            onChange={formHandler}
          ></textarea>
        </div>
        <button type='submit'>Update resource</button>
      </form>
    </div>
  );
}
