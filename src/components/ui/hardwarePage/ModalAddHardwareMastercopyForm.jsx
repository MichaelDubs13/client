import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import AddHardwareMastercopyForm from "./AddHardwareMastercopyForm";


const ModalAddHardwareMastercopyForm = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Add Mastercopy</Button>

      <Modal onClose={() => setOpenModal(false)} 
        open={openModal}
        style={{width:2200, height:1500}}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <AddHardwareMastercopyForm onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddHardwareMastercopyForm;
