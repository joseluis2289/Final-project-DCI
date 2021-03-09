import React, { useState } from "react";
import Modal from "react-modal";
import { Button, Card, Header } from "semantic-ui-react";

export default function ModalBox(props) {
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
    props.function(e);
    setIsOpen(false);
  }
  function cancelModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button
        style={{
          fontSize: "10px",
          width: "5px",
          height: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "0",
        }}
        onClick={openModal}
      >
        {props.text}
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <div className="modal">
          <Header>Are you sure you want to delete it?</Header>
          <p>This action can not be undone!</p>
          <Button onClick={closeModal}>Yes</Button>
          <Button onClick={cancelModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
