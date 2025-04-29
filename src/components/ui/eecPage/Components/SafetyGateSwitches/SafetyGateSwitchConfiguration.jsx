import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { safetyGateStore, safetyGateOptions } from "../../Store/safetyGateStore";
import DeviceSelection from "../Common/DeviceSelection";
import { useEffect, useState } from "react";
import PlcIDSelection from "../Common/PlcIDSelection";
import { lineConfiguration } from "../../Store/lineStore";
import NetworkPortSelection from "../Common/NetworkPortSelection";

const SafetyGateSwitchConfiguration = ({ 
  safetyGateIndex,
  safetyGateSwitchIndex,
  safetyGateSwitch,
  createNew,
}) => {
  const safetyGatesOptions = safetyGateStore((state) => state.safetyGatesOptions);
  const index = createNew ? {} : {safetyGateIndex:safetyGateIndex, safetyGateSwitchIndex:safetyGateSwitchIndex};
 
  return (
    <div className="safety-gate-switch-configuration">
      <div className="safety-gate-switch-settings">
        <DeviceSelection item={safetyGateSwitch} index={index} 
            stationTitle={"Safety Gate Switches Location (i.e., Station number) (e.g., 00010)"} stationProperty={"location"}
            deviceTitle={"Target device tag (e.g., GS01)"} deviceProperty={"deviceTag"}/>
        <DropdownItem title={"Gate switch type:"} item={safetyGateSwitch} property={"safetyGateSwitchType"} options={safetyGateOptions.gateSwitchTypeOptions} index={index}/>
        <DropdownItem title={"Left or Right handed gate switch?"} item={safetyGateSwitch} property={"safetyGateSwitchHandle"} options={safetyGateOptions.gateSwitchHandleOptions} index={index}/>
        <PlcIDSelection item={safetyGateSwitch} title={"Safety Gate Switch controlled by PLC ID:"} index={index}/>
        <InputTextItem title={"Local IP address (e.g., 192.168.1.x)"} item={safetyGateSwitch} property={"localIP"} index={index}/>
        <CheckboxItem title={"Check if this gate switch gets power and/or network from another gate switch in this configuration:"} item={safetyGateSwitch} property={"gateSwitchCascadingFrom"} index={index}/>
        {!safetyGateSwitch.gateSwitchCascadingFrom &&
          <>
            <DeviceSelection item={safetyGateSwitch} index={index}
                deviceTitle={"Power source Device Tag (e.g., PSU01)"} deviceProperty={"powerSourceDT"}
                stationTitle={"Power source LOCATION (i.e., Station number) (e.g., 00010)"} stationProperty={"powerSourceLocation"}
                lineTitle={"Power source LINE (e.g., UBM1)"} lineProperty={"powerSourceLine"}/>
            <DeviceSelection item={safetyGateSwitch} index={index}
                deviceTitle={"Network source Device Tag (e.g., LETH01)"} deviceProperty={"ethernetSourceDT"}
                stationTitle={"Network source LOCATION (i.e., Station number) (e.g., 00010)"} stationProperty={"ethernetSourceLocation"}
                lineTitle={"Network source LINE (e.g., UBM1)"} lineProperty={"ethernetSourceLine"}/>    
            <NetworkPortSelection title={"Select the network port of the network switch (e.g., 1)"} item={safetyGateSwitch} 
                index={safetyGateSwitchIndex} property={"ethernetSourceDevicePort"} targetDT={safetyGateSwitch.ethernetSourceDT} targetLocation={safetyGateSwitch.ethernetSourceLocation} targetLine={safetyGateSwitch.line}/>
          </>
        }

        <CheckboxItem title={"Check if this gate switch is a power and/or network source for another gate switch in this configuration:"} item={safetyGateSwitch} property={"gateSwitchCascadingTo"} index={index}/>
        {safetyGateSwitch.gateSwitchCascadingTo &&
          <>
            <DropdownItem title={"Select which gate switch this port is the source for:"} item={safetyGateSwitch} property={"safetyGateCascadingToSelection"} 
              options={safetyGatesOptions} index={index}/>
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
                <NetworkPortSelection title={"Select the network port of the network switch (e.g., 1)"} item={safetyGateSwitch} 
                    index={safetyGateSwitchIndex} property={"ethernetTargetDevicePort"} targetDT={safetyGateSwitch.ethernetTargeteDT} targetLocation={safetyGateSwitch.ethernetTargetLocation} targetLine={safetyGateSwitch.line}/>
              
              </>
            }
          </>
        }
      </div>
    </div>
  );
  };
  
  export default SafetyGateSwitchConfiguration;