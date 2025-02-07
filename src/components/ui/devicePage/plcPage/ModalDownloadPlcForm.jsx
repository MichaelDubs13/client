import { Modal, ModalContent, ToastContainer, useToastContainerState,} from "@tesla/design-system-react";
import { Icon, IconButton } from '@tesla/design-system-react';
import { iconDashcamDownload } from '@tesla/design-system-icons';
import { useState } from "react";
import DownloadPlcForm from "../DownloadPlcForm";



const ModalDownloadPlcForm = ({device}) => {
  const [openModal, setOpenModal] = useState(false);
  const { toasts, addToast } = useToastContainerState();

  const handleFormSubmit = () => {
    setOpenModal(false)
    addToast({
      title: 'Download PLC',
      dismissible: true,
      caption: 'Download PLC Job started..click on job cards on the main page to see more info',
      variant: 'status',
      statusType: 'info',
    })
  }

  return (
    <>
      <IconButton size="large" label="Download PLC Program"
      onClick={() => setOpenModal("example-modal")}>
        <Icon data={iconDashcamDownload} size="xl" />
      </IconButton>
      {/* <Button variant="secondary" 
      style={{width:'150px'}}
      onClick={() => setOpenModal("example-modal")}>Download</Button> */}
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
            <DownloadPlcForm device={device} onSubmit={handleFormSubmit}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDownloadPlcForm;
