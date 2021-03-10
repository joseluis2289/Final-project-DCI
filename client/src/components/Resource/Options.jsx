import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateData } from "../../redux/actions";
import {
  Button,
  Dropdown,
  Header,
  Icon,
  Modal,
  Form,
  Radio,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Options({ resource }) {
  const user = useSelector((state) => state.user);
  const logIn = useSelector((state) => state.logIn);
  const [resourceData, setResourceData] = useState(resource);
  const update = useSelector((state) => state.update);
  //modal to delete
  const [deleteModal, setDeleteModal] = useState(false);
  //modals to report
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [reasonForReport, setReasonForReport] = useState("");

  //function to future implementation
  const handleChange = (e, { value }) => setReasonForReport(value);

  const dispatch = useDispatch();
  const history = useHistory();

  //creating open link to dropdown
  const options = [
    { key: "share", icon: "share", text: "Copy link", value: "share" },
    { key: "report", icon: "attention", text: "Report", value: "report" },
  ];
  //creating private links to dropdown
  const optionsAuthor = [
    { key: "edit", icon: "edit", text: "Edit Post", value: "edit" },
    {
      key: "delete",
      icon: "trash alternate outline",
      text: "Remove Post",
      value: "delete",
    },
    { key: "share", icon: "share", text: "Copy link", value: "share" },
    { key: "report", icon: "attention", text: "Report", value: "report" },
  ];

  //alert to confirm that link was copied
  const notify = () => {
    toast.success("The link was copied!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  //setting function depending on which link from dropdown was clicked
  const handle = (e, { value }) => {
    if (value === "delete") {
      setDeleteModal(true);
    }
    if (value === "share") {
      var url = `https://webdevelop-student-companion.herokuapp.com/resources/resource/${resource._id}`;
      navigator.clipboard.writeText(url);
      notify();
    }
    //updating property "reported" to true
    if (value === "report") {
      if (logIn) {
        setFirstOpen(true);
        setResourceData({ ...resource, reported: true });
      } else {
        history.push("/login");
      }
    }
  };

  //function to from report
  const report = (e) => {
    e.preventDefault();
    setResourceData({ ...resource, reported: true });
    axios({
      method: "PUT",
      url: `/resources/${resource._id}`,
      ContentType: "application/json; charset=utf-8",
      data: resourceData,
    })
      .then(function (response) {
        dispatch(updateData(update));
        setFirstOpen(false);
        setSecondOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button.Group color="teal">
        <Dropdown
          className="button icon"
          floating
          options={
            user !== {} && user._id === resource.user._id
              ? optionsAuthor
              : options
          }
          trigger={<></>}
          onChange={handle}
        />
      </Button.Group>

      {/* MODAL TO DELETE RESOURCE */}
      <Modal
        size="mini"
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onOpen={() => setDeleteModal(true)}
      >
        <Header icon="trash alternate" content="Delete Resource" />
        <Modal.Content>
          <p>
            Would you like to delete this resource permanently? This action can
            not be undone.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => setDeleteModal(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button
            color="red"
            onClick={() => {
              axios({
                method: "DELETE",
                url: `/resources/${resource._id}`,
                ContentType: "application/json; charset=utf-8",
              })
                .then((response) => {
                  dispatch(updateData(update));
                  setDeleteModal(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>

      {/* MODAL TO REPORT */}
      {/* 2 modals  */}
      <Modal
        size="mini"
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Header icon="attention alternate" content="Report Content" />
        <Modal.Content>
          <Form>
            <Form.Field>Why do you want to report this resource?</Form.Field>
            <Form.Field>
              <Radio
                label="inappropriate content"
                name="radioGroup"
                value="inappropriate-content"
                checked={reasonForReport === "inappropriate-content"}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="repeated"
                name="radioGroup"
                value="repeated"
                checked={reasonForReport === "repeated"}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="other reason"
                name="radioGroup"
                value="other"
                checked={reasonForReport === "other"}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setFirstOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button
            color="green"
            onClick={(e) => {
              /* setFirstOpen(false); */
              setSecondOpen(true);
            }}
          >
            Send <Icon name="checkmark" />
          </Button>
        </Modal.Actions>

        <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size="small"
        >
          <Modal.Header>Thanks for your help</Modal.Header>
          <Modal.Content>
            <p>Our moderators will check this report.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="red"
              icon="check"
              content="Close"
              onClick={() => {
                axios({
                  method: "PUT",
                  url: `/resources/${resource._id}`,
                  ContentType: "application/json; charset=utf-8",
                  data: resourceData,
                })
                  .then(function (response) {
                    dispatch(updateData(update));
                    setSecondOpen(false);
                    setFirstOpen(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </div>
  );
}
