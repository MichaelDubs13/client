import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import ViewInstructionsForm from "./ViewInstructionsForm";

const ModalViewInstructionForm = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Instructions</Button>

      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ViewInstructionsForm onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalViewInstructionForm;
