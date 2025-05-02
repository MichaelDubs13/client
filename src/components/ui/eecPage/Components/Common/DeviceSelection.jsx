import { useEffect, useState } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import { lineStore, lineOptions, lineConfiguration } from '../../Store/lineStore';
import "../../Eec.css";
import ModalAddDevice from './ModalAddDevice';
import { iconStatusSuccess } from '@tesla/design-system-icons';
import { FormLabel, Icon, FormItem } from '@tesla/design-system-react';


/**
 * type: powerTarget, powerSource, networkTarget, networkSource,
 * @param {*} param0 
 * @returns 
 */
const DeviceSelection = ({
    item, index,  
    lineTitle, 
    stationTitle, stationProperty,
    deviceTitle, deviceProperty,
    onDeviceChange, onStationChange,
    type,
    canCreateDevice,
}) => {
    const getLineOptions = lineStore((state) => state.getLineOptions)    
    const getStationOptions = lineStore((state) => state.getStationOptions)     
    const getDeviceOptions = lineStore((state) => state.getDeviceOptions)     
    const stations = lineStore((state) => state.stations)   
    const lines = lineStore((state) => state.lines)  
    const [deviceOptions, setDeviceOptions] = useState([])   

    useEffect(() => {
        getLineOptions();        
    }, [item.line]);

    useEffect(() => {
        getStationOptions();
    }, [item[stationProperty], item.line]);

    useEffect(() => {
        var deviceOptions = getDeviceOptions(item[stationProperty]);
        setDeviceOptions(deviceOptions)
    }, [item[deviceProperty], item[stationProperty], item.line]);

    const getTitle=()=>{
        switch(type){
            case 'powerTarget':
                return "Power target Device tag (e.g., ++LINE+LOCATION-DT):";
            case 'networkTarget':
                return "Network target Device tag (e.g., ++LINE+LOCATION-DT):";
            case 'powerSource':
                return "Power source Device tag (e.g., ++LINE+LOCATION-DT):";
            case 'networkSource':
                return "Network source Device tag (e.g., ++LINE+LOCATION-DT):";
            default:
                return "Enter the Device tag (e.g., ++LINE+LOCATION-DT):";
        }
    }
    const canAddDevice=(arr, value) =>{
        for(let i=0;i<arr.length;i++){
            if(value.startsWith(arr[i])){
                return true;
            }
        }
        return false;
    }

    const deviceExist=()=>{
        var foundItem = lineConfiguration.getDeviceByNameGlobal(item[deviceProperty], item[stationProperty], item.line);
        return foundItem;
    }

    const handleSubmit=(wipItem)=>{
        console.log(wipItem)
        item.setValue(index, "description", wipItem.getDescription());
        //item.setValue(index, "fla", wipItem.getFLA());
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
                                onSubmit={handleSubmit}/>
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
            }
    
            if(type === "networkTarget"){
                targetDevice.setNetworkSource(item.getSourceLine(), item.getSourceLocation(), item.getSourceDeviceTag());   
                item.setDataValue("ethernetTarget", item.data.id)  
                item.setValue(index, "description", targetDevice.data.description);
            }
        }
    }

    const getSourceDevice = (deviceTag, location) => {
        var sourceDevice = lineConfiguration.getDeviceByNameGlobal(deviceTag, location, item.line);
        if(sourceDevice){
            if(type === "powerSource"){
                sourceDevice.setPowerTarget(item.getSourceLine(), item.getSourceLocation(), item.getSourceDeviceTag()); 
                sourceDevice.setDataValue("powerTarget", item.data.id)  
            }
    
            if(type==="networkSource"){
                sourceDevice.setNetworkTarget(item.getSourceLine(), item.getSourceLocation(), item.getSourceDeviceTag());   
                sourceDevice.setDataValue("ethernetTarget", item.data.id)  
            }
        }
    }


    const handleDeviceChange = (deviceTag) => {

        if(type === "powerTarget" || type==="networkTarget") {
            getTargetDevice(deviceTag, item[stationProperty])
        }
        
        if(type === "powerSource" || type==="networkSource"){
            getSourceDevice(deviceTag, item[stationProperty])
        }

        if(onDeviceChange){
            onDeviceChange();
        }
    }
    const handleStationChange = (location) => {
        if(type === "powerTarget" || type==="networkTarget") {
            getTargetDevice(item[deviceProperty], location)
        }
        
        if(type === "powerSource" || type==="networkSource"){
            getSourceDevice(item[deviceProperty], location)
        }

        if(onStationChange){
            onStationChange();
        }
    }

    const title = getTitle();
    return (
        
        <div style={{display:'flex'}}>
            <FormItem className='form-item-device'>
                <FormLabel className="form-label-device">{title}</FormLabel>
                <CreateableDropdownItem title={lineTitle} item={item} property={"line"} options={lines} index={index} type="condensed"/>
                <CreateableDropdownItem title={stationTitle} item={item} property={stationProperty} 
                    options={stations} index={index} onChange={handleStationChange} type="condensed"/>
                <CreateableDropdownItem title={deviceTitle} item={item} property={deviceProperty} 
                    options={deviceOptions} index={index} onChange={handleDeviceChange} type="condensed"/>
                {
                    renderAddDeviceModal()
                }
            </FormItem>
        </div>
    );
};
export default DeviceSelection;