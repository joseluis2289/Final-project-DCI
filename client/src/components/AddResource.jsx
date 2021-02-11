import React, { useState } from "react";
import axios from "axios";

export default function AddResource() {
  const [resource, setResource] = useState({ category: [] });

  let defineCategory = (e) => {
    let categories = resource.category;
    e.preventDefault();
    console.log(categories);
    if (categories.indexOf(e.target.value) === -1) {
      categories.push(e.target.value);
    } else if (categories.indexOf(e.target.value) !== -1) {
      categories = resource.category.filter(function (item) {
        console.log("item", item);
        return item !== e.target.value;
      });
    }
    setResource({ ...resource, [e.target.name]: categories });
  };

  let formHandler = (e) => {
    e.preventDefault();
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  let addResource = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/resources/add",
      ContentType: "application-json",
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
            name='title'
            placeholder='Enter the title...'
            onChange={formHandler}
          />
        </div>
        <div>
          <label htmlFor='link'>Link</label>
          <input
            type='text'
            name='link'
            placeholder='Enter the Link..'
            onChange={formHandler}
          />
        </div>
        <fieldset name='category' onChange={defineCategory}>
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
            placeholder='Enter your description...'
            onChange={formHandler}
          ></textarea>
        </div>
        <button type='submit'>Add Resource</button>
      </form>
    </div>
  );
}
