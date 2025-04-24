import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { safetyGateStore, safetyGateOptions } from "../../Store/safetyGateStore";
import DeviceSelection from "../Common/DeviceSelection";
import { useEffect, useState } from "react";
import { mcpStore } from "../../Store/mcpStore";
import { lineStore } from "../../Store/lineStore";

const SafetyGateSwitchConfiguration = ({ 
  safetyGateIndex,
  safetyGateSwitchIndex,
  safetyGateSwitch,
}) => {
  const mcps = mcpStore((state)=>state.mcps)
  const safetyGates = safetyGateStore((state) => state.safetyGates);
  const safetyGatesOptions = safetyGateStore((state) => state.safetyGatesOptions);
  const index = {safetyGateIndex:safetyGateIndex, safetyGateSwitchIndex:safetyGateSwitchIndex};
  const [safetyGateSwitchOptions, setSafetyGateSwitchOptions] = useState([]) 
  const getPlcOptions = lineStore((state)=> state.getPlcOptions)
  const plcs = lineStore((state)=> state.plcs)
  useEffect(() => {
    getPlcOptions();
    if(mcps.length === 1){
      safetyGateSwitch.setValue(index, "plcID", mcps[0].getPlc())
    }
}, [mcps]);

  useEffect(() => {
    const targetGateSwitch = safetyGates.find(safetyGate => safetyGate.getFullName() === safetyGateSwitch.selectedGateSwitch);
    if(targetGateSwitch){
      setSafetyGateSwitchOptions(targetGateSwitch.getSafetyGateSwitchOptions());
    }
  }, [safetyGateSwitch.selectedGateSwitch]);


  return (
    <div className="safety-gate-switch-configuration">
      <div className="safety-gate-switch-settings">
        <DeviceSelection item={safetyGateSwitch} index={index} 
            stationTitle={"Safety Gate Switches Location (i.e., Station number) (e.g., 00010)"} stationProperty={"location"}
            deviceTitle={"Target device tag (e.g., RBC01)"} deviceProperty={"targetDT"}/>
        <DropdownItem title={"Gate switch type:"} item={safetyGateSwitch} property={"safetyGateSwitchType"} options={safetyGateOptions.gateSwitchTypeOptions} index={index}/>
        <DropdownItem title={"Left or Right handed gate switch?"} item={safetyGateSwitch} property={"safetyGateSwitchHandle"} options={safetyGateOptions.gateSwitchHandleOptions} index={index}/>
        <DropdownItem title={"Safety Gate Switch controlled by PLC ID:"} item={safetyGateSwitch} property={"plcID"} options={plcs} index={index}/>
        <InputTextItem title={"Local IP address (e.g., 192.168.1.x)"} item={safetyGateSwitch} property={"localIP"} index={index}/>
        <CheckboxItem title={"Check if this gate switch gets power and/or network from another gate switch in this configuration:"} item={safetyGateSwitch} property={"gateSwitchCascadingFrom"} index={index}/>
        {!safetyGateSwitch.gateSwitchCascadingFrom &&
          <>
            <DeviceSelection item={safetyGateSwitch} index={index}
                deviceTitle={"Power source Device Tag (e.g., PSU01)"} deviceProperty={"powerSourceDT"}
                stationTitle={"Power source LOCATION (i.e., Station number) (e.g., 00010)"} stationProperty={"powerSourceLocation"}
                lineTitle={"Power source LINE (e.g., UBM1)"} lineProperty={"powerSourceLine"}/>
            <DeviceSelection item={safetyGateSwitch} index={index}
                deviceTitle={"Network source Device Tag (e.g., PSU01)"} deviceProperty={"ethernetSourceDT"}
                stationTitle={"Network source LOCATION (i.e., Station number) (e.g., 00010)"} stationProperty={"ethernetSourceLocation"}
                lineTitle={"Network source LINE (e.g., UBM1)"} lineProperty={"ethernetSourceLine"}/>    
                {/* need to include the device port dropdown here */}
                {safetyGateSwitch.ethernetSourceDT?.startsWith("LETH") && (
                    <>
                        <InputTextItem title={"Select the network port of the network switch (e.g., 1)"} item={safetyGateSwitch} index={safetyGateSwitchIndex} property={"ethernetSourceDevicePort"}/>
                    </>
                )}
          </>
        }

        <CheckboxItem title={"Check if this gate switch is a power and/or network source for another gate switch in this configuration:"} item={safetyGateSwitch} property={"gateSwitchCascadingTo"} index={index}/>
        {safetyGateSwitch.gateSwitchCascadingTo &&
          <>
            <DropdownItem title={"Select which gate switch this port is the source for:"} item={safetyGateSwitch} property={"safetyGateCascadingToSelection"} options={safetyGatesOptions} index={index}/>
          </>
        }
        {!safetyGateSwitch.gateSwitchCascadingTo &&
          <>
            <CheckboxItem title={"Check if this gate switch is providing power and network to another device:"} item={safetyGateSwitch} property={"safetyGateCascadingToOutside"} index={index}/>
            {safetyGateSwitch.safetyGateCascadingToOutside &&
              <>
                <DeviceSelection item={safetyGateSwitch} index={index}
                    deviceTitle={"Power target Device Tag (e.g., PSU01)"} deviceProperty={"powerTargetDT"}
                    stationTitle={"Power target LOCATION (i.e., Station number) (e.g., 00010)"} stationProperty={"powerTargetLocation"}
                    lineTitle={"Power target LINE (e.g., UBM1)"} lineProperty={"powerTargetLine"}/>
                <DeviceSelection item={safetyGateSwitch} index={index}
                    deviceTitle={"Network target Device Tag (e.g., PSU01)"} deviceProperty={"ethernetTargetDT"}
                    stationTitle={"Network target LOCATION (i.e., Station number) (e.g., 00010)"} stationProperty={"ethernetTargetLocation"}
                    lineTitle={"Network target LINE (e.g., UBM1)"} lineProperty={"ethernetTargetLine"}/>    
                    {/* need to include the device port dropdown here */}
                    {safetyGateSwitch.ethernetTargeteDT?.startsWith("LETH") && (
                    <>
                        <InputTextItem title={"Select the network port of the network switch (e.g., 1)"} item={safetyGateSwitch} index={safetyGateSwitchIndex} property={"ethernetTargetDevicePort"}/>
                    </>
                )}
              </>
            }
          </>
        }
      </div>
    </div>
  );
  };
  
  export default SafetyGateSwitchConfiguration;