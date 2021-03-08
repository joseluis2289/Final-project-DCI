import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/actions";
import { Button, Dropdown, Header, Icon, Modal } from "semantic-ui-react";
import axios from "axios";

export default function Options({ resource, userId }) {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const [share, setShare] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const options = [
    { key: "share", icon: "share", text: "Share", value: "share" },
    { key: "attention", icon: "attention", text: "Report", value: "attention" },
  ];
  const optionsAuthor = [
    { key: "edit", icon: "edit", text: "Edit Post", value: "edit" },
    { key: "delete", icon: "delete", text: "Remove Post", value: "delete" },
    { key: "share", icon: "share", text: "Share", value: "share" },
    { key: "attention", icon: "attention", text: "Report", value: "attention" },
  ];

  const handle = (e, { value }) => {
    if (value === "delete") {
      <Modal
        closeIcon
        open={open}
        trigger={<Button>Show Modal</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon="trash alternate" content="Delete Resource" />
        <Modal.Content>
          <p>
            Would you like to delete this resource permanently? This action can
            not be undone.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => setOpen(false)}>
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
                  setOpen(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>;
    }
  };

  function copyFunction() {
    /* Get the text field */
    var copyText = document.getElementById("link-to-resource");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }

  return (
    <div>
      <Button.Group color="teal">
        <Button></Button>
        <Dropdown
          className="button icon"
          floating
          options={user._id === resource.user._id ? optionsAuthor : options}
          trigger={<></>}
          onChange={handle}
        />
      </Button.Group>

      {/* The button used to copy the link  */}
      {share && (
        <div>
          <input
            id="link-to-resource"
            value={`https://webdevelop-student-companion.herokuapp.com/resources/resource/${resource._id}`}
            disabled
            type="text"
          />

          <img
            className="icon"
            src="icons/copy.svg"
            alt="copy Icon"
            onClick={copyFunction}
          />
        </div>
      )}
    </div>
  );
}
