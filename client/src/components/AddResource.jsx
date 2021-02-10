import React, { useState } from "react";

export default function AddResource() {
  const [resource, setResource] = useState({});
  const [category, setCategory] = useState([]);

  let defineCategory = (e) => {
    e.preventDefault();
    setCategory([...category, e.target.value]);
    setResource({ ...resource, [e.target.id]: category });
  };

  let formHandler = (e) => {
    e.preventDefault();
    setResource({ ...resource, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <form>
        <div>
          <label for='title'>Title</label>
          <input
            type='text'
            id='title'
            placeholder='Enter the title...'
            onChange={formHandler}
          />
        </div>
        <div>
          <label for='link'>Link</label>
          <input
            type='text'
            id='link'
            placeholder='Enter the Link..'
            onChange={formHandler}
          />
        </div>
        <fieldset id='category' onChange={defineCategory}>
          <label for='link'>Category</label>
          <label for='frontend'>
            <input type='checkbox' id='category' value='frontend' />
            Frontend
          </label>

          <label for='backend'>
            <input type='checkbox' id='category' value='backend' />
            Backend
          </label>

          <label for='database'>
            <input type='checkbox' id='category' value='database' />
            Database
          </label>

          <label for='general'>
            <input type='checkbox' id='category' value='general' />
            General
          </label>
        </fieldset>
        <fieldset onChange={formHandler}>
          <label for='link'>Paid</label>
          <label for='paid'>
            <input type='checkbox' id='paid' value='paid' />
            Yes
          </label>

          <label for='free'>
            <input type='checkbox' id='paid' value='free' />
            No
          </label>
        </fieldset>
        <div>
          <label for='title'>description</label>
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
        <button type='submit' class='btn btn-primary'>
          Add Resource
        </button>
      </form>
    </div>
  );
}
