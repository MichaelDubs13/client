import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { ioModuleStore, ioModuleGroupOptions } from "../../Store/ioModuleStore";
import DeviceSelection from "../Common/DeviceSelection";
import { useEffect, useState } from "react";
import { mcpStore } from "../../Store/mcpStore";
import { lineStore } from "../../Store/lineStore";

const IO_ModuleConfiguration = ({ 
  ioModuleGroupIndex,
  ioModuleIndex,
  ioModule,
}) => {
  const mcps = mcpStore((state)=>state.mcps)
  const ioModuleGroups = ioModuleStore((state) => state.ioModuleGroups);
  const ioModuleGroupsOptions = ioModuleStore((state) => state.ioModuleGroupsOptions);
  const index = {ioModuleGroupIndex:ioModuleGroupIndex, ioModuleIndex:ioModuleIndex};
  const [ioModuleOptions, setIOModuleOptions] = useState([]) 
  const getPlcOptions = lineStore((state)=> state.getPlcOptions)
  const plcs = lineStore((state)=> state.plcs)
  useEffect(() => {
    getPlcOptions();
    if(mcps.length === 1){
      ioModule.setValue(index, "plcID", mcps[0].getPlc())
    }
}, [mcps]);

  useEffect(() => {
    const targetGateSwitch = ioModuleGroups.find(ioModuleGroup => ioModuleGroup.getFullName() === ioModule.selectedGateSwitch);
    if(targetGateSwitch){
      setIOModuleOptions(targetGateSwitch.getIOModuleOptions());
    }
  }, [ioModule.selectedGateSwitch]);


  return (
    <div className="io-module-configuration">
      <div className="io-module-settings">
        <DeviceSelection item={ioModule} index={index} 
            lineTitle={"IO module LINE (e.g., UBM1)"} lineProperty={"line"}
            stationTitle={"IO module LOCATION (i.e., Station number) (e.g., 00010)"} stationProperty={"location"}
            deviceTitle={"IO module Device Tag (e.g., MIO01, SIO01)"} deviceProperty={"ioModuleDT"}/>
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
                <DropdownItem title={"Select a part number:"} item={ioModule} property={"mioParts_Balluff"} options={ioModuleGroupOptions.mioParts_BalluffOptions} index={index}/>
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
        
        <InputTextItem title={"Local IP address (e.g., 192.168.1.x)"} item={ioModule} property={"localIP"} index={index}/>
        <DropdownItem title={"Enter the PLC Opteration Mode (i.e., OpMode) of the module (e.g., 01, 02, 03, etc.)"} item={ioModule} property={"opMode"} options={ioModuleGroupOptions.opModeOptions} index={index}/>
        {ioModule.mioManufacturerName === "Balluff" && !ioModule.mioParts_Balluff === "BNI0052" &&
          <>
            <DropdownItem title={"Select the default port type for the module (manual configuration can be done at anytime):"} item={ioModule} property={"portTypeDefaultSelection"} options={ioModuleGroupOptions.portTypeDefaultSelectionOptions} index={index}/>
          </>
        }
        {ioModule.mioManufacturerName === "Balluff" && ioModule.mioParts_Balluff === "BNI0052" &&
          <>
            <DropdownItem title={"Select the default port type for the module (manual configuration can be done at anytime):"} item={ioModule} property={"portTypeDefaultSelection_Balluff_BNI0052"} options={ioModuleGroupOptions.portTypeDefaultSelection_Balluff_BNI0052Options} index={index}/>
          </>
        }
        <InputTextItem title={"************************************************************ Insert the IO Module table for editing of IO Ports & port pins and delete this InputTextItem ************************************************************"} item={ioModule} property={""} index={index}/>
        
        {/* Insert the IO Module table for editing of IO Ports & port pins */}
        {/* this is my try and creating a table for the IO Module, please change it as needed.
            I believe you are going to need a subcomponent of ioPorts called Pins as each port will 
            have 2 pins (pin4 and pin2). */}
    </div>
        {/* <div className="io-module-table">
          <table>
            <thead>
              <tr>
                <th>Port</th>
                <th>Type</th>
                <th>Is an IO-Link Module</th>
                <th>Inputs/Outputs Description</th>
                <th>PLC address</th>
                <th>Target part number</th>
                <th>Target LOCATION</th>
                <th>Target Device Tag</th>
              </tr>
            </thead>
            <tbody>
              {ioModule.ioPorts.map((port, portIndex) => (
                <tr key={portIndex}>
                  <td>{port.port}</td>
                  <td>{port.Type}</td>
                  <td>{port.isIOlinkModule ? "Yes" : "No"}</td> {/* Add a checkbox for IO-Link module */}{/*}
                  <td>{port.description}</td>
                  <td>{port.plcAddress}</td>
                  <td>{port.targetPartNumber}</td>
                  <td>{port.targetLocation}</td>
                  <td>{port.targetDeviceTag}</td>
                </tr>
              ))}
            </tbody>
          </table> 
          </div>*/}
        {/* Render a new subcomponent for the 1st IO-Link Slave for each port designated to have an IO-Link module.
            Within this new subcomponent there will be another subcomponent for the 2nd IO-Link Slave if required. */}
        
        
    </div>
  );
  };
  
  export default IO_ModuleConfiguration;