import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import ViewExamplesForm from "./ViewExamplesForm";

const ModalViewExamplesForm = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Examples</Button>

      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ViewExamplesForm onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalViewExamplesForm;
