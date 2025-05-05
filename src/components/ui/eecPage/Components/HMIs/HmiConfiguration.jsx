import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import ExtensionUnitConfiguration from './ExtensionUnitConfiguration';
import { hmiStore, hmiOptions } from '../../Store/hmiStore';
import { DataTable } from '@tesla/design-system-react';
import DeviceSelection from '../Common/DeviceSelection';
import { lpdConfiguration, lpdStore } from '../../Store/lpdStore';
import "../../Eec.css";
import PlcIDSelection from '../Common/PlcIDSelection';
import { lineConfiguration } from '../../Store/lineStore';
import NetworkPortSelection from '../Common/NetworkPortSelection';

const HmiConfiguration = ({hmi, index, createNew}) => {
    const hmisOptions = hmiStore((state) => state.hmisOptions);
    const setNumberOfExtensionUnitPositions = hmiStore((state) => state.setNumberOfExtensionUnitPositions);
    const lpds = lpdStore((state)=> state.lpds);
    const hmiIndex = createNew? {}: {hmiIndex:index}
    const setExtensionUnitPositions = (value) =>{
        setNumberOfExtensionUnitPositions(index, value);
    }

    const handleDeviceChange = (value) => {
        if(hmi.location && value){
            const pwrDrop = lpdConfiguration.getDrop(lpds, hmi.location, value)
            if(pwrDrop){                
                hmi.setPowerSource(pwrDrop.data.parent.line, pwrDrop.data.parent.location, pwrDrop.data.parent.deviceTag);
                pwrDrop.setDataValue("targetDevice", hmi.data.id)
            }
        }
    }

    const handleRfidPositionChange = (value) => {
        hmi.setRfidExtensionPosition(value)
    }

    return (
        
        <div>
            <div>
                <DataTable border={4} className='data-table'> 
                    <DeviceSelection item={hmi} index={hmiIndex}
                        deviceTitle={"HMI device tag (e.g., HMI01)"}  deviceProperty={"deviceTag"} onDeviceChange={handleDeviceChange}
                        stationTitle={"HMI Location (i.e., Station number) (e.g., 00010)"} stationProperty={"location"}/> 
                    <PlcIDSelection item={hmi} title={"HMI is controlled by PLC ID:"} index={hmiIndex} createNew={createNew}/>
                    <InputTextItem title={"Local IP address (e.g., 192.168.1.x)"} item={hmi} index={hmiIndex} property={"localIP"}/>
                    <InputTextItem title={"Plant IP address (e.g., 10.x.x.x)"} item={hmi} index={hmiIndex} property={"plantIP"}/>
                    
                    <DeviceSelection item={hmi} index={hmiIndex} 
                        deviceTitle={"Power source Device Tag (e.g., PSU01)"}  deviceProperty={"powerSourceDT"}
                        stationTitle={"Power source LOCATION (e.g., 00010)"} stationProperty={"powerSourceLocation"}
                        lineTitle={"Power source LINE (e.g., UBM1)"} lineProperty={"powerSourceLine"}
                        type="powerSource"/>                                
                    
                    <CheckboxItem title={"Check if this HMI gets its network from another HMI in this configuration"} item={hmi} index={hmiIndex} property={"ethernetCascadingFrom"}/>
                    {!hmi.ethernetCascadingFrom && (
                        <>
                            <DeviceSelection item={hmi} index={hmiIndex} 
                                deviceTitle={"Network source Device Tag (e.g., LETH01)"}  deviceProperty={"ethernetSourceDT"}
                                stationTitle={"Network source LOCATION (e.g., 00010)"} stationProperty={"ethernetSourceLocation"} 
                                lineTitle={"Network source LINE (e.g., UBM1)"} lineProperty={"ethernetSourceLine"}
                                type="networkSource"/>
                            <NetworkPortSelection title={"What device port does this HMI get network from? (e.g., 1)"} item={hmi} 
                                index={hmiIndex} property={"ethernetSourceDevicePort"} targetDT={hmi.ethernetSourceDT} 
                                targetLocation={hmi.ethernetSourceLocation} targetLine={hmi.line}
                                createNew={createNew}/>
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
                                        deviceTitle={"Network target Device Tag (e.g., LETH01)"}  deviceProperty={"ethernetTargetDT"}
                                        stationTitle={"Network target LOCATION (e.g., 00010)"} stationProperty={"ethernetTargetLocation"} 
                                        lineTitle={"Network target LINE (e.g., UBM1)"} lineProperty={"ethernetTargetLine"}
                                        type="networkTarget"/>
                                </>
                            )}
                        </>
                    )}

                    <DropdownItem title={"HMI screen size"} item={hmi} options={hmiOptions.hmiScreenSizeOptions} index={hmiIndex} property={"hmiScreenSize"}/>
                    <DropdownItem title={"HMI mounting type"} item={hmi} options={hmiOptions.mountingTypeOptions} index={hmiIndex} property={"mountingType"}/>
                    <DropdownItem title={"HMI version"} item={hmi} options={hmiOptions.hmiVersionOptions} index={hmiIndex} property={"hmiVersion"}/>
                    <DropdownItem title={"RFID position"} item={hmi} options={hmiOptions.rfidPositionOptions} onChange={handleRfidPositionChange} index={hmiIndex} property={"rfidPosition"}/>
                    <DropdownItem title={"Number of Extension Unit Positions"} item={hmi} options={hmiOptions.numberOfExtensionUnitPositionsOptions} 
                        onChange={setExtensionUnitPositions} index={hmiIndex} property={"numberOfExtensionUnitPositions"}/>
                    {/* Render all Extension Unit Positions */}
                    <ExtensionUnitConfiguration hmi={hmi} hmiIndex={index}/>
                    
                </DataTable>
            </div>  

           
        </div>
    );
};
export default HmiConfiguration;