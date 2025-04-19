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
}) => {
  const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
  const setPortValue = networkSwitchStore((state) => state.setPortValue);
  const networkSwitchesOptions = networkSwitchStore((state) => state.networkSwitchesOptions);
  const index = {networkSwitchIndex:networkSwitchIndex, portIndex:portIndex};
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
        <DropdownItem title={"Device type:"} placeHolder={port.deviceTypeSelection} options={networkSwitchOptions.deviceTypeSelectionOptions} setModelValue={setPortValue} index={index} property={"deviceTypeSelection"}/>
        {port.deviceTypeSelection === "Device" && 
          <>
            <DeviceSelection item={port} setModelValue={setPortValue} index={index} 
              deviceTitle={"Target device tag (e.g., RBC01)"} deviceProperty={"targetDT"}
              stationTitle={"Device target location (i.e., Station number) (e.g., 00010)"} stationProperty={"targetLocation"}/>    
            <DropdownItem title={"Cable length (m)"} placeHolder={port.targetCableLength} options={networkSwitchOptions.cableLengthOptions} setModelValue={setPortValue} index={index} property={"targetCableLength"}/>
            </>
        }
        {port.deviceTypeSelection === "Network Switch" && 
          <>
            <DropdownItem title={"Does the connection flow into or out of this switch?"} placeHolder={port.communicationFlow} options={networkSwitchOptions.communicationFlowOptions} setModelValue={setPortValue} index={index} property={"communicationFlow"}/>
            <CheckboxItem title={"Is this port connected to another switch in this configuration?"} placeHolder={port.cascadingSwitch} setModelValue={setPortValue} index={index} property={"cascadingSwitch"}/>
            {port.communicationFlow === "In" &&
              <>
                <InputTextItem title={"This network port is connected to:"} placeHolder={port.connectedDevice} setModelValue={setPortValue} index={index} property={"connectedDevice"}/>
              </>
            }
            {(port.communicationFlow === "In" && !port.cascadingSwitch) &&
              <>
                <DeviceSelection item={port} setModelValue={setPortValue} index={index} 
                  deviceTitle={"Target device tag (e.g., RBC01)"} deviceProperty={"targetDT"}
                  stationTitle={"Device target location (i.e., Station number) (e.g., 00010)"} stationProperty={"targetLocation"}/>    
              </>
            }
            {(port.communicationFlow === "Out" && port.cascadingSwitch) &&
              <>
                <DropdownItem title={"Select which network switch this port is the source for:"} placeHolder={port.selectedSwitch} options={networkSwitchesOptions} setModelValue={setPortValue} index={index} property={"selectedSwitch"}/>
                <DropdownItem title={"Select the port on the target switch this is connected to:"} placeHolder={port.targetPort} options={portOptions} setModelValue={setPortValue} index={index} property={"targetPort"}/>
                <DropdownItem title={"Cable length (m)"} placeHolder={port.targetCableLength} options={networkSwitchOptions.cableLengthOptions} setModelValue={setPortValue} index={index} property={"targetCableLength"}/>
              </>
            }
            {(port.communicationFlow === "Out" && !port.cascadingSwitch) &&
            <>  
                <DeviceSelection item={port} setModelValue={setPortValue} index={index} 
                  deviceTitle={"Target device tag (e.g., RBC01)"} deviceProperty={"targetDT"}
                  stationTitle={"Device target location (i.e., Station number) (e.g., 00010)"} stationProperty={"targetLocation"}/>    
                <DropdownItem title={"Cable length (m)"} placeHolder={port.targetCableLength} options={networkSwitchOptions.cableLengthOptions} setModelValue={setPortValue} index={index} property={"targetCableLength"}/>
              </>
            }
          </>
        }
      </div>
    </div>
  );
  };
  
  export default NetworkSwitchPort;