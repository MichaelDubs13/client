import DeviceSelection from "../Common/DeviceSelection";
import DropdownItem from "../Util/DropdownItem";
import { networkSwitchOptions } from "../../Store/networkSwitchStore";
import "../../Eec.css";
import NetworkPortSelection from "../Common/NetworkPortSelection";

const McpLethPorts = ({ 
    mcpIndex,
    portIndex,
    port,
}) => {
  const index = {mcpIndex:mcpIndex, portIndex:portIndex};

  return (
      <div className="com-drop-item">
        <div className="com-drop-header">
          <h7>Port {portIndex+5}</h7>
          <DeviceSelection item={port} index={index} 
              deviceTitle={"Target device tag (e.g., RBC01)"} deviceProperty={"targetDT"}
              stationTitle={"Target device location (e.g., 00010)"} stationProperty={"targetLocation"}/>    
            
          <NetworkPortSelection title={"Select the port on the target switch this is connected to:"} item={port} 
                    index={index} property={"targetPort"} targetDT={port.targetDT} targetLocation={port.targetLocation} targetLine={port.line}/>
          <DropdownItem title={"Cable length (m)"} item={port} property={"targetCableLength"}  options={networkSwitchOptions.cableLengthOptions} index={index}/>
        </div>
      </div>
    );
  };
  
  export default McpLethPorts;