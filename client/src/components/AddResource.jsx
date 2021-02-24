import React, { useState, Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Settings from "./settings/Settings";

export default function AddResource() {
  const user = useSelector((state) => state.user._id);
  const [resource, setResource] = useState({
    user: user,
    category: [],
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
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  let addResource = (e) => {
    e.preventDefault();
    // setResource({ ...resource, user: user });
    console.log("resource from AddResource", resource);
    axios({
      method: "POST",
      url: "http://localhost:5000/resources/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: resource,
    })
      .then((response) => {
        console.log("resource added");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return user ? (
    <Fragment>
      <Settings />
      <div>
        <form onSubmit={addResource}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter the title..."
              onChange={formHandler}
            />
          </div>
          <div>
            <label htmlFor="link">Link</label>
            <input
              type="text"
              name="link"
              placeholder="Enter the Link.."
              onChange={formHandler}
            />
          </div>
          <div name="category" onChange={defineCategory}>
            <label>Category</label>
            <label htmlFor="frontend">
              <input type="checkbox" name="category" value="frontend" />
              Frontend
            </label>

            <label htmlFor="backend">
              <input type="checkbox" name="category" value="backend" />
              Backend
            </label>

            <label htmlFor="database">
              <input type="checkbox" name="category" value="database" />
              Database
            </label>

            <label htmlFor="general">
              <input type="checkbox" name="category" value="general" />
              General
            </label>
          </div>

          <div name="paid" onChange={formHandler}>
            <label htmlFor="link">Paid</label>
            <div>
              <label htmlFor="access_paid">
                <input type="radio" name="paid" id="access_paid" value={true} />
                Yes
              </label>

              <label htmlFor="access_free">
                <input
                  type="radio"
                  name="paid"
                  id="access_free"
                  value={false}
                />
                No
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="title">description</label>
            <textarea
              name="description"
              rows="5"
              cols="33"
              style={{ border: "solid black 2px" }}
              placeholder="Enter your description..."
              onChange={formHandler}
            ></textarea>
          </div>
          <button type="submit">Add Resource</button>
        </form>
      </div>
    </Fragment>
  ) : (
    <p>fo to Login page</p>
  );
}
