import {mcpStore} from "../../Store/mcpStore";
import { FormItem, FormLabel, FormInputDropdown } from "@tesla/design-system-react";
import McpLethPorts from "./McpLethPorts";
import DropdownItem from "../Util/DropdownItem";
import { mcpOptions } from "../../Store/mcpStore";
import { networkSwitchConfiguration } from "../../Store/networkSwitchStore";
import DeviceSelection from "../Common/DeviceSelection";
import "../../Eec.css";

const LethPortConfiguration = ({mcp, index}) => {
    const setNumberOfLethPorts = mcpStore((state) => state.setNumberOfLethPorts);
    const mcpIndex = {mcpIndex:index}
    const portOptions = networkSwitchConfiguration.getNetworkDropPortOptions(8, 'Local', 'Unmanaged');
    const lethNumberOfPortOptions = [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
      ];
    const handleSetlethNumberOfPortsChange = (event)=>{
        const value = event.value;
        setNumberOfLethPorts(mcpIndex, value);
    }
    
    return ( 
         <div>
            <FormItem className="form-item">
                <FormLabel className="form-label" htmlFor="context">Enter the number of device connections required for this line (i.e., Total number of devices)</FormLabel>
                <FormInputDropdown
                id="context"
                options={lethNumberOfPortOptions}
                placeholder={mcp.ports.length}
                selected={mcp.ports.length}
                onOptionSelect={handleSetlethNumberOfPortsChange}/>
            </FormItem>

            {/* Need to insert the remaining 0-9 port inputs based on the number of ports selected in the previous question*/}
            {/* Render all LETH ports*/}
            <div>
                <h7>Port 2</h7>
                <DeviceSelection item={mcp} index={mcpIndex} 
                    deviceTitle={"Target device (e.g., LETH01)"} deviceProperty={"leth_port2_target_dt"}
                    stationTitle={"Target location (e.g., 00010)"} stationProperty={"leth_port2_target_location"}/>   
                <DropdownItem title={"Target port ID (e.g., P1)"} item={mcp} property={"leth_port2_target_port"} options={portOptions} index={mcpIndex}/>
                <DropdownItem title={"Cable length (m)"} item={mcp} property={"gb_Port2_CableLength"} options={mcpOptions.cableLengthOptions} index={mcpIndex}/>
            </div>  
            
            
            <div>
                <h7>Port 3</h7>
                <DeviceSelection item={mcp} index={mcpIndex} 
                    deviceTitle={"Target device (e.g., LETH01)"} deviceProperty={"leth_port3_target_dt"}
                    stationTitle={"Target location (e.g., 00010)"} stationProperty={"leth_port3_target_location"}/>   
                <DropdownItem title={"Target port ID (e.g., P1)"} item={mcp} property={"leth_port3_target_port"} options={portOptions} index={mcpIndex}/>
                <DropdownItem title={"Cable length (m)"} item={mcp} property={"gb_Port3_CableLength"} options={mcpOptions.cableLengthOptions} index={mcpIndex}/>
            </div>
            
            <div>
                <h7>Port 4</h7>
                <DeviceSelection item={mcp} index={mcpIndex} 
                    deviceTitle={"Target device (e.g., LETH01)"} deviceProperty={"leth_port4_target_dt"}
                    stationTitle={"Target location (e.g., 00010)"} stationProperty={"leth_port4_target_location"}/>
                <DropdownItem title={"Target port ID (e.g., P1)"} item={mcp} property={"leth_port4_target_port"} options={portOptions} index={mcpIndex}/>   
                <DropdownItem title={"Cable length (m)"} item={mcp} property={"gb_Port4_CableLength"} options={mcpOptions.cableLengthOptions} index={mcpIndex}/>
            </div>
            {
                mcp.ports.map((port,index) => {
                    return <McpLethPorts
                        mcpIndex={mcpIndex}
                        portIndex={index}
                        port={port}
                    />
                })
            }
        </div>
    );
};
export default LethPortConfiguration;