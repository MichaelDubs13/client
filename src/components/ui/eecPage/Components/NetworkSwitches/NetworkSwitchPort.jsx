import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { networkSwitchStore,networkSwitchOptions} from '../../Store/networkSwitchStore';
import DeviceSelection from "../Common/DeviceSelection";
import { useEffect, useState } from "react";

const NetworkSwitchPort = ({ 
  networkSwitchIndex,
  portIndex,
  port,
  createNew,
}) => {
  const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
  const networkSwitchesOptions = networkSwitchStore((state) => state.networkSwitchesOptions);
  const networkSwitcheWithPortsOptions = networkSwitchStore((state) => state.networkSwitcheWithPortsOptions);
  const index = createNew? {portIndex:portIndex} : {networkSwitchIndex:networkSwitchIndex, portIndex:portIndex};
  const [portOptions, setPortOptions] = useState([]) 

  useEffect(() => {
    const targetSwitch = networkSwitches.find(networkSwitch => networkSwitch.getFullName() === port.selectedSwitch);
    if(targetSwitch){
      setPortOptions(targetSwitch.getPortOptions());
    }
  }, [port.selectedSwitch]);


  return (
    <div className="network-switch-port">
      <div className="port-settings">
        <DropdownItem title={"Device type:"} item={port} property={"deviceTypeSelection"} options={networkSwitchOptions.deviceTypeSelectionOptions} index={index}/>
        {port.deviceTypeSelection === "Device" && 
          <>
            <DeviceSelection item={port} index={index} 
              deviceProperty={"targetDT"}
              stationProperty={"targetLocation"}
              type="networkTarget" canCreateDevice={true}/>    
            <DropdownItem title={"Cable length (m)"} item={port} property={"targetCableLength"} options={networkSwitchOptions.cableLengthOptions} index={index}/>
            </>
        }
        {port.deviceTypeSelection === "Network Switch" && 
          <>
            <DropdownItem title={"Does the connection flow into or out of this switch?"} item={port} property={"communicationFlow"} options={networkSwitchOptions.communicationFlowOptions} index={index}/>
            <CheckboxItem title={"Is this port connected to another switch in this configuration?"} item={port} property={"cascadingSwitch"} index={index}/>
            {port.communicationFlow === "In" && port.cascadingSwitch &&
              <>
                <DropdownItem title={"This network port is connected to:"} item={port} property={"connectedDevice"} options={networkSwitcheWithPortsOptions} index={index}/>
              </>
            }
            {(port.communicationFlow === "In" && !port.cascadingSwitch) &&
              <>
                <DeviceSelection item={port} index={index} 
                  deviceProperty={"targetDT"}
                  stationProperty={"targetLocation"}
                  type="networkTarget" canCreateDevice={true}/>    
              </>
            }
            {(port.communicationFlow === "Out" && port.cascadingSwitch) &&
              <>
                <DropdownItem title={"Select which network switch this port is the source for:"} item={port} property={"selectedSwitch"} options={networkSwitchesOptions} index={index}/>
                <DropdownItem title={"Select the port on the target switch this is connected to:"} item={port} property={"targetPort"} options={portOptions} index={index}/>
                <DropdownItem title={"Cable length (m)"} item={port} property={"targetCableLength"}  options={networkSwitchOptions.cableLengthOptions} index={index}/>
              </>
            }
            {(port.communicationFlow === "Out" && !port.cascadingSwitch) &&
            <>  
                <DeviceSelection item={port} index={index} 
                  deviceProperty={"targetDT"}
                  stationProperty={"targetLocation"}
                  type="networkTarget" canCreateDevice={true}/>    
                <DropdownItem title={"Cable length (m)"} item={port} property={"targetCableLength"}  options={networkSwitchOptions.cableLengthOptions} index={index}/>
              </>
            }
          </>
        }
      </div>
    </div>
  );
  };
  
  export default NetworkSwitchPort;