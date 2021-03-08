import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Dropdown } from "semantic-ui-react";

export default function Options({ resource, userId }) {
  const [share, setShare] = useState(false);
  const user = useSelector((state) => state.user);
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
        />
      </Button.Group>

      <button>
        {" "}
        <img className="icon" src="icons/options.svg" alt="options Icon" />
      </button>
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
