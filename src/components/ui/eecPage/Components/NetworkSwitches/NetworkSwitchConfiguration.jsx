import "../../Eec.css";
import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import NetworkSwitchPortConfiguration from './NetworkSwitchPortConfiguration';
import { networkSwitchOptions, networkSwitchStore } from '../../Store/networkSwitchStore';
import DeviceSelection from '../Common/DeviceSelection';
import { mcpStore } from '../../Store/mcpStore';
import { useEffect } from 'react';
import { lineStore } from '../../Store/lineStore';
import { isValidIP } from "../Util/Validations";

const NetworkSwitchConfiguration = ({networkSwitch, index, createNew}) => {
    const mcps = mcpStore((state)=> state.mcps);
    const plcs = lineStore((state)=> state.plcs);
    const getPlcOptions = lineStore((state)=> state.getPlcOptions);
    const setNumberOfPorts = networkSwitchStore((state) => state.setNumberOfPorts);  
    const networkSwitchIndex = createNew ? {} : {networkSwitchIndex:index}
    const manufacturer = 'Siemens';
    const partNumber = networkSwitch.ports.length === 8 ? '6GK52080HA002AS6_001_V_O' : '6GK52160HA002AS6_001_V_O';
    useEffect(() => {
        getPlcOptions();
        if(mcps.length === 1){
            networkSwitch.setValue(networkSwitchIndex, "plcID", mcps[0].getPlc())
        }
    }, [mcps]);
    
    const setPorts = (value) =>{
        setNumberOfPorts(index, value);   
    }

    return (
        
        <div>
            <div>
                    <div style={{display:'grid', gridTemplateColumns:'1100px auto'}} >
                        <div style={{gridColumn:1,gridRow:1}}>
                            <DeviceSelection item={networkSwitch} index={networkSwitchIndex}
                                deviceProperty={"deviceTag"}
                                stationProperty={"location"}/> 
                        </div>
                        <div style={{gridColumn:1,gridRow:2}}>
                             <DropdownItem title={"Network switch is controlled by PLC ID"} item={networkSwitch} options={plcs} index={networkSwitchIndex} property={"plcID"}/>
                        </div>
                        <div style={{gridColumn:1,gridRow:3}}>
                            <DropdownItem title={"Network type"} item={networkSwitch} property={"networkType"} 
                                options={networkSwitchOptions.networkTypeOptions} onChange={setPorts} index={networkSwitchIndex}/>
                        </div>
                        <div style={{gridColumn:2,gridRow:'span 3'}}>
                            <img src={`/DeviceImages/${manufacturer}/${partNumber}.jpg`} style={{width:'250px', height:'200px'}}/>
                        </div>
                    </div>
                    <InputTextItem title={"Local IP address (e.g., 192.168.1.x)"} item={networkSwitch} index={networkSwitchIndex} property={"localIP"} validation={isValidIP}/>
                    <InputTextItem title={"Plant IP address (e.g., 10.x.x.x)"} item={networkSwitch} index={networkSwitchIndex} property={"plantIP"} validation={isValidIP}/>
                    
                    {networkSwitch.networkType === "Local" && (
                        <>
                            <DropdownItem title={"Switch type"} item={networkSwitch} property={"switchType"} options={networkSwitchOptions.switchTypeOptions} 
                                onChange={setPorts} index={networkSwitchIndex} />
                        </>
                    )}

                    {networkSwitch.networkType === "Plant" && (
                        <>
                            <DropdownItem title={"Switch speed"} item={networkSwitch} property={"switchSpeed"} options={networkSwitchOptions.switchSpeedOptions} 
                                onChange={setPorts} index={networkSwitchIndex}/>
                        </>
                    )}
                    
                    {networkSwitch.switchType === "Managed" && (
                        <>  
                            <DeviceSelection item={networkSwitch} index={networkSwitchIndex} 
                                lineProperty={"power1InLine"}  deviceProperty={"power1InDT"} stationProperty={"power1InLocation"}
                                type="powerSource"/>  
                            <DeviceSelection item={networkSwitch} index={networkSwitchIndex} 
                                lineProperty={"power2InLine"} deviceProperty={"power2InDT"} stationProperty={"power2InLocation"}
                                type="power2Source"/>  

                        </>
                    )}

                    {networkSwitch.switchType === "Unmanaged" && (
                        <>
                            <DeviceSelection item={networkSwitch} index={networkSwitchIndex}
                                lineProperty={"powerSourceLine"} deviceProperty={"powerSourceDT"} stationProperty={"powerSourceLocation"}
                                type="powerSource"/> 
                            <DeviceSelection item={networkSwitch} index={networkSwitchIndex} 
                                lineProperty={"power2InLine"} deviceProperty={"power2InDT"} stationProperty={"power2InLocation"}
                                type="power2Source"/>  
                        </>
                    )}
                    
                    <CheckboxItem title={"Alarm output enable"} item={networkSwitch} property={"alarmEnable"} index={networkSwitchIndex}/>
                    {networkSwitch.alarmEnable && (
                        <>
                            <InputTextItem title={"Alarm device tag (e.g., ALARM)"} item={networkSwitch} property={"alarmName"} index={networkSwitchIndex} />
                        </>
                    )}
                    
                    <CheckboxItem title={"Console output enable"} item={networkSwitch} property={"consoleEnable"}  index={networkSwitchIndex}/>
                    {networkSwitch.consoleEnable && (
                        <>
                            <InputTextItem title={"Console device tag (e.g., CONSOLE)"} item={networkSwitch} property={"consuleName"} index={networkSwitchIndex}/>
                        </>
                    )}

                    {networkSwitch.networkType === "Local" && networkSwitch.switchType === "Unmanaged" && (
                        <>
                            <DropdownItem title={"Number of ports"} item={networkSwitch} property={"ports_8"} options={networkSwitchOptions.ports_8Options} 
                                onChange={setPorts} index={networkSwitchIndex}/>
                        </>
                    )}

                    {((networkSwitch.networkType === "Local" && networkSwitch.switchType === "Managed") || 
                        (networkSwitch.networkType === "Plant" && networkSwitch.switchSpeed === "Fast")) && (
                        <>
                            <DropdownItem title={"Number of ports"} item={networkSwitch} property={"ports_8or16"} options={networkSwitchOptions.ports_8or16Options} 
                                onChange={setPorts} index={networkSwitchIndex}/>
                        </>
                    )}
                    {/* The below code is to be used when the network switch type is "Plant" and the switch type is "Managed" */}
                    {networkSwitch.networkType === "Plant" && networkSwitch.switchSpeed === "Gigabit" && (
                        <>
                            <DropdownItem title={"Number of ports"} item={networkSwitch} property={"ports_8or16or24"} 
                                options={networkSwitchOptions.ports_8or16or24Options} 
                                onChange={setPorts} index={networkSwitchIndex}/>
                        </>
                    )}
                    {networkSwitch.switchType === "Unmanaged" && networkSwitch.ports.length === 8 && (
                        <>
                            <DeviceSelection item={networkSwitch} index={networkSwitchIndex}
                                lineProperty={"ethernetSourceLine"} deviceProperty={"ethernetSourceDT"} stationProperty={"ethernetSourceLocation"}
                                type="networkSource"/> 
                        </>
                    )}
                    
                    <NetworkSwitchPortConfiguration networkSwitch={networkSwitch} networkSwitchIndex={index} createNew={createNew}/>
            </div>  

           
        </div>
    );
};
export default NetworkSwitchConfiguration;