import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function ModalBox({
  header,
  text,
  deleteModal,
  setDeleteModal,
  action,
}) {
  const history = useHistory();
  return (
    <div>
      <Modal
        size="mini"
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onOpen={() => setDeleteModal(true)}
      >
        <Header icon="trash alternate" content={header} />
        <Modal.Content>
          <p>{text}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            style={{ backgroundColor: "var(--red-dark)", color: "white" }}
            onClick={(e) => {
              action(e);
              history.push("/home");
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
          <Button
            style={{ backgroundColor: "var(--green-dark)", color: "white" }}
            onClick={() => setDeleteModal(false)}
          >
            <Icon name="cancel" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
