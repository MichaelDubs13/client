import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { networkSwitchStore } from '../../Store/networkSwitchStore';
import { networkSwitchOptions } from "../../Store/networkSwitchStore";
import StationSelection from "../Common/StationSelection";
import DeviceSelection from "../Common/DeviceSelection";

const NetworkSwitchPort = ({ 
  networkSwitchIndex,
  portIndex,
  port,
}) => {
  
  const setPortValue = networkSwitchStore((state) => state.setPortValue);
  const index = {networkSwitchIndex:networkSwitchIndex, portIndex:portIndex};


  return (
    <div className="network-switch-port">
      <div className="port-settings">
        <DropdownItem title={"Device type:"} placeHolder={port.deviceTypeSelection} options={networkSwitchOptions.deviceTypeSelectionOptions} setModelValue={setPortValue} index={index} property={"deviceTypeSelection"}/>
        {port.deviceTypeSelection === "Device" && 
          <>
            <StationSelection title={"Device target location (i.e., Station number) (e.g., 00010)"} item={port} setModelValue={setPortValue} index={index} property={"targetLocation"}/>    
            <DeviceSelection title={"Target device tag (e.g., RBC01)"} item={port} setModelValue={setPortValue} index={index} property={"targetDT"} station={port.targetLocation}/>    
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
                <StationSelection title={"Device target location (i.e., Station number) (e.g., 00010)"} item={port} setModelValue={setPortValue} index={index} property={"targetLocation"}/>    
                <DeviceSelection title={"Target device tag (e.g., RBC01)"} item={port} setModelValue={setPortValue} index={index} property={"targetDT"} station={port.targetLocation}/>    
              </>
            }
            {(port.communicationFlow === "Out" && port.cascadingSwitch) &&
              <>
                <DropdownItem title={"Select which network switch this port is the source for:"} placeHolder={port.selectedSwitchb} options={networkSwitchOptions.connectedDeviceOptions} setModelValue={setPortValue} index={index} property={"selectedSwitch"}/>
                <DropdownItem title={"Select the port on the target switch this is connected to:"} placeHolder={port.targetPort} options={networkSwitchOptions.targetPortOptions} setModelValue={setPortValue} index={index} property={"targetPort"}/>
                <DropdownItem title={"Cable length (m)"} placeHolder={port.targetCableLength} options={networkSwitchOptions.cableLengthOptions} setModelValue={setPortValue} index={index} property={"targetCableLength"}/>
              </>
            }
            {(port.communicationFlow === "Out" && !port.cascadingSwitch) &&
            <>
                <StationSelection title={"Device target location (i.e., Station number) (e.g., 00010)"} item={port} setModelValue={setPortValue} index={index} property={"targetLocation"}/>    
                <DeviceSelection title={"Target device tag (e.g., RBC01)"} item={port} setModelValue={setPortValue} index={index} property={"targetDT"} station={port.targetLocation}/>    
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