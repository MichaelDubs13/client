import { Button, Modal, ModalContent, ToastContainer, useToastContainerState,} from "@tesla/design-system-react";
import { useState } from "react";

import CreateSoftwareMatrixForm from "./CreateSoftwareMatrixForm";


const ModalCreateSoftwareMatrix = () => {
  const [openModal, setOpenModal] = useState(false);
  const { toasts, addToast } = useToastContainerState();

  const handleFormSubmit = () => {
    setOpenModal(false)
    addToast({
      title: 'Create SoftwareMatrix',
      dismissible: true,
      caption: 'Create SoftwareMatrix Job started..click on job cards below to see more info',
      variant: 'status',
      statusType: 'info',
    })
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Create SoftwareMatrix</Button>
      <ToastContainer toasts={toasts} />
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CreateSoftwareMatrixForm onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateSoftwareMatrix;
