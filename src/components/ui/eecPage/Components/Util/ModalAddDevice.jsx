import { Modal, ModalContent,  TooltipWrapper,Icon, IconButton, } from "@tesla/design-system-react";
import { useEffect, useState } from "react";
import { Button } from "@tesla/design-system-react";
import { iconPlus, } from '@tesla/design-system-icons';
import { networkSwitchConfiguration, networkSwitchStore } from "../../Store/networkSwitchStore";
import NetworkSwitchConfiguration from "../NetworkSwitches/NetworkSwitchConfiguration";
import { lineConfiguration } from "../../Store/lineStore";
import { hmiConfiguration, hmiStore } from "../../Store/hmiStore";
import HmiConfiguration from "../HMIs/HmiConfiguration";
import { safetyGateConfiguration, safetyGateStore } from "../../Store/safetyGateStore";
import SafetyGateSwitchConfiguration from "../SafetyGateSwitches/SafetyGateSwitchConfiguration";



const ModalAddDevice = ({item, name, line, location, powerSource, networkSource}) => {
  const [openModal, setOpenModal] = useState(false);
  const addWipNetworkSwitch = networkSwitchStore((state) => state.addWipNetworkSwitch);
  const setWipNetworkSwitch = networkSwitchStore((state) => state.setWipNetworkSwitch);   
  const wipNetworkSwitch = networkSwitchStore((state) => state.wipNetworkSwitch);
  const addWipHmi = hmiStore((state) => state.addWipHmi);
  const setWipHmi = hmiStore((state) => state.setWipHmi);   
  const wipHmi = hmiStore((state) => state.wipHmi);
  const addWipSafetyGateSwitch = safetyGateStore((state)=>state.addWipSafetyGateSwitch)
  const setWipSafetyGateSwitch = safetyGateStore((state)=>state.setWipSafetyGateSwitch)
  const wipSafetyGateSwitch = safetyGateStore((state)=>state.wipSafetyGateSwitch)

  const handleFormSubmit = () => {
    if(name.startsWith(lineConfiguration.networkSwitchIndicator)){
      addWipNetworkSwitch()
    } else if(name.startsWith(lineConfiguration.hmiIndicator)){
      addWipHmi();
    }else if(name.startsWith(lineConfiguration.gateIndicator)){
      addWipSafetyGateSwitch();
    }
    setOpenModal(false)
  }
  useEffect(() => {
    if(name.startsWith(lineConfiguration.networkSwitchIndicator)){
      const newNetworkSwitch = networkSwitchConfiguration.create()
      newNetworkSwitch.line = line;
      newNetworkSwitch.location = location;
      newNetworkSwitch.switchDT = name;
      if(powerSource){
        newNetworkSwitch.power1InLocation = powerSource.location;
        newNetworkSwitch.power1InDT = powerSource.deviceTag;
      } 
      
      setWipNetworkSwitch(newNetworkSwitch)   
    } else if(name.startsWith(lineConfiguration.hmiIndicator)){
      const newHmi = hmiConfiguration.create()
      newHmi.line = line;
      newHmi.location = location;
      newHmi.hmiDT = name;
      if(powerSource){
        newHmi.powerInLine = powerSource.line;
        newHmi.powerInLocation = powerSource.location;
        newHmi.powerInDT = powerSource.deviceTag;
      }else if(networkSource){
        newHmi.ethernetInLocation = networkSource.targetLocation;
        newHmi.ethernetInDT = networkSource.targetDT;
      }
      setWipHmi(newHmi);
    } else if(name.startsWith(lineConfiguration.gateIndicator)){
      const newGate = safetyGateConfiguration.createSafetyGateSwitch()
      newGate.line = line;
      newGate.location = location;
      newGate.safetyGateDT = name;
      if(powerSource){
        newGate.powerSourceLine = powerSource.line;
        newGate.powerSourceLocation = powerSource.location;
        newGate.powerSourceDT = powerSource.deviceTag;
      }else if(networkSource){
        newGate.ethernetSourceLocation = networkSource.targetLocation;
        newGate.ethernetSourceDT = networkSource.targetDT;
      }
      setWipSafetyGateSwitch(newGate);
    }
}, [name]);
  

  const renderSwitch = () =>{
    if(name.startsWith(lineConfiguration.networkSwitchIndicator)){
      return <NetworkSwitchConfiguration networkSwitch={wipNetworkSwitch} createNew={true}/>
    } else if(name.startsWith(lineConfiguration.hmiIndicator)){
      return <HmiConfiguration hmi={wipHmi} createNew={true}/>
    }else if(name.startsWith(lineConfiguration.gateIndicator)){
      return <SafetyGateSwitchConfiguration safetyGateSwitch={wipSafetyGateSwitch} createNew={true}/>
    }
  }


  return (
    <>
        <TooltipWrapper 
            inline
            className="tds-text--regular tds-text--contrast-medium tds-density--dense">
            <IconButton size="large" label="Add Device" style={{marginLeft:'0px'}}
                onClick={() => setOpenModal("example-modal")}>
                <Icon data={iconPlus} size="large" />
            </IconButton>
        </TooltipWrapper>
        {
          openModal && 
          <Modal onClose={() => setOpenModal(false)} open={openModal} style={{width:'1500px'}}>
            <ModalContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {
                  renderSwitch()
                }
              </div>
              <div>
                <Button onClick={handleFormSubmit}>Submit</Button>
              </div>
            </ModalContent>
          </Modal>
        }
    </>
  );
};

export default ModalAddDevice;
