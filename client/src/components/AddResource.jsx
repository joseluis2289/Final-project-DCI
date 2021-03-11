import React, { useState, Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, Form, Checkbox } from "semantic-ui-react";

export default function AddResource() {
  const user = useSelector((state) => state.user._id);
  let history = useHistory();
  const [resource, setResource] = useState({
    user: user,
    category: [],
    paid: false,
  });
  const [categories, setCategories] = useState([
    "frontend",
    "backend",
    "database",
    "general",
  ]);

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
      url: "/resources/add",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: resource,
    })
      .then((response) => {
        console.log("resource added", response.data);
        history.push(`/resources/resource/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card.Group
      style={{ width: "600px", marginTop: "20px" }}
      className="ui container"
    >
      <Form onSubmit={addResource}>
        <Form.Field>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter the title..."
            onChange={(e) => {
              formHandler(e, e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            name="link"
            placeholder="Enter the Link.."
            onChange={(e) => {
              formHandler(e, e.target.value);
            }}
          />
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
                onChange={(e) => {
                  defineCategory(e.target.value);
                }}
              />
            );
          })}
        </Form.Group>
        <Checkbox
          toggle
          label="Paid"
          name="paid"
          type="checkbox"
          control="input"
          value={resource.paid}
          onChange={(e, { value }) => {
            setResource({ ...resource, paid: !resource.paid });
            console.log("resource", resource.paid);
          }}
        ></Checkbox>
        <Form.TextArea
          label="Description"
          placeholder="Enter your description..."
          name="description"
          onChange={(e) => {
            formHandler(e, e.target.value);
          }}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Card.Group>
  );
}
