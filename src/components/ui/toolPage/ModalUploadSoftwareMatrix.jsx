import { Button, Modal, ModalContent, ModalFooter } from "@tesla/design-system-react";
import { useState } from "react";
import UploadSoftwareMatrixForm from "./UploadSoftwareMatrixForm";

const ModalUploadSoftwareMatrix = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>TestBench</Button>

      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <UploadSoftwareMatrixForm onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUploadSoftwareMatrix;
