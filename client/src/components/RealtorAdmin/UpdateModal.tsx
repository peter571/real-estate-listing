import { Button, Modal } from "flowbite-react";
import React from "react";

export default function UpdateModal({
  show,
  setShowUpdateModal,
}: {
  show: boolean;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <React.Fragment>
      <Modal dismissible={true} show={false} onClose={() => setShowUpdateModal(false)}>
        <Modal.Header>Update details of your property</Modal.Header>
        <Modal.Body>
          <div className="space-y-6"></div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={onClick}>Submit</Button>
          <Button color="gray" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button> */}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
