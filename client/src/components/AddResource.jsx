import React, { useState, Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Checkbox,
  Radio,
  CardContent,
  CardHeader,
  Image,
  Grid,
  GridRow,
  GridColumn,
  CardMeta,
  Item,
  CardDescription,
  Label,
  Header,
} from "semantic-ui-react";

export default function AddResource() {
  const user = useSelector((state) => state.user._id);
  let history = useHistory();
  const [resource, setResource] = useState({
    user: user,
    category: [],
  });
  const [categories, setCategories] = useState([
    "frontend",
    "backend",
    "database",
    "general",
  ]);
  const [paid, setPaid] = useState(false);

  let defineCategory = (value) => {
    let categoriesSelected = resource.category;
    console.log(value);
    let cat = categoriesSelected.indexOf(value);
    if (cat === -1) {
      categoriesSelected.push(value);
    } else if (cat !== -1) {
      categoriesSelected.splice(cat, 1);
    }
    setResource({ ...resource, category: categoriesSelected });
  };

  let formHandler = (e, value) => {
    setResource({ ...resource, [e.target.name]: value });
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
        console.log("resource added", response.data._id);
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
                value={`${name}`}
                onChange={(e) => {
                  defineCategory(e.target.value);
                }}
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
            checked={paid === true}
            onChange={(e) => {
              setPaid(!paid);
              setResource({ ...resource, paid: paid });
            }}
          />
        </Form.Field>
        <Form.TextArea
          label="Description"
          placeholder="Enter your description..."
          onChange={formHandler}
          name="description"
        />
        <Button type="submit">Submit</Button>
      </Form>

      <div className="add-resource">
        <form onSubmit={addResource}>
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
        </form>
      </div>
    </Card.Group>
  );
}
