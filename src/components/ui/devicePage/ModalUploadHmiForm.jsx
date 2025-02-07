import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import UploadHmiSettingsForm from "./UploadHmiSettingsForm";

const ModalUploadHmiForm = ({getHMIs}) => {
  const [openModal, setOpenModal] = useState(false);
  const [HMIs, setHMIs] = useState([]);
  
  const handleClick = async () => {
    var hosts = getHMIs();
    setHMIs(hosts);

    setOpenModal("example-modal");
  }
  

  return (
    <>
      <Button variant="secondary" onClick={handleClick}>HMI Settings</Button>

      <Modal onClose={() => setOpenModal(false)}
        open={openModal}
        style={{width:1800, height:1500}}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <UploadHmiSettingsForm hosts={HMIs}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUploadHmiForm;
