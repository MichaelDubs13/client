import { Button, Modal, ModalContent, ToastContainer, useToastContainerState,} from "@tesla/design-system-react";
import { useState } from "react";
import CreateSkidManagerForm from "./CreateSkidManagerForm";


const ModalCreateSkidManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const { toasts, addToast } = useToastContainerState();

  const handleFormSubmit = () => {
    setOpenModal(false)
    addToast({
      title: 'Import SkidManager',
      dismissible: true,
      caption: 'Import SkidManager Job started..click on job cards below to see more info',
      variant: 'status',
      statusType: 'info',
    })
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Import SkidManager</Button>
      <ToastContainer toasts={toasts} />
      <Modal onClose={() => setOpenModal(false)} open={openModal} style={{width:"1000px"}}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CreateSkidManagerForm onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateSkidManager;
