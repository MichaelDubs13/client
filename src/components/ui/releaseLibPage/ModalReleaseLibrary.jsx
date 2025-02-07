import { Button, Modal, ModalContent, ToastContainer, useToastContainerState,} from "@tesla/design-system-react";
import { useState } from "react";
import ReleaseLibraryForm from "./ReleaseLibraryForm";


const ModalReleaseLibrary = ({endRev, startRev, totalErrors, onSubmit}) => {
  const [openModal, setOpenModal] = useState(false);
  const { toasts, addToast } = useToastContainerState();
  const handleFormSubmit = (job) => {
    setOpenModal(false)
    onSubmit(job);
    addToast({
      title: 'Release Library',
      dismissible: true,
      caption: 'Release Library Job started..click on job cards on page to see more info',
      variant: 'status',
      statusType: 'info',
    })
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpenModal("example-modal")}>Release</Button>
      <ToastContainer toasts={toasts} />
      <Modal onClose={() => setOpenModal(false)} 
        open={openModal}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ReleaseLibraryForm onSubmit={handleFormSubmit} 
              startRev={startRev} 
              endRev={endRev}
              totalErrors={totalErrors}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalReleaseLibrary;
