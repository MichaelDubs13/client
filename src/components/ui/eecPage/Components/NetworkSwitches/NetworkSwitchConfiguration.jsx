import { pdpOptions, pdpStore } from '../../Store/pdpStore';
import { projectStore } from '../../Store/projectStore';
import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import { networkSwitchStore } from '../../Store/networkSwitchStore';
import { DataTable } from '@tesla/design-system-react';
import "../../Eec.css";

const NetworkSwitchConfiguration = ({networkSwitch, index}) => {
    const plant = projectStore((state) => state.plant);
    const shop = projectStore((state) => state.shop);
    const line = projectStore((state) => state.line);
    const setNetworkSwitchValue = networkSwitchStore((state) => state.setNetworkSwitchValue);
    const networkSwitchIndex = {networkSwitchIndex:index}
    

    return (
        
        <div>
            <div>
                <DataTable border={4} style={{ backgroundColor:"white", overflow:'hidden'}}> 
                    <InputTextItem title={"Plant name"} placeHolder={plant} readOnly={true} />
                    <InputTextItem title={"Shop name"} placeHolder={shop} readOnly={true} />
                    <InputTextItem title={"Manufacturing Line name (e.g., UBM1, DOR1)"} placeHolder={networkSwitch.line} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"line"}/>
                    <InputTextItem title={"Location designation (e.g., MPDP01, WPDP01)"} placeHolder={networkSwitch.location} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"location"}/>
                    <InputTextItem title={"Network switch device tag (e.g., LETH01)"} placeHolder={networkSwitch.switchDT} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"switchDT"}/>
                    <InputTextItem title={"Network switch is controlled by PLC ID"} placeHolder={networkSwitch.plcID} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"plcID"}/>
                    <DropdownItem title={"Network type"} placeHolder={networkSwitch.networkType} setNetworkSwitchValue={setNetworkSwitchValue} options={networkSwitch.networkTypeOptions} index={networkSwitchIndex} property={"networkType"}/>
                    <InputTextItem title={"Local IP address"} placeHolder={networkSwitch.localIP} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"localIP"}/>
                    <InputTextItem title={"Plant IP address"} placeHolder={networkSwitch.plantIP} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"plantIP"}/>
                    <DropdownItem title={"Switch type"} placeHolder={networkSwitch.switchType} setNetworkSwitchValue={setNetworkSwitchValue} options={networkSwitch.switchTypeOptions} index={networkSwitchIndex} property={"switchType"}/>
                    
                    {networkSwitch.switchType === "Managed" && (
                        <>
                            <InputTextItem title={"Power 1 in location"} placeHolder={networkSwitch.power1InLocation} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power1InLocation"}/>
                            <InputTextItem title={"Power 1 in device tag"} placeHolder={networkSwitch.power1InDT} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power1InDT"}/>
                            <InputTextItem title={"Power 2 in location"} placeHolder={networkSwitch.power2InLocation} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power2InLocation"}/>
                            <InputTextItem title={"Power 2 in device tag"} placeHolder={networkSwitch.power2InDT} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"power2InDT"}/>
                        </>
                    )}

                    {networkSwitch.switchType === "Unmanaged" && (
                        <>
                            <InputTextItem title={"Power in location"} placeHolder={networkSwitch.powerInLocation} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"powerInLocation"}/>
                            <InputTextItem title={"Power in device tag"} placeHolder={networkSwitch.powerInDT} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"powerInDT"}/>
                        </>
                    )}
                    
                    <CheckboxItem title={"Alarm output enable"} placeHolder={networkSwitch.alarmEnable} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"alarmEnable"}/>
                    {networkSwitch.alarmEnable && (
                        <>
                            <InputTextItem title={"Alarm device tag"} placeHolder={networkSwitch.alarmName} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"alarmName"}/>
                        </>
                    )}
                    
                    <CheckboxItem title={"Console output enable"} placeHolder={networkSwitch.consoleEnable} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"consoleEnable"}/>
                    {networkSwitch.consoleEnable && (
                        <>
                            <InputTextItem title={"Console device tag"} placeHolder={networkSwitch.consuleName} setNetworkSwitchValue={setNetworkSwitchValue} index={networkSwitchIndex} property={"consuleName"}/>
                        </>
                    )}

                    <DropdownItem title={"Number of ports"} placeHolder={networkSwitch.ports} setNetworkSwitchValue={setNetworkSwitchValue} options={networkSwitch.numberOfPortsOptions} index={networkSwitchIndex} property={"ports"}/>
                </DataTable>
            </div>  

           
        </div>
    );
};
export default NetworkSwitchConfiguration;