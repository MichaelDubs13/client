import { Button, Modal, ModalContent, ToastContainer, useToastContainerState,} from "@tesla/design-system-react";
import { useState } from "react";
import CreateEecForm from "./CreateEecForm";



const ModalCreateEecForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const { toasts, addToast } = useToastContainerState();

  const handleFormSubmit = () => {
    setOpenModal(false)
    addToast({
      title: 'Create EEC',
      dismissible: true,
      caption: 'Create EEC Job started..click on job cards below to see more info',
      variant: 'status',
      statusType: 'info',
    })
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Create EEC</Button>
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
            <CreateEecForm onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateEecForm;
