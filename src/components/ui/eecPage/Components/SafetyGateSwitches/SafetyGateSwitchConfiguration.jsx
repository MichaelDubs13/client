import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { safetyGateStore, safetyGateOptions } from "../../Store/safetyGateStore";
import DeviceSelection from "../Common/DeviceSelection";
import PlcIDSelection from "../Common/PlcIDSelection";
import { isValidIP } from "../Util/Validations";

const SafetyGateSwitchConfiguration = ({ 
  safetyGateIndex,
  safetyGateSwitchIndex,
  safetyGateSwitch,
  createNew,
}) => {
  const safetyGatesOptions = safetyGateStore((state) => state.safetyGatesOptions);
  const index = createNew ? {} : {safetyGateIndex:safetyGateIndex, safetyGateSwitchIndex:safetyGateSwitchIndex};
  const manufacturer = 'Euchner';
  const partNumber = safetyGateSwitch.safetyGateSwitchHandle === "Right" ? '168719' : '168720';
  return (
    <div>
        <div style={{display:'grid', gridTemplateColumns:'1100px auto'}} >
            <div style={{gridColumn:1,gridRow:1}}>
                <DeviceSelection item={safetyGateSwitch} index={index} 
                            stationProperty={"location"}
                            deviceProperty={"deviceTag"}/>
            </div>
            <div style={{gridColumn:1,gridRow:2}}>
                <DropdownItem title={"Gate switch type:"} item={safetyGateSwitch} property={"safetyGateSwitchType"} options={safetyGateOptions.gateSwitchTypeOptions} index={index}/>
            </div>
            <div style={{gridColumn:1,gridRow:3}}>
                <DropdownItem title={"Left or Right handed gate switch?"} item={safetyGateSwitch} property={"safetyGateSwitchHandle"} options={safetyGateOptions.gateSwitchHandleOptions} index={index}/>
            </div>
            <div style={{gridColumn:2,gridRow:'span 3'}}>
                <img src={`/DeviceImages/${manufacturer}/${partNumber}.jpg`} style={{width:'250px', height:'200px'}}/>
            </div>
        </div>
       
        <PlcIDSelection item={safetyGateSwitch} title={"Safety Gate Switch controlled by PLC ID:"} index={index}/>
        <InputTextItem title={"Local IP address (e.g., 192.168.1.x)"} item={safetyGateSwitch} property={"localIP"} index={index} validation={isValidIP}/>
        <CheckboxItem title={"Check if this gate switch gets power and/or network from another gate switch in this configuration:"} item={safetyGateSwitch} property={"gateSwitchCascadingFrom"} index={index}/>
        {!safetyGateSwitch.gateSwitchCascadingFrom &&
          <>
            <DeviceSelection item={safetyGateSwitch} index={index}
                deviceProperty={"powerSourceDT"}
                stationProperty={"powerSourceLocation"}
                lineProperty={"powerSourceLine"}
                type="powerSource"/>
            <DeviceSelection item={safetyGateSwitch} index={index}
                deviceProperty={"ethernetSourceDT"}
                stationProperty={"ethernetSourceLocation"}
                lineProperty={"ethernetSourceLine"}
                type="networkSource"
                portConfig ={{
                  title:"Select the network port of the network switch (e.g., 1)",
                  property:"ethernetSourceDevicePort",
                  type:"network",
                  targetDT:safetyGateSwitch.ethernetSourceDT,
                  targetLocation:safetyGateSwitch.ethernetSourceLocation,
                  targetLine:safetyGateSwitch.line,
                  createNew:createNew
              }}/>    
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
                    deviceProperty={"powerTargetDT"}
                    stationProperty={"powerTargetLocation"}
                    lineProperty={"powerTargetLine"}
                    type="powerTarget"/>
                <DeviceSelection item={safetyGateSwitch} index={index}
                    deviceProperty={"ethernetTargetDT"}
                    stationProperty={"ethernetTargetLocation"}
                    lineProperty={"ethernetTargetLine"}
                    type="networkTarget"
                    portConfig ={{
                    title:"Select the network port of the network switch (e.g., 1)",
                    property:"ethernetTargetDevicePort",
                    type:"network",
                    targetDT:safetyGateSwitch.ethernetTargeteDT,
                    targetLocation:safetyGateSwitch.ethernetTargetLocation,
                    targetLine:safetyGateSwitch.line,
                    createNew:createNew
                }}/>    
              </>
            }
          </>
        }
    </div>
  );
  };
  
  export default SafetyGateSwitchConfiguration;