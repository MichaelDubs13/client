import DeviceSelection from "../Common/DeviceSelection";
import DropdownItem from "../Util/DropdownItem";
import { networkSwitchConfiguration, networkSwitchOptions } from "../../Store/networkSwitchStore";
import "../../Eec.css";
import LineConfiguration from "../LineConfiguration";
import { lineConfiguration } from "../../Store/lineStore";

const McpLethPorts = ({ 
    mcpIndex,
    portIndex,
    port,
}) => {
  const index = {mcpIndex:mcpIndex, portIndex:portIndex};
  const portOptions = networkSwitchConfiguration.getNetworkDropPortOptions(8, 'Local', 'Unmanaged');
  
  return (
      <div className="com-drop-item">
        <div className="com-drop-header">
          <h7>Port {portIndex+5}</h7>
          <DeviceSelection item={port} index={index} 
              deviceTitle={"Target device tag (e.g., RBC01)"} deviceProperty={"targetDT"}
              stationTitle={"Target device location (e.g., 00010)"} stationProperty={"targetLocation"}/>    
            {
              port.targetDT?.startsWith(lineConfiguration.networkSwitchIndicator) && 
              <DropdownItem title={"Select the port on the target switch this is connected to:"} item={port} property={"targetPort"} options={portOptions} index={index}/>
            }
          <DropdownItem title={"Cable length (m)"} item={port} property={"targetCableLength"}  options={networkSwitchOptions.cableLengthOptions} index={index}/>
        </div>
      </div>
    );
  };
  
  export default McpLethPorts;