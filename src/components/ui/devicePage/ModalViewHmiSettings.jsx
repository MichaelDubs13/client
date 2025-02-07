import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import UpdateHmiSettingsForm from "./UpdateHmiSettingsForm";

const ModalViewHmiSettings = ({id}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Settings</Button>

      <Modal onClose={() => setOpenModal(false)} 
        open={openModal}
        style={{width:1500, height:1500}}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <UpdateHmiSettingsForm id={id}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalViewHmiSettings;
