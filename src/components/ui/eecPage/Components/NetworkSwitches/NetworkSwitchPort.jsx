import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { networkSwitchStore } from '../../Store/networkSwitchStore';
import { networkSwitchOptions } from "../../Store/networkSwitchStore";
import { networkSwitchConfiguration } from "../../Store/networkSwitchStore";

  const NetworkSwitchPort = ({ 
  networkSwitchIndex,
  portIndex,
  setPortValue,
  ports,
}) => {
  const index = {networkSwitchIndex:networkSwitchIndex, portIndex:portIndex, ports:ports}
  
  return (
    <div className="network-switch-port">
      <div className="port-settings">
        <DropdownItem title={"Device type:"} placeHolder={networkSwitchIndex.ports.deviceTypeSelection} options={networkSwitchOptions.deviceTypeSelectionOptions} setModelValue={setPortValue} index={index} property={"deviceTypeSelection"}/>
        {networkSwitchIndex.deviceTypeSelection === "Device" && (
          <>
            <InputTextItem title={"Device target location (i.e., Station number) (e.g., 00010)"} placeHolder={networkSwitchIndex.ports.targetLocation} setModelValue={setPortValue} index={index} property={"targetLocation"}/>
            <InputTextItem title={"Target device tag (e.g., RBC01)"} placeHolder={networkSwitchIndex.ports.targetDT} setModelValue={setPortValue} index={index} property={"targetDT"}/>
            <DropdownItem title={"Cable length (m)"} placeHolder={networkSwitchIndex.ports.targetCableLength} options={networkSwitchOptions.cableLengthOptions} setModelValue={setPortValue} index={index} property={"targetCableLength"}/>
            </>
        )}
        {networkSwitchIndex.deviceTypeSelection === "Network Switch" && (
          <>
            <DropdownItem title={"Does the connection flow into or out of this switch?"} placeHolder={networkSwitchIndex.ports.communicationFlow} options={networkSwitchOptions.communicationFlowOptions} setModelValue={setPortValue} index={index} property={"communicationFlow"}/>
            <CheckboxItem title={"Is this port connected to another switch in this configuration?"} placeHolder={networkSwitchIndex.ports.cascadingSwitch} setModelValue={setPortValue} index={index} property={"cascadingSwitch"}/>
            {networkSwitchIndex.ports.communciationFlow === "In" && networkSwitchIndex.ports.cascadingSwitch (
              <>
                <InputTextItem title={"This network port is connected to:"} placeHolder={networkSwitchIndex.ports.connectedDevice} setModelValue={setPortValue} index={index} property={"connectedDevice"}/>
              </>
            )}
            {networkSwitchIndex.ports.communciationFlow === "In" && !networkSwitchIndex.ports.cascadingSwitch (
              <>
                <InputTextItem title={"Device target location (i.e., Station number) (e.g., 00010)"} placeHolder={networkSwitchIndex.ports.targetLocation} setModelValue={setPortValue} index={index} property={"targetLocation"}/>
                <InputTextItem title={"Target device tag (e.g., RBC01)"} placeHolder={networkSwitchIndex.ports.targetDT} setModelValue={setPortValue} index={index} property={"targetDT"}/>
              </>
            )}
            {networkSwitchIndex.ports.communciationFlow === "Out" && networkSwitchIndex.ports.cascadingSwitch (
              <>
                <DropdownItem title={"Select which network switch this port is the source for:"} placeHolder={networkSwitchIndex.ports.selectedSwitchb} options={networkSwitchOptions.connectedDeviceOptions} setModelValue={setPortValue} index={index} property={"selectedSwitch"}/>
                <DropdownItem title={"Select the port on the target switch this is connected to:"} placeHolder={networkSwitchIndex.ports.targetPort} options={networkSwitchOptions.targetPortOptions} setModelValue={setPortValue} index={index} property={"targetPort"}/>
                <DropdownItem title={"Cable length (m)"} placeHolder={networkSwitchIndex.ports.targetCableLength} options={networkSwitchOptions.cableLengthOptions} setModelValue={setPortValue} index={index} property={"targetCableLength"}/>
              </>
            )}
            {networkSwitchIndex.ports.communciationFlow === "Out" && !networkSwitchIndex.ports.cascadingSwitch (
              <>
                <InputTextItem title={"Device target location (i.e., Station number) (e.g., 00010)"} placeHolder={networkSwitchIndex.ports.targetLocation} setModelValue={setPortValue} index={index} property={"targetLocation"}/>
                <InputTextItem title={"Target device tag (e.g., RBC01)"} placeHolder={networkSwitchIndex.ports.targetDT} setModelValue={setPortValue} index={index} property={"targetDT"}/>
                <DropdownItem title={"Cable length (m)"} placeHolder={networkSwitchIndex.ports.targetCableLength} options={networkSwitchOptions.cableLengthOptions} setModelValue={setPortValue} index={index} property={"targetCableLength"}/>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
  };
  
  export default NetworkSwitchPort;