import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import { Icon, IconButton } from '@tesla/design-system-react';
import { iconSettingsAlt } from '@tesla/design-system-icons';
import UpdatePlcSettingsForm from "./UpdatePlcSettingsForm";

const ModalUpdatePlcSettingsForm = ({id, plc}) => {
  const [openModal, setOpenModal] = useState(false);
  
  const handleClick = async () => {
    setOpenModal("example-modal");
  }
  

  return (
    <>
       <IconButton size="large" label="Settings"
      onClick={handleClick}>
        <Icon data={iconSettingsAlt} size="xl"/>
      </IconButton>
      {/* <Button variant="secondary" 
      style={{width:'150px'}}
      onClick={handleClick}>Settings</Button> */}

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
            <UpdatePlcSettingsForm id={id} plc={plc}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUpdatePlcSettingsForm;
