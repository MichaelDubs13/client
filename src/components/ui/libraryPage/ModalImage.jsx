import {  Modal, ModalContent } from "@tesla/design-system-react";
import { Tooltip, TooltipWrapper, useTooltipState } from '@tesla/design-system-react';
import { useState } from "react";
import { MapInteractionCSS } from "react-map-interaction";


const ModalImage = ({image}) => {
  const [openModal, setOpenModal] = useState(false);
  const { open, handlers, wrapperRef } = useTooltipState({ initialOpen: false });

  return (
    <>
    <td colSpan={5}>
        <TooltipWrapper
            {...handlers}
            wrapperRef={wrapperRef}
            inline
            className="tds-text--regular tds-text--contrast-medium"
          >
          <img className="zoom"src={image} alt="" onClick={() => setOpenModal("example-modal")} />
            

            <Tooltip open={open} overlay orientation="down">
              <p>Click to view full image</p>
            </Tooltip>
          </TooltipWrapper>
    </td>
      
      <Modal 
        onClose={() => setOpenModal(false)} 
        style={{width:2500, height:1500}}
        open={openModal}>
        <ModalContent>
        <MapInteractionCSS
            showControls
            defaultValue={{
              scale: 1,
              translation: { x: 0, y: 20 }
            }}
            minScale={0.5}
            maxScale={3}
            translationBounds={{
              xMax: 400,
              yMax: 200
            }}
          >
          <img width="100%"src={image} alt="" />
          </MapInteractionCSS>
        </ModalContent>
      </Modal>
     
    </>
  );
};

export default ModalImage;
