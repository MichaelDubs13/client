import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import UploadHmiListForm from "./UploadHmiListForm";

const ModalUploadHmiList = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Upload</Button>

      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <UploadHmiListForm onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUploadHmiList;
