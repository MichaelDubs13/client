import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import InstallIsoForm from "./InstallIsoForm";



const ModalInstallIsoForm = ({shop_id, line_id, handleSubmit}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = () => {
    setOpenModal(false)
    handleSubmit();
  }

  return (
    <>
      <Button variant="secondary" 
      style={{marginTop:"15px"}}
      onClick={() => setOpenModal("example-modal")}>Install ISOs</Button>

      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <InstallIsoForm shop_id={shop_id} line_id={line_id} onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalInstallIsoForm;
