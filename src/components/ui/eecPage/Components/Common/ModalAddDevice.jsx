import { Modal, ModalContent,  TooltipWrapper,Icon, IconButton, } from "@tesla/design-system-react";
import { useEffect, useState } from "react";
import { Button } from "@tesla/design-system-react";
import { iconPlus, } from '@tesla/design-system-icons';
import { networkSwitchStore } from "../../Store/networkSwitchStore";
import NetworkSwitchConfiguration from "../NetworkSwitches/NetworkSwitchConfiguration";
import { lineConfiguration } from "../../Store/lineStore";
import { hmiStore } from "../../Store/hmiStore";
import HmiConfiguration from "../HMIs/HmiConfiguration";
import { safetyGateStore } from "../../Store/safetyGateStore";
import SafetyGateSwitchConfiguration from "../SafetyGateSwitches/SafetyGateSwitchConfiguration";
import IO_ModuleConfiguration from "../IO_Modules/IO_ModuleConfiguration";
import { ioModuleStore } from "../../Store/ioModuleStore";
import { networkSwitchModel } from "../../Store/Models/NetworkSwitches/networkSwitchModel";
import { hmiModel } from "../../Store/Models/HMIs/hmiModel";
import { safetyGateSwitchModel } from "../../Store/Models/SafetyGates/safetyGateSwitchModel";
import { ioModuleModel } from "../../Store/Models/IoModules/ioModuleModel";
import LpdPsuItem from "../LPDs/LpdPsuItem";
import { psuModel } from "../../Store/Models/LDPs/psuModel";
import { lpdStore } from "../../Store/lpdStore";



const ModalAddDevice = ({item, name, line, location, powerSource, networkSource, onSubmit}) => {
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
  const wipIoModule = ioModuleStore((state)=>state.wipIoModule)
  const setWipIoModule = ioModuleStore((state)=>state.setWipIoModule)
  const addWipIoModule = ioModuleStore((state)=>state.addWipIoModule)
  const wipPsu = lpdStore((state)=>state.wipPsu)
  const setWipPsu = lpdStore((state)=>state.setWipPsu)
  const addWipPsu = lpdStore((state)=>state.addWipPsu)

  const handleFormSubmit = () => {
    if(name.startsWith(lineConfiguration.networkSwitchIndicator)){
      addWipNetworkSwitch()
      var wipItem = wipNetworkSwitch;
    } else if(name.startsWith(lineConfiguration.hmiIndicator)){
      addWipHmi();
      var wipItem = wipHmi;
    }else if(name.startsWith(lineConfiguration.gateIndicator)){
      addWipSafetyGateSwitch();
      var wipItem = wipSafetyGateSwitch;
    }else if(name.startsWith(lineConfiguration.safetyModuleIndicator) || name.startsWith(lineConfiguration.ioModuleIndicator)){
      addWipIoModule();
      var wipItem = addWipIoModule;
    }else if(name.startsWith(lineConfiguration.powerSupplyIndicator)){
      addWipPsu(item.data.parent.line,item.data.parent.location);
      var wipItem = addWipPsu;
    }
    if(wipItem && onSubmit){
      onSubmit(wipItem);
    }
    setOpenModal(false)
  }
  const updateItem = (item)=>{
    item.line = line;
    item.location = location;
    item.deviceTag = name;
    if(powerSource){
      getPowerSource(item, powerSource)
    } 
    if(networkSource){
      getEthernetSource(item, networkSource)
    } 
    return item;
  }

  const getPowerSource=(item, powerSource)=>{
    item.powerSourceLine = powerSource.getSourceLine();
    item.powerSourceLocation = powerSource.getSourceLocation();
    item.powerSourceDT = powerSource.getSourceDeviceTag();
  }
  const getEthernetSource=(item, networkSource)=>{
    item.ethernetSourceLine = networkSource.getSourceLine();
    item.ethernetSourceLocation = networkSource.getSourceLocation();
    item.ethernetSourceDT = networkSource.getSourceDeviceTag();
  }
  useEffect(() => {
    if(name.startsWith(lineConfiguration.networkSwitchIndicator)){
      var newNetworkSwitch = networkSwitchModel.create()
      newNetworkSwitch = updateItem(newNetworkSwitch)
      setWipNetworkSwitch(newNetworkSwitch)   
    } else if(name.startsWith(lineConfiguration.hmiIndicator)){
      var newHmi = hmiModel.create()
      newHmi = updateItem(newHmi)
      setWipHmi(newHmi);
    } else if(name.startsWith(lineConfiguration.gateIndicator)){
      var newGate = safetyGateSwitchModel.create()
      newGate = updateItem(newGate)
      setWipSafetyGateSwitch(newGate);
    } else if(name.startsWith(lineConfiguration.safetyModuleIndicator) || name.startsWith(lineConfiguration.ioModuleIndicator)){
      var newIoModule = ioModuleModel.create();
      newIoModule = updateItem(newIoModule)
      setWipIoModule(newIoModule);
    }else if(name.startsWith(lineConfiguration.powerSupplyIndicator)){
      var newPsu = psuModel.create();
      newPsu = updateItem(newPsu)
      setWipPsu(newPsu);
    }
}, [name]);
  

  const renderSwitch = () =>{
    if(name.startsWith(lineConfiguration.networkSwitchIndicator)){
      return <NetworkSwitchConfiguration networkSwitch={wipNetworkSwitch} createNew={true}/>
    } else if(name.startsWith(lineConfiguration.hmiIndicator)){
      return <HmiConfiguration hmi={wipHmi} createNew={true}/>
    }else if(name.startsWith(lineConfiguration.gateIndicator)){
      return <SafetyGateSwitchConfiguration safetyGateSwitch={wipSafetyGateSwitch} createNew={true}/>
    }else if(name.startsWith(lineConfiguration.safetyModuleIndicator) || name.startsWith(lineConfiguration.ioModuleIndicator)){
      return <IO_ModuleConfiguration ioModule={wipIoModule} createNew={true}/>
    }else if(name.startsWith(lineConfiguration.powerSupplyIndicator)){
      return <LpdPsuItem psu={wipPsu} createNew={true}/>
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
