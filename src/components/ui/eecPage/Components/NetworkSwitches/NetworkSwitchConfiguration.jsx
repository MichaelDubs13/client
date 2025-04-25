import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import NetworkSwitchPortConfiguration from './NetworkSwitchPortConfiguration';
import { networkSwitchOptions, networkSwitchStore } from '../../Store/networkSwitchStore';
import { DataTable } from '@tesla/design-system-react';
import DeviceSelection from '../Common/DeviceSelection';
import { lpdConfiguration, lpdStore } from '../../Store/lpdStore';
import "../../Eec.css";
import { mcpStore } from '../../Store/mcpStore';
import { useEffect } from 'react';
import { lineStore } from '../../Store/lineStore';

const NetworkSwitchConfiguration = ({networkSwitch, index, createNew}) => {
    const mcps = mcpStore((state)=> state.mcps);
    const plcs = lineStore((state)=> state.plcs);
    const getPlcOptions = lineStore((state)=> state.getPlcOptions);
    const setNetworkSwitchValue = networkSwitchStore((state) => state.setNetworkSwitchValue);    
    const setNumberOfPorts = networkSwitchStore((state) => state.setNumberOfPorts);  
    const lpds = lpdStore((state)=> state.lpds);
    const networkSwitchIndex = createNew ? {} : {networkSwitchIndex:index}
  
    useEffect(() => {
        getPlcOptions();
        if(mcps.length === 1){
            networkSwitch.setValue(networkSwitchIndex, "plcID", mcps[0].getPlc())
        }
    }, [mcps]);
    
    const setPorts = (value) =>{
        setNumberOfPorts(index, value);   
    }

    const handleDeviceChange = (value) => {
        if(networkSwitch.location && value){
            const drop = lpdConfiguration.getDrop(lpds, networkSwitch.location, value)
            if(drop){                
                setNetworkSwitchValue(networkSwitchIndex, "power1InDT", drop.data.parent.psu_dt);
                setNetworkSwitchValue(networkSwitchIndex, "power1InLocation", drop.data.parent.psu_location);
                drop.setDataValue("targetDevice", networkSwitch.data.id)
            }
        }
    }

    return (
        
        <div>
            <div>
                <DataTable border={4} style={{ backgroundColor:"white", overflow:'hidden'}}> 
                    <DeviceSelection item={networkSwitch} index={networkSwitchIndex}
                        deviceTitle={"Network switch device tag (e.g., LETH01)"}  deviceProperty={"switchDT"} onDeviceChange={handleDeviceChange}
                        stationTitle={"Network Switch Location (i.e., Station number) (e.g., 00010)"} stationProperty={"location"}/> 
                    
                    <DropdownItem title={"Network switch is controlled by PLC ID"} item={networkSwitch} options={plcs} index={networkSwitchIndex} property={"plcID"}/>
                    <DropdownItem title={"Network type"} item={networkSwitch} property={"networkType"} 
                        options={networkSwitchOptions.networkTypeOptions} onChange={setPorts} index={networkSwitchIndex}/>
                    <InputTextItem title={"Local IP address (e.g., 192.168.1.xt)"} item={networkSwitch} index={networkSwitchIndex} property={"localIP"}/>
                    <InputTextItem title={"Plant IP address (e.g., 10.x.x.x)"} item={networkSwitch} index={networkSwitchIndex} property={"plantIP"}/>
                    
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
                                deviceTitle={"Power 1 in device tag (e.g., PSU01)"}  deviceProperty={"power1InDT"}
                                stationTitle={"Power 1 in location (e.g., 00010)"} stationProperty={"power1InLocation"}/>                                
                            <DeviceSelection item={networkSwitch} index={networkSwitchIndex} 
                                deviceTitle={"Power 2 in device tag (e.g., PSU02)"}  deviceProperty={"power2InDT"}
                                stationTitle={"Power 2 in location (e.g., 00010)"} stationProperty={"power2InLocation"}/>                                
                        </>
                    )}

                    {networkSwitch.switchType === "Unmanaged" && (
                        <>
                            <DeviceSelection item={networkSwitch} index={networkSwitchIndex}
                                deviceTitle={"Power in device tag (e.g., PSU01)"}  deviceProperty={"powerInDT"}
                                stationTitle={"Power in location (e.g., 00010)"} stationProperty={"powerInLocation"}/> 
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
                            <DropdownItem title={"Number of ports"} item={networkSwitch} property={"ports_8or16or24"} options={networkSwitchOptions.ports_8or16or24Options} 
                                onChange={setPorts} index={networkSwitchIndex}/>
                        </>
                    )}

                    {/* Input fields for each port */}
                    {/* Render all network switch ports */}
                    <NetworkSwitchPortConfiguration networkSwitch={networkSwitch} networkSwitchIndex={index}/>
                    
                </DataTable>
            </div>  

           
        </div>
    );
};
export default NetworkSwitchConfiguration;