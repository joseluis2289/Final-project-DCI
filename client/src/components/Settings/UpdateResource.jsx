import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "../Styles/Settings.css";
import {} from "../R";

export default function UpdateResource(props) {
  const [resource, setResource] = useState(props.data);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "illustrations/road_to_knowledge.svg"
  );
  const [categories, setCategories] = useState([
    "frontend",
    "backend",
    "database",
    "machineLearning",
    "general",
  ]);
  useEffect(() => {
    resource.previewImage && setPreviewUrl(resource.previewImage);
  }, [resource.previewImage]);

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
        setAlert(true);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let delResource = (e) => {
    setDeleted(true);
    setResource({ ...resource, deleted: true, date: Date.now });
    axios({
      method: "PUT",
      url: `http://localhost:5000/resources/${resource.id}`,
      ContentType: "application/json",
      data: resource,
    })
      .then((response) => {
        console.log("deleted", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="update-resource">
      <form onSubmit={updateResource}>
        <div className="delete-button">
          <button onClick={delResource}>X</button>
          {deleted && (
            <span>
              Resource deleted{" "}
              <img className="icon" src="icons/x.png" alt="checked Icon" />
            </span>
          )}
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder={resource.title}
            onChange={formHandler}
          />
        </div>
        <img
          src={previewUrl}
          alt="preview"
          style={{ width: "100px", height: "100px" }}
        ></img>
        <div>
          <label htmlFor="link">Link</label>
          <p>{resource.link}</p>
        </div>
        <fieldset
          className="category"
          name="category"
          onChange={defineCategory}
        >
          <legend>Category</legend>

          {categories.map((item, index) => {
            let name = item[0].toUpperCase() + item.substring(1);
            return (
              <div key={index}>
                <label htmlFor={item}>
                  <input
                    type="checkbox"
                    name="category"
                    value={item}
                    checked={resource.category.indexOf(item) > -1}
                  />
                  {name}
                </label>
              </div>
            );
          })}
        </fieldset>

        <div name="paid" onChange={formHandler}>
          <label htmlFor="link">Paid</label>
          <div>
            <label htmlFor="access_paid">
              <input
                type="radio"
                name="paid"
                id="access_paid"
                value="true"
                checked={resource.paid ? "true" : "false"}
              />
              Yes
            </label>

            <label htmlFor="access_free">
              <input
                type="radio"
                name="paid"
                id="access_free"
                value="false"
                checked={resource.paid ? "false" : "true"}
              />
              No
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="title">description</label>
          <textarea
            name="description"
            rows="15"
            cols="70"
            style={{ border: "solid black 2px" }}
            placeholder={resource.description}
            onChange={formHandler}
          ></textarea>
        </div>
        <button type="submit">Update resource</button>
        {alert && (
          <span>
            Data updated{" "}
            <img className="icon" src="icons/checked.svg" alt="checked Icon" />
          </span>
        )}
      </form>
    </div>
  );
}
