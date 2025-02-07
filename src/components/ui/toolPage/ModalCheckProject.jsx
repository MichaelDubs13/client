import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import CheckProjectForm from "./CheckProjectForm";


const ModalCheckProject = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Check Project</Button>

      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CheckProjectForm onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCheckProject;
