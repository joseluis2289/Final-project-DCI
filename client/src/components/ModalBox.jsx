import React, { useState } from "react";
import Modal from "react-modal";
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
      <button onClick={openModal}>X</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <div className="modal">
          <h3>Are you sure you want to delete it?</h3>
          <p>This action can not be undone!</p>
          <button onClick={closeModal}>Yes</button>
          <button onClick={cancelModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
