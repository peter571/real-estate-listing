import React from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { UseMutationResult } from "@tanstack/react-query";

export default function DeleteModal({
  show,
  setShowDeleteModal,
  deleteItem,
}: {
  show: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteItem: UseMutationResult<any, unknown, void, unknown>;
}) {
  return (
    <React.Fragment>
      <Modal
        show={show}
        size="md"
        popup={true}
        onClose={() => setShowDeleteModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this property?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  deleteItem.mutate();
                  setShowDeleteModal(false);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
