import { Button, Modal, ModalContent } from "@tesla/design-system-react";
import { useState } from "react";
import ViewLabelForm from "./ViewLabelForm";
import useDeviceStore from "../../../../store/deviceStore";

const ModalViewLabels = ({getIDs}) => {
  const [openModal, setOpenModal] = useState(false);
  const fetchLabelsByPLC = useDeviceStore((state) => state.fetchLabelsByPLC);
  const setLabel = useDeviceStore((state) => state.setLabel);
  const [IDs, setIDs] = useState([]);

  const handleClick = async () => {
    const list = getIDs();
    setIDs(list);

    if(list.length > 0){
      fetchLabelsByPLC(list);
    } else{
      setLabel([]);
    }

    setOpenModal("example-modal");
  }

  return (
    <>
      <Button variant="secondary" onClick={handleClick}>View Labels</Button>

      <Modal onClose={() => setOpenModal(false)}
        open={openModal}
        style={{width:1000, height:800}}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ViewLabelForm id={IDs}/>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalViewLabels;
