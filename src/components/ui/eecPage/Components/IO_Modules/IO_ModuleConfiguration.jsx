import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { ioModuleGroupOptions } from "../../Store/ioModuleStore";
import DeviceSelection from "../Common/DeviceSelection";
import IO_ConfigurationTable from "./Table/IO_ConfigurationTable";
import { useState } from "react";
import { isValidIP } from "../Util/Validations";

const IO_ModuleConfiguration = ({ 
  ioModuleGroupIndex,
  ioModuleIndex,
  ioModule,
  createNew,
}) => {
  const index = createNew ? {} :  {ioModuleGroupIndex:ioModuleGroupIndex, ioModuleIndex:ioModuleIndex};
  const [defaultPortOption, setDefaultPortOption] = useState(ioModuleGroupOptions.portTypeDefaultSelectionOptions);
  const handlePortTypeChange = (value) => {
    ioModule.setPortType(index, value);
  }

  const handlePartNumberChange = (value)=>{
    if(value === "BNI0052"){
      setDefaultPortOption(ioModuleGroupOptions.portTypeDefaultSelection_Balluff_BNI0052Options);
      ioModule.setValue(index, "portTypeDefaultSelection", "Input")
      ioModule.setPortType(index, "Input");
    }
  }

  return (
    <div className="io-module-configuration">
      <div className="io-module-settings">
        <DeviceSelection item={ioModule} index={index} 
            lineProperty={"line"}
            stationProperty={"location"}
            deviceProperty={"deviceTag"}/>
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
          !createNew && <IO_ConfigurationTable ports={ioModule.ports} ioModuleGroupIndex={ioModuleGroupIndex} ioModuleIndex={ioModuleIndex}/>
        }
        
        {/* Insert the IO Module table for editing of IO Ports & port pins */}
        {/* this is my try and creating a table for the IO Module, please change it as needed.
            I believe you are going to need a subcomponent of ioPorts called Pins as each port will 
            have 2 pins (pin4 and pin2). */}
    </div>
        {/* Render a new subcomponent for the 1st IO-Link Slave for each port designated to have an IO-Link module.
            Within this new subcomponent there will be another subcomponent for the 2nd IO-Link Slave if required. */}
        
        
    </div>
  );
  };
  
  export default IO_ModuleConfiguration;