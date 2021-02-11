import React, { useState } from "react";
import axios from "axios";

export default function UpdateResource() {
  const [dataToUpdate, setDataToUpdate] = useState;
  const [resource1, setResource1] = useState({ category: [] });
  const [example, setExample] = useState({});

  let formHandler = (e) => {
    e.preventDefault();
    setExample({ ...example, [e.target.name]: e.target.value });
  };

  let updateResource1 = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `http://localhost:5000/resources/${_id}`,
      ContentType: "application-json",
      data: example,
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
      url: `http://localhost:5000/resources/${_id}`,
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
      <form onSubmit={updateResource1}>
        <button type={delResource}>X</button>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            placeholder='Enter the title...'
            onChange={formHandler}
          />
        </div>
        <img
          src={example.preventDefault}
          alt='preview'
          style={{ width: "100px", height: "100px" }}
        ></img>
        <div>
          <label htmlFor='link'>Link</label>
          <input
            type='text'
            name='link'
            placeholder='Enter the Link..'
            value={example.link}
            onChange={formHandler}
          />
        </div>
        <fieldset name='category'>
          <label htmlFor='link'>Category</label>
          <label htmlFor='frontend'>
            <input type='checkbox' name='category' value='frontend' />
            Frontend
          </label>

          <label htmlFor='backend'>
            <input type='checkbox' name='category' value='backend' />
            Backend
          </label>

          <label htmlFor='database'>
            <input type='checkbox' name='category' value='database' />
            Database
          </label>

          <label htmlFor='general'>
            <input type='checkbox' name='category' value='general' />
            General
          </label>
        </fieldset>
        id
        <fieldset name='paid' onChange={formHandler}>
          <label htmlFor='link'>Paid</label>
          <div>
            <label htmlFor='access_paid'>
              <input type='radio' name='paid' id='access_paid' value='paid' />
              Yes
            </label>

            <label htmlFor='access_free'>
              <input type='radio' name='paid' id='access_free' value='free' />
              No
            </label>
          </div>
        </fieldset>
        <div>
          <label htmlFor='title'>description</label>
          <textarea
            name='description'
            rows='5'
            cols='33'
            style={{ border: "solid black 2px" }}
            value={example.description}
            placeholder='Enter your description...'
            onChange={formHandler}
          ></textarea>
        </div>
        <button type='submit'>Update resource1</button>
      </form>
    </div>
  );
}
