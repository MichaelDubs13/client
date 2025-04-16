import { pdpOptions, pdpStore } from '../../Store/pdpStore';
import { projectStore } from '../../Store/projectStore';
import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import NetworkSwitchPortConfiguration from './NetworkSwitchPortConfiguration';
import { networkSwitchOptions, networkSwitchStore } from '../../Store/networkSwitchStore';

import { NetworkSwitchPort } from './NetworkSwitchPort';
import { DataTable } from '@tesla/design-system-react';
import "../../Eec.css";

const NetworkSwitchConfiguration = ({networkSwitch, index}) => {
    const plant = projectStore((state) => state.plant);
    const shop = projectStore((state) => state.shop);
    const line = projectStore((state) => state.line);
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
                    <InputTextItem title={"Plant name"} placeHolder={plant} readOnly={true} />
                    <InputTextItem title={"Shop name"} placeHolder={shop} readOnly={true} />
                    <InputTextItem title={"Manufacturing Line name (e.g., UBM1, DOR1)"} placeHolder={networkSwitch.line} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"line"}/>
                    <InputTextItem title={"Location designation (e.g., 00010)"} placeHolder={networkSwitch.location} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"location"}/>
                    <InputTextItem title={"Network switch device tag (e.g., LETH01)"} placeHolder={networkSwitch.switchDT} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"switchDT"}/>
                    
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
                            <InputTextItem title={"Power 1 in location (e.g., 00010)"} placeHolder={networkSwitch.power1InLocation} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power1InLocation"}/>
                            <InputTextItem title={"Power 1 in device tag (e.g., PSU01)"} placeHolder={networkSwitch.power1InDT} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power1InDT"}/>
                            <InputTextItem title={"Power 2 in location (e.g., 00010)"} placeHolder={networkSwitch.power2InLocation} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power2InLocation"}/>
                            <InputTextItem title={"Power 2 in device tag (e.g., PSU02)"} placeHolder={networkSwitch.power2InDT} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power2InDT"}/>
                        </>
                    )}

                    {networkSwitch.switchType === "Unmanaged" && (
                        <>
                            <InputTextItem title={"Power in location (e.g., 00010)"} placeHolder={networkSwitch.powerInLocation} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"powerInLocation"}/>
                            <InputTextItem title={"Power in device tag (e.g., PSU01)"} placeHolder={networkSwitch.powerInDT} setModelValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"powerInDT"}/>
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