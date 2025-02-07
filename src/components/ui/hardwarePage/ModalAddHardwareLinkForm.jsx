import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import AddHardwareLink from "./AddHardwareLink";


const ModalAddHardwareLinkForm = ({gsd_id, gsd_name, onSumbit}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = () => {
    onSumbit();
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")} style={{ margin: "8px"}}>Add Link</Button>

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
            <AddHardwareLink gsd_id={gsd_id} gsd_name={gsd_name} onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddHardwareLinkForm;
