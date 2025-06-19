import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { ioModuleGroupOptions } from "../../Store/ioModuleStore";
import DeviceSelection from "../Common/DeviceSelection";
import IOLinkMaster_ConfigurationTable from "./Table/IOLinkMaster/IOLinkMaster_ConfigurationTable";
import { useEffect, useState } from "react";
import { isValidIP } from "../Util/Validations";
import IOLinkSlave_ConfigurationTable from "./Table/IOLinkSlave/IOLinkSlave_ConfigurationTable";

const IO_ModuleConfiguration = ({ 
  ioModuleGroupIndex,
  ioModuleIndex,
  ioModule,
  createNew,
}) => {
  const index = createNew ? {} :  {ioModuleGroupIndex:ioModuleGroupIndex, ioModuleIndex:ioModuleIndex};
  const [defaultPortOption, setDefaultPortOption] = useState(ioModuleGroupOptions.portTypeDefaultSelectionOptions);
  const ioLinkSlaves = ioModule.ports.filter(i => i.isIOLink && (i.pinTargetPartNumber === ioModuleGroupOptions.BNI00CN || i.pinTargetPartNumber === ioModuleGroupOptions.BNI00CR))
  
  useEffect(() => {
      console.log(ioModule.ports);
  });
  
  const handlePortTypeChange = (value) => {
    ioModule.setPortType(index, value);
  }

  const handlePartNumberChange = (value)=>{
    if(value === ioModuleGroupOptions.BNI0052){
      setDefaultPortOption(ioModuleGroupOptions.portTypeDefaultSelection_Balluff_BNI0052Options);
      ioModule.setValue(index, "portTypeDefaultSelection", "Input")
      ioModule.setPortType(index, "Input");
    }
  }

  const handleStationChange =(value)=>{
    ioModule.ports.forEach(port => {
      var portIndex = port.getIndexObject();
      port.setValue(portIndex, "pinTargetLocation", value)
    })
    
  }

  return (
    <div className="io-module-configuration">
      <div className="io-module-settings">
        <DeviceSelection item={ioModule} index={index} 
            lineProperty={"line"}
            stationProperty={"location"}
            deviceProperty={"deviceTag"}
            onStationChange={handleStationChange}/>
        <CheckboxItem title={"Is this module safety rated (i.e., Safety I/O):"} item={ioModule} property={"safetyRated"} index={index}/>
        {ioModule.safetyRated && (
          <>
            <DropdownItem title={"Select a manufacturer:"} item={ioModule} property={"sioManufacturerName"} options={ioModuleGroupOptions.sioManufacturerNameOptions} index={index}/>
            {ioModule.sioManufacturerName === "A-B (WIP)" &&
              <>
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"sioParts_AB"} options={ioModuleGroupOptions.sioParts_ABOptions} index={index}/> 
              </>
            }
            {ioModule.sioManufacturerName === "Beckhoff (WIP)" &&
              <>
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"sioParts_Beckhoff"} options={ioModuleGroupOptions.sioParts_BeckhoffOptions} index={index}/> 
              </>
            }
            {ioModule.sioManufacturerName === "Murr" &&
              <>
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"sioParts_Murr"} options={ioModuleGroupOptions.sioParts_MurrOptions} index={index}/> 
              </>
            }
            {ioModule.sioManufacturerName === "Siemens (WIP)" &&
              <>
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"sioParts_Siemens"} options={ioModuleGroupOptions.sioParts_SiemensOptions} index={index}/> 
              </>
            }
          </>
        )}
        {!ioModule.safetyRated && (
          <>
            <DropdownItem title={"Select a manufacturer:"} item={ioModule} property={"mioManufacturerName"} options={ioModuleGroupOptions.mioManufacturerNameOptions} index={index}/>
            {ioModule.mioManufacturerName === "Balluff" &&
              <>
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"mioParts_Balluff"} 
                    options={ioModuleGroupOptions.mioParts_BalluffOptions} index={index} onChange={handlePartNumberChange}/>
              </>
            }
            {ioModule.mioManufacturerName === "Beckhoff (WIP)" &&
              <>
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"mioParts_Beckhoff"} options={ioModuleGroupOptions.mioParts_BeckhoffOptions} index={index}/>
              </>
            }
            {ioModule.mioManufacturerName === "P+F (WIP)" &&
              <>
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"mioParts_PF"} options={ioModuleGroupOptions.mioParts_PFOptions} index={index}/>
              </>
            }
            {ioModule.mioManufacturerName === "Siemens (WIP)" &&
              <>
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"mioParts_Siemens"} options={ioModuleGroupOptions.mioParts_SiemensOptions} index={index}/>
              </>
            }
            {ioModule.mioManufacturerName === "Turck" &&
              <>
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"mioParts_Turck"} options={ioModuleGroupOptions.mioParts_TurckOptions} index={index}/>
              </>
            }
          </>
        )}
        
        <InputTextItem title={"Local IP address (e.g., 192.168.1.x)"} item={ioModule} property={"localIP"} index={index} validation={isValidIP}/>
        <DropdownItem title={"Enter the PLC Opteration Mode (i.e., OpMode) of the module (e.g., 01, 02, 03, etc.)"} item={ioModule} property={"opMode"} options={ioModuleGroupOptions.opModeOptions} index={index}/>
        {ioModule.mioManufacturerName === "Balluff" && 
          <>
            <DropdownItem title={"Select the default port type for the module (manual configuration can be done at anytime):"} item={ioModule} property={"portTypeDefaultSelection"} 
              options={defaultPortOption} index={index} onChange={handlePortTypeChange}/>
          </>
        }
        {
          !createNew && <IOLinkMaster_ConfigurationTable ports={ioModule.ports} ioModuleGroupIndex={ioModuleGroupIndex} ioModuleIndex={ioModuleIndex}/>
        }
        {
          ioLinkSlaves.map((ioLinkSlave) => {
              const index = ioLinkSlave.getIndex();
              return <div>
                  <p>IO-Link Slave Module: Port{index+1} {ioLinkSlave.data.parent.pinTargetDT} (Part No.{ioModule.ports[index].pinTargetPartNumber})</p>
                  <IOLinkSlave_ConfigurationTable ports={ioModule.ports[index].ports} ioModuleGroupIndex={ioModuleGroupIndex} ioModuleIndex={ioModuleIndex} masterPortIndex={index}/>
              </div>
              
          })
        }
        
     
      </div>
    </div>
  );
  };
  
  export default IO_ModuleConfiguration;