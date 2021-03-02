import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../redux/actions";
import axios from "axios";
import Modal from "react-modal";
export default function Comment(props) {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const [deleted, setDeleted] = useState(false);
  const [comment, setComment] = useState({});
  const dispatch = useDispatch();
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
    delComment(e);
    setIsOpen(false);
  }
  function cancelModal() {
    setIsOpen(false);
  }

  let delComment = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/comments/${props.data._id}`,
      ContentType: "application/json",
    })
      .then((response) => {
        dispatch(updateData(update));
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="comment">
      <h3>{props.data.user.userName}</h3>
      {props.data.edited && <span>Edited</span>}
      {props.data.user._id === user._id && (
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
      )}
      {deleted && <p>worked</p>}
      <p>{props.data.text}</p>
      <span>
        {props.data.date
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-")
          .replaceAll("-", ".")}
      </span>
    </div>
  );
}
