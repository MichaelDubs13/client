import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import NetworkSwitchPortConfiguration from './NetworkSwitchPortConfiguration';
import { networkSwitchOptions, networkSwitchStore } from '../../Store/networkSwitchStore';
import { DataTable } from '@tesla/design-system-react';
import DeviceSelection from '../Common/DeviceSelection';
import "../../Eec.css";
import { lpdStore, lpdConfiguration } from '../../Store/lpdStore';

const NetworkSwitchConfiguration = ({networkSwitch, index}) => {
    const setNetworkSwitchValue = networkSwitchStore((state) => state.setNetworkSwitchValue);
    const setNumberOfPorts = networkSwitchStore((state) => state.setNumberOfPorts);
    const networkSwitchIndex = {networkSwitchIndex:index}
    const setPorts = (value) =>{
        setNumberOfPorts(index, value);   
    }

    const handleDeviceChange = (value) => {
        if(networkSwitch.location && value){
            const drop = lpdConfiguration.getDrop(networkSwitch.location, value)
            if(drop){                
                setNetworkSwitchValue(networkSwitchIndex, "power1InDT", drop.UI.parent.psu_dt);
                setNetworkSwitchValue(networkSwitchIndex, "power1InLocation", drop.UI.parent.psu_location);
            }
        }
        
    }

    return (
        
        <div>
            <div>
                <DataTable border={4} style={{ backgroundColor:"white", overflow:'hidden'}}> 
                    <DeviceSelection item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex}
                        deviceTitle={"Network switch device tag (e.g., LETH01)"}  deviceProperty={"switchDT"} onDeviceChange={handleDeviceChange}
                        stationTitle={"Network Switch Location (i.e., Station number) (e.g., 00010)"} stationProperty={"location"}/> 
                    
                    {/* the PLC ID is to be a dropdown list of all the PLC IDs defined within the MCP configurations */}
                    <InputTextItem title={"Network switch is controlled by PLC ID"} placeHolder={networkSwitch.plcID} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"plcID"}/>
                    <DropdownItem title={"Network type"} placeHolder={networkSwitch.networkType} setModelValue={setNetworkSwitchValue} options={networkSwitchOptions.networkTypeOptions} onChange={setPorts} index={networkSwitchIndex} property={"networkType"}/>
                    <InputTextItem title={"Local IP address (e.g., 192.168.1.xt)"} placeHolder={networkSwitch.localIP} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"localIP"}/>
                    <InputTextItem title={"Plant IP address (e.g., 10.x.x.x)"} placeHolder={networkSwitch.plantIP} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"plantIP"}/>
                    
                    {networkSwitch.networkType === "Local" && (
                        <>
                            <DropdownItem title={"Switch type"} placeHolder={networkSwitch.switchType} setModelValue={setNetworkSwitchValue} options={networkSwitchOptions.switchTypeOptions} onChange={setPorts} index={networkSwitchIndex} property={"switchType"}/>
                        </>
                    )}

                    {networkSwitch.networkType === "Plant" && (
                        <>
                            <DropdownItem title={"Switch speed"} placeHolder={networkSwitch.switchSpeed} setModelValue={setNetworkSwitchValue} options={networkSwitchOptions.switchSpeedOptions} onChange={setPorts} index={networkSwitchIndex} property={"switchSpeed"}/>
                        </>
                    )}
                    
                    {networkSwitch.switchType === "Managed" && (
                        <>  
                            <DeviceSelection item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} 
                                deviceTitle={"Power 1 in device tag (e.g., PSU01)"}  deviceProperty={"power1InDT"}
                                stationTitle={"Power 1 in location (e.g., 00010)"} stationProperty={"power1InLocation"}/>                                
                            <DeviceSelection item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} 
                                deviceTitle={"Power 2 in device tag (e.g., PSU02)"}  deviceProperty={"power2InDT"}
                                stationTitle={"Power 2 in location (e.g., 00010)"} stationProperty={"power2InLocation"}/>                                
                        </>
                    )}

                    {networkSwitch.switchType === "Unmanaged" && (
                        <>
                            <DeviceSelection item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex}
                                deviceTitle={"Power in device tag (e.g., PSU01)"}  deviceProperty={"powerInDT"}
                                stationTitle={"Power in location (e.g., 00010)"} stationProperty={"powerInLocation"}/> 
                        </>
                    )}
                    
                    <CheckboxItem title={"Alarm output enable"} placeHolder={networkSwitch.alarmEnable} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"alarmEnable"}/>
                    {networkSwitch.alarmEnable && (
                        <>
                            <InputTextItem title={"Alarm device tag (e.g., ALARM)"} placeHolder={networkSwitch.alarmName} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"alarmName"}/>
                        </>
                    )}
                    
                    <CheckboxItem title={"Console output enable"} placeHolder={networkSwitch.consoleEnable} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"consoleEnable"}/>
                    {networkSwitch.consoleEnable && (
                        <>
                            <InputTextItem title={"Console device tag (e.g., CONSOLE)"} placeHolder={networkSwitch.consuleName} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"consuleName"}/>
                        </>
                    )}

                    {networkSwitch.networkType === "Local" && networkSwitch.switchType === "Unmanaged" && (
                        <>
                            <DropdownItem title={"Number of ports"} placeHolder={networkSwitch.ports_8} setModelValue={setNetworkSwitchValue} options={networkSwitchOptions.ports_8Options} onChange={setPorts} index={networkSwitchIndex} property={"ports_8"}/>
                        </>
                    )}

                    {((networkSwitch.networkType === "Local" && networkSwitch.switchType === "Managed") || (networkSwitch.networkType === "Plant" && networkSwitch.switchSpeed === "Fast")) && (
                        <>
                            <DropdownItem title={"Number of ports"} placeHolder={networkSwitch.ports_8or16} setModelValue={setNetworkSwitchValue} options={networkSwitchOptions.ports_8or16Options} onChange={setPorts} index={networkSwitchIndex} property={"ports_8or16"}/>
                        </>
                    )}
                    {/* The below code is to be used when the network switch type is "Plant" and the switch type is "Managed" */}
                    {networkSwitch.networkType === "Plant" && networkSwitch.switchSpeed === "Gigabit" && (
                        <>
                            <DropdownItem title={"Number of ports"} placeHolder={networkSwitch.ports_8or16or24} setModelValue={setNetworkSwitchValue} options={networkSwitchOptions.ports_8or16or24Options} onChange={setPorts} index={networkSwitchIndex} property={"ports_8or16or24"}/>
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