import DeviceSelection from "../Common/DeviceSelection";
import DropdownItem from "../Util/DropdownItem";
import { networkSwitchOptions } from "../../Store/networkSwitchStore";
import "../../Eec.css";

const McpLethPorts = ({ 
    mcpIndex,
    portIndex,
    port,
}) => {
  const index = {mcpIndex:mcpIndex, portIndex:portIndex};
  return (
      <div className="com-drop-item">
        <div className="com-drop-header">
          <h7>Port {portIndex+1}</h7>
          <DeviceSelection item={port} index={index} 
              deviceProperty={"targetDT"}
              stationProperty={"targetLocation"}
              type="networkTarget" canCreateDevice={true}
              portConfig ={{
                  title:"Select the port on the target switch this is connected to:",
                  property:"targetPort",
                  type:"network",
                  targetDT:port.targetDT,
                  targetLocation:port.targetLocation,
                  targetLine:port.line,
              }}/>    
            
          <DropdownItem title={"Cable length (m)"} item={port} property={"targetCableLength"}  options={networkSwitchOptions.cableLengthOptions} index={index}/>
        </div>
      </div>
    );
  };
  
  export default McpLethPorts;