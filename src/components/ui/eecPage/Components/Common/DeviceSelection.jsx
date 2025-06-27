import { useEffect, useState } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import { lineStore, lineOptions, lineConfiguration } from '../../Store/lineStore';
import "../../Eec.css";
import ModalAddDevice from './ModalAddDevice';
import { iconStatusSuccess } from '@tesla/design-system-icons';
import { FormLabel, Icon, FormItem } from '@tesla/design-system-react';
import {  isValidLocation } from '../Util/Validations';
import DevicePortSelection from './DevicePortSelection';


/**
 * type: powerTarget, powerSource, networkTarget, networkSource,
 * @param {*} param0 
 * @returns 
 */
const DeviceSelection = ({
    item, index,  
    label,
    lineProperty,
    stationProperty,
    deviceProperty,
    onDeviceChange, onStationChange,
    type,
    canCreateDevice,
    portConfig,
    onPortSelect,
}) => {
    const getLineOptions = lineStore((state) => state.getLineOptions)         
    const [stations, setStations]=useState([])
    const lines = lineStore((state) => state.lines)  
    const [deviceOptions, setDeviceOptions] = useState([])   
    const [duplicateExist, setDuplicateExist]=useState(false)
    const [updatePortSelect, setUpdatePortSelect]= useState(0);

    useEffect(() => {
        var exist = getDuplicateDevice(item[deviceProperty], item[stationProperty])
        setDuplicateExist(exist);
    }, []);

    useEffect(() => {
        getLineOptions();        
    }, [item.line]);

    useEffect(() => {
        var stations = lineConfiguration.getStationOptions(item.line);
        setStations(stations);
    }, [item[stationProperty], item.line]);

    useEffect(() => {
        var deviceOptions = lineConfiguration.getDeviceOptions(item.line, item[stationProperty]);
        setDeviceOptions(deviceOptions)
    }, [item[deviceProperty], item[stationProperty], item.line]);

    const getTitle=()=>{
        if(label) return label;
        switch(type){
            case 'powerTarget':
                return "Power target Device tag (e.g., ++LINE+LOCATION-DT):";
            case 'networkTarget':
                return "Network target Device tag (e.g., ++LINE+LOCATION-DT):";
            case 'powerSource':
                return "Power source Device tag (e.g., ++LINE+LOCATION-DT):";
            case 'power2Source':
                return "2nd Power source Device tag (e.g., ++LINE+LOCATION-DT):";
            case 'networkSource':
                return "Network source Device tag (e.g., ++LINE+LOCATION-DT):";
            default:
                return "Enter the Device tag (e.g., ++LINE+LOCATION-DT):";
        }
    }
    const canAddDevice=(arr, value) =>{
        if(!value) return false;
        for(let i=0;i<arr.length;i++){
            if(value.startsWith(arr[i])){
                return true;
            }
        }
        return false;
    }

    const deviceExist=()=>{
        if(!item.line) return;
        if(!item[stationProperty]) return;
        if(!item[deviceProperty]) return;
        var foundItem = lineConfiguration.getDeviceByNameGlobal(item[deviceProperty], item[stationProperty], item.line);
        return foundItem;
    }

    const handleAddDeviceSubmit=(wipItem)=>{
        item.setValue(index, "description", wipItem.getDescription());
        if(portConfig){
            const value = updatePortSelect+1;
            setUpdatePortSelect(value);
        }
    }
    const renderAddDeviceModal=()=>{
        if(type){
            if(deviceExist()){
                return <Icon data={iconStatusSuccess} style={{marginLeft:'15px',}}/>
            } else {
                if(canCreateDevice){
                    if(canAddDevice(lineOptions.addDeviceOptions,item[deviceProperty])){
                        return <ModalAddDevice item={item} name={item[deviceProperty]} line={item.line} location={item[stationProperty]} 
                                powerSource={type === "powerTarget" ? item : null} networkSource={type === "networkTarget" ? item : null}
                                onSubmit={handleAddDeviceSubmit}/>
                    }
                }
            }
        }
    }
    const getTargetDevice = (deviceTag, location) => {
        var targetDevice = lineConfiguration.getDeviceByNameGlobal(deviceTag, location, item.line);
        if(targetDevice){
            if(type === "powerTarget"){
                targetDevice.setPowerSource(item.getSourceLine(), item.getSourceLocation(), item.getSourceDeviceTag()); 
                item.setDataValue("powerTarget", item.data.id)  
                item.setValue(index, "description", targetDevice.data.description);
            } else if(type === "networkTarget"){
                var port = '';
                if(item.getSourceNetworkPort) port = item.getSourceNetworkPort();
                targetDevice.setNetworkSource(item.getSourceLine(), item.getSourceLocation(), item.getSourceDeviceTag(), port);   
                item.setDataValue("ethernetTarget", item.data.id)  
                item.setValue(index, "description", targetDevice.data.description);
            }
        }
    }
    const getSourceDevice = (deviceTag, location) => {
        var sourceDevice = lineConfiguration.getDeviceByNameGlobal(deviceTag, location, item.line);
        if(sourceDevice){
            if(type === "powerSource"){
                if(item.data.type === 'lpd') return; //lpd is not a concept not device, powersource's power target should be lpd's psu
                sourceDevice.setPowerTarget(item.getSourceLine(), item.getSourceLocation(), item.getSourceDeviceTag()); 
                sourceDevice.setDataValue("powerTarget", item.data.id)  
            } else if(type === "parentPowerSource"){
                sourceDevice.setPowerTarget(item.getSourceLine(), item.getSourceLocation(), item.getSourceDeviceTag()); 
                sourceDevice.setDataValue("powerTarget", item.data.id)  
            } else if(type === "power2Source"){
                sourceDevice.setPowerTarget(item.getSourceLine(), item.getSourceLocation(), item.getSourceDeviceTag()); 
                sourceDevice.setDataValue("powerTarget", item.data.id)  
            } else if(type==="networkSource"){
                sourceDevice.setNetworkTarget(item.getSourceLine(), item.getSourceLocation(), item.getSourceDeviceTag());   
                sourceDevice.setDataValue("ethernetTarget", item.data.id)  
            }
        }
    }
    const getDuplicateDevice = (deviceTag, location) =>{
        if(type === "powerTarget" || type==="networkTarget" || 
        type === "powerSource" || type === "power2Source" || type==="networkSource" || 
        type==="ioModule"){
            return false
        }
        
        var targetDevice = lineConfiguration.getDeviceByNameGlobal(deviceTag, location, item.line);
        if(targetDevice){
            if(targetDevice.data.id != item.data.id){
                return true;
            }
        }
        return false;
    }
    const handleDeviceChange = (deviceTag) => {
        if(type === "powerTarget" || type==="networkTarget") {
            getTargetDevice(deviceTag, item[stationProperty])
        } else if(type === "powerSource" || type === "power2Source" || type==="networkSource" || type === "parentPowerSource"){
            getSourceDevice(deviceTag, item[stationProperty])
        } else {
            var exist = getDuplicateDevice(deviceTag, item[stationProperty])
            setDuplicateExist(exist);
        }

        if(onDeviceChange){
            onDeviceChange(deviceTag);
        }
    }
    const handleStationChange = (location) => {
        if(type === "powerTarget" || type==="networkTarget") {
            getTargetDevice(item[deviceProperty], location)
        } else if(type === "powerSource" || type === "power2Source" || 
            type==="networkSource"){
            getSourceDevice(item[deviceProperty], location)
        } else {
            var exist = getDuplicateDevice(item[deviceProperty], location)
            setDuplicateExist(exist);
        }
        if(onStationChange){
            onStationChange(location);
        }
    }

    const title = getTitle();
    return (
        <div>
            <div style={{display:'flex'}}>
                <FormItem className='form-item-device'>
                    <FormLabel className="form-label-device">{title}</FormLabel>
                    <FormLabel>++</FormLabel>
                    <CreateableDropdownItem item={item} property={lineProperty ? lineProperty : "line"} options={lines} index={index} type="condensed" 
                       isRequired={true} capitalizeValues={true}/>
                    <FormLabel>+</FormLabel>
                    <CreateableDropdownItem item={item} property={stationProperty} 
                        options={stations} index={index} onChange={handleStationChange} type="condensed" validation={isValidLocation} 
                        isRequired={true} capitalizeValues={true}/>
                    <FormLabel>-</FormLabel>
                    <CreateableDropdownItem item={item} property={deviceProperty} 
                        options={deviceOptions} index={index} onChange={handleDeviceChange} type="condensed" isRequired={true} 
                        duplicateExist={duplicateExist} capitalizeValues={true}/>
                    {
                        renderAddDeviceModal()
                    }
                </FormItem>
            </div>
            <div>
                {
                    portConfig &&
                      <DevicePortSelection title={portConfig.title} item={item} 
                            index={index} property={portConfig.property} targetDT={portConfig.targetDT} 
                            targetLocation={portConfig.targetLocation} targetLine={portConfig.targetLine}
                            isCreatable={portConfig.isCreatable} createNew={portConfig.createNew} portType={portConfig.type}
                            update={updatePortSelect} onChange={onPortSelect}/>
                }
            </div>
        </div>
    );
};
export default DeviceSelection;