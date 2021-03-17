import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateData } from "../../redux/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Form,
  Radio,
  TextArea,
  Header,
  Grid,
  Image,
  Container,
  Card,
  Checkbox,
} from "semantic-ui-react";

import ModalBox from "../ModalBox";

const UpdateResource = (props) => {
  const [resource, setResource] = useState(props.data);
  const update = useSelector((state) => state.update);
  const [paid, setPaid] = useState(props.data.paid);
  //modal to delete
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const [previewUrl, setPreviewUrl] = useState(
    "./illustrations/road_to_knowledge.svg"
  );
  const [categories, setCategories] = useState([
    "frontend",
    "backend",
    "database",
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
    setResource({ ...resource, date: Date.now() });
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
        /* history.push(`/resources/resource/${response.data._id}`); */
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
    <Container fluid>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column
            verticalAlign="middle"
            mobile={16}
            tablet={16}
            computer={9}
            className="background-container"
            style={{
              padding: "0 !important",
              margin: "0",
            }}
          >
            {/* styling colored background + image depending on the screen width  */}
            <Grid divided="vertically" verticalAlign="middle">
              <Grid.Row columns={2}>
                <Grid.Column mobile={16} tablet={6} computer={16}>
                  <Header
                    textAlign="center"
                    style={{
                      fontSize: "1.5rem",
                      margin: "1em",
                    }}
                  >
                    We are glad you are updating your resource !
                  </Header>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={10} computer={16}>
                  <Image
                    wrapped
                    src=".././illustrations/updateResource.svg"
                    alt="man updating"
                    style={{
                      padding: "1.5rem",
                      margin: "0",
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column
            className="add-form"
            verticalAlign="middle"
            mobile={16}
            tablet={16}
            computer={7}
          >
            <div style={{ width: "300px", margin: "auto", marginTop: "40px" }}>
              <Card.Group>
                <Form onSubmit={updateResource}>
                  <Form.Field>
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={resource.title}
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
                  <Form.Field label="Categories"></Form.Field>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Checkbox
                        toggle
                        id="general"
                        value="general"
                        onChange={(e) => {
                          defineCategory(e);
                        }}
                        control="input"
                        label="General"
                        checked={resource.category.indexOf("general") > -1}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        toggle
                        id="frontend"
                        value="frontend"
                        onChange={(e) => {
                          defineCategory(e);
                        }}
                        control="input"
                        label="Frontend"
                        checked={resource.category.indexOf("frontend") > -1}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Checkbox
                        toggle
                        id="backend"
                        value="backend"
                        onChange={(e) => {
                          defineCategory(e);
                        }}
                        control="input"
                        label="Backend"
                        checked={resource.category.indexOf("backend") > -1}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        toggle
                        id="database"
                        value="database"
                        onChange={(e) => {
                          defineCategory(e);
                        }}
                        label="Database"
                        control="input"
                        checked={resource.category.indexOf("database") > -1}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Field label="Paid"></Form.Field>
                  <Checkbox
                    toggle
                    name="paid"
                    type="checkbox"
                    control="input"
                    checked={resource.paid}
                    onChange={(e) => {
                      setResource({ ...resource, paid: !resource.paid });
                    }}
                    style={{
                      margin: "0.em 0",
                    }}
                  />

                  <Form.Field>
                    <TextArea
                      label="Description"
                      name="description"
                      value={resource.description}
                      onChange={formHandler}
                    />
                  </Form.Field>
                  <Button
                    style={{ width: "130px", alignItems: "center" }}
                    className="ui primary labeled icon button"
                    type="submit"
                  >
                    <i className="edit icon"></i>Update
                  </Button>
                </Form>
                <Button
                  style={{
                    width: "130px",
                    marginTop: "1em",
                    alignItems: "center",
                    float: "right",
                  }}
                  className="ui red labeled icon button"
                  onClick={() => setDeleteModal(true)}
                >
                  <i className="trash alternate outline icon"></i>Delete
                </Button>
              </Card.Group>
              <ModalBox
                header="Delete Resource"
                text="Would you like to delete this resource permanently? This action can
            not be undone."
                action={delResource}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default UpdateResource;
