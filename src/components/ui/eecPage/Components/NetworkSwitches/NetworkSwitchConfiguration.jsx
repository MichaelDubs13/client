import StationSelection from '../Common/StationSelection';
import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import NetworkSwitchPortConfiguration from './NetworkSwitchPortConfiguration';
import { networkSwitchOptions, networkSwitchStore } from '../../Store/networkSwitchStore';
import { DataTable } from '@tesla/design-system-react';
import DeviceSelection from '../Common/DeviceSelection';
import "../../Eec.css";

const NetworkSwitchConfiguration = ({networkSwitch, index}) => {
    const setNetworkSwitchValue = networkSwitchStore((state) => state.setNetworkSwitchValue);
    const setNumberOfPorts = networkSwitchStore((state) => state.setNumberOfPorts);
    const networkSwitchIndex = {networkSwitchIndex:index}
    const setPorts = (value) =>{
        setNumberOfPorts(index, value);
    }

    return (
        
        <div>
            <div>
                <DataTable border={4} style={{ backgroundColor:"white", overflow:'hidden'}}> 
                    <StationSelection title={"Network Switch Location (i.e., Station number) (e.g., 00010)"} item={networkSwitch} setModelValue={setNetworkSwitchValue} index={index} property={"location"}/>      
                    <DeviceSelection title={"Network switch device tag (e.g., LETH01)"} item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"switchDT"} station={networkSwitch.location}/> 
                    
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
                            <StationSelection title={"Power 1 in location (e.g., 00010)"} item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power1InLocation"}/>    
                            <DeviceSelection title={"Power 1 in device tag (e.g., PSU01)"} item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power1InDT"} station={networkSwitch.power1InLocation}/>                                
                            <StationSelection title={"Power 2 in location (e.g., 00010)"} item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power2InLocation"}/>    
                            <DeviceSelection title={"Power 2 in device tag (e.g., PSU02)"} item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power2InDT"} station={networkSwitch.power2InLocation}/>                                
                        </>
                    )}

                    {networkSwitch.switchType === "Unmanaged" && (
                        <>
                            <StationSelection title={"Power in location (e.g., 00010)"} item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"powerInLocation"}/>  
                            <DeviceSelection title={"Power in device tag (e.g., PSU01)"} item={networkSwitch} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"powerInDT"} station={networkSwitch.powerInLocation}/> 
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