import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../redux/actions";
import Modal from "react-modal";

export default function UpdateResource(props) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(e) {
    e.preventDefault();
    delResource(e);
    setIsOpen(false);
  }
  function cancelModal() {
    setIsOpen(false);
  }

  const [resource, setResource] = useState(props.data);
  const update = useSelector((state) => state.update);
  const dispatch = useDispatch();

  const [alert, setAlert] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "./illustrations/road_to_knowledge.svg"
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
    setResource({ ...resource, edited: true, date: Date.now });
    axios({
      method: "PUT",
      url: `http://localhost:5000/resources/${resource._id}`,
      ContentType: "application/json",
      data: resource,
    })
      .then(function (response) {
        dispatch(updateData(update));
        setAlert(true);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let delResource = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/resources/${resource._id}`,
      ContentType: "application/json",
    })
      .then((response) => {
        dispatch(updateData(update));
        console.log("deleted", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="update-resource">
      <button onClick={openModal}>X</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <div className="modal">
          <h3>Are you sure you want to delete it?</h3>
          <p>This action can not be undone!</p>
          <button onClick={closeModal}>Yes</button>
          <button onClick={cancelModal}>Cancel</button>
        </div>
      </Modal>

      <form onSubmit={updateResource}>
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
                onChange={formHandler}
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
                onChange={formHandler}
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
            Saved{" "}
            <img className="icon" src="icons/checked.svg" alt="checked Icon" />
          </span>
        )}
      </form>
    </div>
  );
}
