import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../redux/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Form, Radio } from "semantic-ui-react";

import ModalBox from "../ModalBox";

export default function UpdateResource(props) {
  const [resource, setResource] = useState(props.data);
  const update = useSelector((state) => state.update);
  const [paid, setPaid] = useState(false);
  const dispatch = useDispatch();
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

  //alert messages
  const notify = () => {
    toast.success(`Successfully Updated!`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const notifyError = () => {
    toast.error("Error to Update resource! Try again", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  //show image
  useEffect(() => {
    resource.previewImage && setPreviewUrl(resource.previewImage);
  }, [resource.previewImage, update]);

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
    setResource({ ...resource, edited: true, date: Date.now() });
    axios({
      method: "PUT",
      url: `/resources/${resource._id}`,
      ContentType: "application/json; charset=utf-8",
      data: resource,
    })
      .then(function (response) {
        dispatch(updateData(update));
        notify();
        console.log(response);
      })
      .catch((err) => {
        notifyError();
        console.log(err);
      });
  };

  let delResource = () => {
    axios({
      method: "DELETE",
      url: `/resources/${resource._id}`,
      ContentType: "application/json; charset=utf-8",
    })
      .then((response) => {
        console.log("sta é a resposta", response);
        dispatch(updateData(update));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="update-resource">
      <ModalBox function={delResource} text="X" />

      <Form onSubmit={updateResource}>
        <Form.Field>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder={resource.title}
            onChange={formHandler}
          />
        </Form.Field>
        <img
          src={previewUrl}
          alt="preview"
          style={{ width: "100px", height: "100px" }}
        ></img>
        <Form.Field>
          <label htmlFor="link">Link</label>
          <p>{resource.link}</p>
        </Form.Field>
        <Form.Group inline>
          <label>Category</label>
          {categories.map((item, index) => {
            let name = item[0].toUpperCase() + item.substring(1);
            return (
              <Form.Field
                label={name}
                key={index}
                type="checkbox"
                control="input"
                value={item}
                checked={resource.category.indexOf(item) > -1}
              />
            );
          })}
        </Form.Group>

        <Form.Field>
          <Radio
            toggle
            label="Paid"
            name="paid"
            value={paid}
            checked={paid === false}
            onChange={(e) => {
              setPaid(!paid);
              setResource({ ...resource, paid: paid });
            }}
          />
        </Form.Field>
        <Form.Field>
          <Form.Textarea
            label="Description"
            type="text"
            name="description"
            placeholder={resource.description}
            onChange={formHandler}
          ></Form.Textarea>
        </Form.Field>
        <Button type="submit">Update Resource</Button>
      </Form>
    </div>
  );
}
