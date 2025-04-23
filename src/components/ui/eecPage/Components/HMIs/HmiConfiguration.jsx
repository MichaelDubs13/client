import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import ExtensionUnitConfiguration from './ExtensionUnitConfiguration';
import { hmiStore, hmiOptions } from '../../Store/hmiStore';
import { DataTable } from '@tesla/design-system-react';
import DeviceSelection from '../Common/DeviceSelection';
import { lpdConfiguration, lpdStore } from '../../Store/lpdStore';
import { useEffect } from 'react';
import "../../Eec.css";
import { lineStore } from '../../Store/lineStore';
import { mcpStore } from '../../Store/mcpStore';

const HmiConfiguration = ({hmi, index}) => {
    const mcps = mcpStore((state)=>state.mcps)
    const setHmiValue = hmiStore((state) => state.sethmiValue);
    const hmisOptions = hmiStore((state) => state.hmisOptions);
    const setNumberOfExtensionUnitPositions = hmiStore((state) => state.setNumberOfExtensionUnitPositions);
    const setExtensionUnitPositionValue = hmiStore((state) => state.setExtensionUnitPositionValue);
    const lpds = lpdStore((state)=> state.lpds);
    const getPlcOptions = lineStore((state)=> state.getPlcOptions)
    const plcs = lineStore((state)=> state.plcs)
    const hmiIndex = {hmiIndex:index}
    const setExtensionUnitPositions = (value) =>{
        setNumberOfExtensionUnitPositions(index, value);
    }

    useEffect(() => {
        getPlcOptions();
        if(mcps.length === 1){
            hmi.setValue(hmiIndex, "plcID", mcps[0].getPlc())
        }
    }, [mcps]);

    const handleDeviceChange = (value) => {
        if(hmi.location && value){
            const extensionUnitPosition = lpdConfiguration.getDrop(lpds, hmi.location, value)
            if(extensionUnitPosition){                
                setHmiValue(hmiIndex, "powerInDT", extensionUnitPosition.data.parent.psu_dt);
                setHmiValue(hmiIndex, "powerInLocation", extensionUnitPosition.data.parent.psu_location);
                extensionUnitPosition.setDataValue("targetDevice", hmi.data.id)
            }
        }
    }

    const handleRfidPositionChange = (value) => {
        if(value === "Right"){
           // setHmiValue(hmiIndex, "rfidPosition", "Left")
           //get last two elements of the extendionUnitPositions array and set both to "RFID Reader"
            setExtensionUnitPositionValue({hmiIndex:index, extensionUnitPositionIndex:hmi.extensionUnitPositions.length-1}, "buttonSelection", "RFID Reader")
            setExtensionUnitPositionValue({hmiIndex:index, extensionUnitPositionIndex:hmi.extensionUnitPositions.length-2}, "buttonSelection", "RFID Reader")
        }else if(value === "Left"){
            //setHmiValue(hmiIndex, "rfidPosition", "Right")
            setExtensionUnitPositionValue({hmiIndex:index, extensionUnitPositionIndex:0}, "buttonSelection", "RFID Reader")
            setExtensionUnitPositionValue({hmiIndex:index, extensionUnitPositionIndex:1}, "buttonSelection", "RFID Reader")
        }
    }

    return (
        
        <div>
            <div>
                <DataTable border={4} style={{ backgroundColor:"white", overflow:'hidden'}}> 
                    <DeviceSelection item={hmi} index={hmiIndex}
                        deviceTitle={"HMI device tag (e.g., HMI01)"}  deviceProperty={"hmiDT"} onDeviceChange={handleDeviceChange}
                        stationTitle={"HMI Location (i.e., Station number) (e.g., 00010)"} stationProperty={"location"}/> 
                    <DropdownItem title={"HMI is controlled by PLC ID"} item={hmi} options={plcs} index={hmiIndex} property={"plcID"}/>
                    <InputTextItem title={"Local IP address (e.g., 192.168.1.x)"} item={hmi} index={hmiIndex} property={"localIP"}/>
                    <InputTextItem title={"Plant IP address (e.g., 10.x.x.x)"} item={hmi} index={hmiIndex} property={"plantIP"}/>
                    
                    <DeviceSelection item={hmi} index={hmiIndex} 
                        deviceTitle={"Power source Device Tag (e.g., PSU01)"}  deviceProperty={"powerInDT"}
                        stationTitle={"Power source LOCATION (e.g., 00010)"} stationProperty={"powerInLocation"}
                        lineTitle={"Power source LINE (e.g., UBM1)"} lineProperty={"powerInLine"}/>                                
                    
                    <CheckboxItem title={"Check if this HMI gets its network from another HMI in this configuration"} item={hmi} index={hmiIndex} property={"ethernetCascadingFrom"}/>
                    {!hmi.ethernetCascadingFrom && (
                        <>
                            <DeviceSelection item={hmi} index={hmiIndex} 
                                deviceTitle={"Network source Device Tag (e.g., LETH01)"}  deviceProperty={"ethernetInDT"}
                                stationTitle={"Network source LOCATION (e.g., 00010)"} stationProperty={"ethernetInLocation"} 
                                lineTitle={"Network source LINE (e.g., UBM1)"} lineProperty={"ethernetInLine"}/>
                            {hmi.ethernetInDT?.startsWith("LETH") && (
                                <>
                                    <InputTextItem title={"What device port does this HMI get network from? (e.g., 1)"} item={hmi} index={hmiIndex} property={"ethernetInDevicePort"}/>
                                </>
                            )}
                        </>
                    )}

                    <CheckboxItem title={"Check if this HMI is connected to another HMI in this configuration"} item={hmi}  index={hmiIndex} property={"ethernetCascadingTo"}/>
                    {hmi.ethernetCascadingTo && (
                        <>
                            <DropdownItem title={"Which HMI does this HMI provide network to?"} item={hmi} options={hmisOptions} index={hmiIndex} property={"hmiCascadingToSelection"}/>
                        </>
                    )}
                    {!hmi.ethernetCascadingTo && (
                        <>
                            <CheckboxItem title={"Check if this HMI is a network source for any other HMI"} item={hmi} index={hmiIndex} property={"ethernetCascadingToOutside"}/>
                            {hmi.ethernetCascadingToOutside && (
                                <>
                                    <DeviceSelection item={hmi} index={hmiIndex} 
                                        deviceTitle={"Network target Device Tag (e.g., LETH01)"}  deviceProperty={"ethernetOutDT"}
                                        stationTitle={"Network target LOCATION (e.g., 00010)"} stationProperty={"ethernetOutLocation"} 
                                        lineTitle={"Network target LINE (e.g., UBM1)"} lineProperty={"ethernetOutLine"}/>
                                </>
                            )}
                        </>
                    )}

                    <DropdownItem title={"HMI screen size"} item={hmi} options={hmiOptions.hmiScreenSizeOptions} index={hmiIndex} property={"hmiScreenSize"}/>
                    <DropdownItem title={"HMI mounting type"} item={hmi} options={hmiOptions.mountingTypeOptions} index={hmiIndex} property={"mountingType"}/>
                    <DropdownItem title={"HMI version"} item={hmi} options={hmiOptions.hmiVersionOptions} index={hmiIndex} property={"hmiVersion"}/>
                    <DropdownItem title={"RFID position"} item={hmi} options={hmiOptions.rfidPositionOptions} onChange={handleRfidPositionChange} index={hmiIndex} property={"rfidPosition"}/>
                    
                    <DropdownItem title={"Number of Extension Unit Positions"} item={hmi} options={hmiOptions.numberOfExtensionUnitPositionsOptions} onChange={setExtensionUnitPositions} index={hmiIndex} property={"numberOfExtensionUnitPositions"}/>
                    {/* Render all Extension Unit Positions */}
                    <ExtensionUnitConfiguration hmi={hmi} hmiIndex={index}/>
                    
                </DataTable>
            </div>  

           
        </div>
    );
};
export default HmiConfiguration;