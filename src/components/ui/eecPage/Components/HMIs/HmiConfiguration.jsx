import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import ExtensionUnitConfiguration from './ExtensionUnitConfiguration';
import { hmiStore, hmiOptions } from '../../Store/hmiStore';
import { DataTable } from '@tesla/design-system-react';
import DeviceSelection from '../Common/DeviceSelection';
import LineLocationSelection from '../Common/LineLocationSelection';
import "../../Eec.css";

const HmiConfiguration = ({hmi, index}) => {
    const setHmiValue = hmiStore((state) => state.sethmiValue);
    const setNumberOfExtensionUnitPositions = hmiStore((state) => state.setNumberOfExtensionUnitPositions);
    const hmiIndex = {hmiIndex:index}
    const setExtensionUnitPositions = (value) =>{
        setNumberOfExtensionUnitPositions(index, value);
    }

    return (
        
        <div>
            <div>
                <DataTable border={4} style={{ backgroundColor:"white", overflow:'hidden'}}> 
                    <LineLocationSelection item={hmi} index={hmiIndex} showPlantShop={true}/>
                    
                    {/* the PLC ID is to be a dropdown list of all the PLC IDs defined within the MCP configurations */}
                    <DropdownItem title={"HMI is controlled by PLC ID"} placeHolder={hmi.plcID} setModelValue={setHmiValue} index={hmiIndex} property={"plcID"}/>
                    <InputTextItem title={"Local IP address (e.g., 192.168.1.x)"} placeHolder={hmi.localIP} setModelValue={setHmiValue} index={hmiIndex} property={"localIP"}/>
                    <InputTextItem title={"Plant IP address (e.g., 10.x.x.x)"} placeHolder={hmi.plantIP} setModelValue={setHmiValue} index={hmiIndex} property={"plantIP"}/>
                    <InputTextItem title={"Power in LINE (e.g., UBM1)"} placeHolder={hmi.powerInLine} setModelValue={setHmiValue} index={hmiIndex} property={"powerInLine"}/>
                    <InputTextItem title={"Power in LOCATION (i.e., Station number) (e.g., 00010)"} placeHolder={hmi.powerInLocation} setModelValue={setHmiValue} index={hmiIndex} property={"powerInLocation"}/>
                    <InputTextItem title={"Power in device tag (e.g., PSU01)"} placeHolder={hmi.powerInDT} setModelValue={setHmiValue} index={hmiIndex} property={"powerInDT"}/>
                    
                    <CheckboxItem title={"Check if this HMI gets its network from another HMI in this configuration"} placeHolder={hmi.ethernetCascadingFrom} setModelValue={setHmiValue} onChange={setExtensionUnitPositions} index={hmiIndex} property={"ethernetCascadingFrom"}/>
                    {!hmi.ethernetCascadingFrom && (
                        <>
                            <InputTextItem title={"What LINE does this HMI get network from? (e.g., UBM1)"} placeHolder={hmi.ethernetInLine} setModelValue={setHmiValue} index={hmiIndex} property={"ethernetInLine"}/>
                            <InputTextItem title={"What LOCATION does this HMI get network from? (e.g., 00010)"} placeHolder={hmi.ethernetInLocation} setModelValue={setHmiValue} index={hmiIndex} property={"ethernetInLocation"}/>
                            <InputTextItem title={"What device tag does this HMI get network from? (e.g., LETH01)"} placeHolder={hmi.ethernetInDT} setModelValue={setHmiValue} index={hmiIndex} property={"ethernetInDT"}/>
                            {hmi.ethernetInDT?.startsWith("LETH") && (
                                <>
                                    <InputTextItem title={"What device port does this HMI get network from? (e.g., 1)"} placeHolder={hmi.ethernetInDevicePort} setModelValue={setHmiValue} index={hmiIndex} property={"ethernetInDevicePort"}/>
                                </>
                            )}
                        </>
                    )}

                    <CheckboxItem title={"Check if this HMI is connected to another HMI in this configuration"} placeHolder={hmi.ethernetCascadingTo} setModelValue={setHmiValue} onChange={setExtensionUnitPositions} index={hmiIndex} property={"ethernetCascadingTo"}/>
                    {hmi.ethernetCascadingTo && (
                        <>
                            <DropdownItem title={"Which HMI does this HMI provide network to?"} placeHolder={hmi.hmiCascadingToSelection} options={hmiOptions.hmiCascadingToSelectionOptions} setModelValue={setHmiValue} index={hmiIndex} property={"hmiCascadingToSelection"}/>
                        </>
                    )}
                    {!hmi.ethernetCascadingTo && (
                        <>
                            <CheckboxItem title={"Check if this HMI is a network source for any other HMI"} placeHolder={hmi.ethernetCascadingToOutside} setModelValue={setHmiValue} onChange={setExtensionUnitPositions} index={hmiIndex} property={"ethernetCascadingToOutside"}/>
                            {hmi.ethernetCascadingToOutside && (
                                <>
                                    <InputTextItem title={"What LINE does this HMI provide network to? (e.g., UBM1)"} placeHolder={hmi.ethernetOutLine} setModelValue={setHmiValue} index={hmiIndex} property={"ethernetOutLine"}/>
                                    <InputTextItem title={"What LOCATION does this HMI provide network to? (e.g., 00010)"} placeHolder={hmi.ethernetOutLocation} setModelValue={setHmiValue} index={hmiIndex} property={"ethernetOutLocation"}/>
                                    <InputTextItem title={"What device tag does this HMI provide network to? (e.g., HMI01)"} placeHolder={hmi.ethernetOutDT} setModelValue={setHmiValue} index={hmiIndex} property={"ethernetOutDT"}/>
                                </>
                            )}
                        </>
                    )}

                    <DropdownItem title={"HMI screen size"} placeHolder={hmi.hmiScreenSize} setModelValue={setHmiValue} options={hmiOptions.hmiScreenSizeOptions} index={hmiIndex} property={"hmiScreenSize"}/>
                    <DropdownItem title={"HMI mounting type"} placeHolder={hmi.mountingType} setModelValue={setHmiValue} options={hmiOptions.mountingTypeOptions} index={hmiIndex} property={"mountingType"}/>
                    <DropdownItem title={"HMI version"} placeHolder={hmi.hmiVersion} setModelValue={setHmiValue} options={hmiOptions.hmiVersionOptions} index={hmiIndex} property={"hmiVersion"}/>
                    <DropdownItem title={"RFID position"} placeHolder={hmi.rfidPosition} setModelValue={setHmiValue} options={hmiOptions.rfidPositionOptions} onChange={setExtensionUnitPositions} index={hmiIndex} property={"rfidPosition"}/>
                    
                    <DropdownItem title={"Number of Extension Unit Positions"} placeHolder={hmi.numberOfExtensionUnitPositions} setModelValue={setHmiValue} options={hmiOptions.numberOfExtensionUnitPositionsOptions} onChange={setExtensionUnitPositions} index={hmiIndex} property={"numberOfExtensionUnitPositions"}/>
                    {/* Render all Extension Unit Positions */}
                    <ExtensionUnitConfiguration hmi={hmi} hmiIndex={index}/>
                    
                </DataTable>
            </div>  

           
        </div>
    );
};
export default HmiConfiguration;