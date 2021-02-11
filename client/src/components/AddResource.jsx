import React, { useState } from "react";
import axios from "axios";

export default function AddResource() {
  const [category, setCategory] = useState([]);
  const [resource, setResource] = useState({});

  let defineCategory = (e) => {
    e.preventDefault();
    setCategory([...category, e.target.value]);
    setResource({ ...resource, [e.target.id]: category });
  };

  let formHandler = (e) => {
    e.preventDefault();
    setResource({ ...resource, [e.target.id]: e.target.value });
  };

  let addResource = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/resources/add",
      data: resource,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={addResource}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            placeholder='Enter the title...'
            onChange={formHandler}
          />
        </div>
        <div>
          <label htmlFor='link'>Link</label>
          <input
            type='text'
            id='link'
            placeholder='Enter the Link..'
            onChange={formHandler}
          />
        </div>
        <fieldset id='category' onChange={defineCategory}>
          <label htmlFor='link'>Category</label>
          <label htmlFor='frontend'>
            <input type='checkbox' id='category' value='frontend' />
            Frontend
          </label>

          <label htmlFor='backend'>
            <input type='checkbox' id='category' value='backend' />
            Backend
          </label>

          <label htmlFor='database'>
            <input type='checkbox' id='category' value='database' />
            Database
          </label>

          <label htmlFor='general'>
            <input type='checkbox' id='category' value='general' />
            General
          </label>
        </fieldset>
        <fieldset onChange={formHandler}>
          <label htmlFor='link'>Paid</label>
          <label htmlFor='paid'>
            <input type='checkbox' id='paid' value='paid' />
            Yes
          </label>

          <label htmlFor='free'>
            <input type='checkbox' id='paid' value='free' />
            No
          </label>
        </fieldset>
        <div>
          <label htmlFor='title'>description</label>
          <textarea
            id='description'
            name='description'
            rows='5'
            cols='33'
            style={{ border: "solid black 2px" }}
            placeholder='Enter your description...'
            onChange={formHandler}
          ></textarea>
        </div>
        <button type='submit'>Add Resource</button>
      </form>
    </div>
  );
}
