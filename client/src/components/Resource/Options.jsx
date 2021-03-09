import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const update = useSelector((state) => state.update);
  const [reasonForReport, setReasonForReport] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  const handleChange = (e, { value }) => setReasonForReport(value);

  const dispatch = useDispatch();
  const options = [
    { key: "share", icon: "share", text: "Copy link", value: "share" },
    { key: "report", icon: "attention", text: "Report", value: "report" },
  ];
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
  const notify = () => {
    toast.success("The link was copied!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const handle = (e, { value }) => {
    if (value === "delete") {
      setDeleteModal(true);
    }
    if (value === "share") {
      var url = `https://webdevelop-student-companion.herokuapp.com/resources/resource/${resource._id}`;
      navigator.clipboard.writeText(url);
      notify();
    }
    if (value === "report") {
      setReportModal(true);
    }
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
      <Modal
        size="mini"
        open={reportModal}
        onClose={() => setReportModal(false)}
        onOpen={() => setReportModal(true)}
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
          <Button color="red" onClick={() => setReportModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={() => setReportModal(false)}>
            <Icon name="checkmark" /> Send
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
