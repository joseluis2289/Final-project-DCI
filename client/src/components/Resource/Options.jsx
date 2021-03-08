import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/actions";
import { Button, Dropdown, Header, Icon, Modal } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Options({ resource, userId }) {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const [share, setShare] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const options = [
    { key: "share", icon: "share", text: "Copy link", value: "share" },
    { key: "attention", icon: "attention", text: "Report", value: "attention" },
  ];
  const optionsAuthor = [
    { key: "edit", icon: "edit", text: "Edit Post", value: "edit" },
    { key: "delete", icon: "delete", text: "Remove Post", value: "delete" },
    { key: "share", icon: "share", text: "Copy link", value: "share" },
    { key: "attention", icon: "attention", text: "Report", value: "attention" },
  ];
  const notify = () => {
    toast.success("The link was copied!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const handle = (e, { value }) => {
    if (value === "delete") {
      setOpenModal(true);
    }
    if (value === "share") {
      var url = `https://webdevelop-student-companion.herokuapp.com/resources/resource/${resource._id}`;
      navigator.clipboard.writeText(url);
      notify();
    }
  };

  return (
    <div>
      <Button.Group color="teal">
        <Dropdown
          className="button icon"
          floating
          options={user._id === resource.user._id ? optionsAuthor : options}
          trigger={<></>}
          onChange={handle}
        />
      </Button.Group>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
      >
        <Header icon="trash alternate" content="Delete Resource" />
        <Modal.Content>
          <p>
            Would you like to delete this resource permanently? This action can
            not be undone.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => setOpenModal(false)}>
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
                  setOpenModal(false);
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
    </div>
  );
}
