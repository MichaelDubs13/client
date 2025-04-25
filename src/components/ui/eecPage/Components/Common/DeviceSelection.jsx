import { useEffect, useState } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import { lineStore, lineOptions, lineConfiguration } from '../../Store/lineStore';
import "../../Eec.css";
import ModalAddDevice from '../Util/ModalAddDevice';
import { iconStatusSuccess } from '@tesla/design-system-icons';
import { Icon } from '@tesla/design-system-react';



const DeviceSelection = ({
    item, index,  
    lineTitle = "Manufacturing Line name (e.g., UBM1, DOR1)", 
    stationTitle, stationProperty,
    deviceTitle, deviceProperty,
    onDeviceChange, onStationChange,
    powerSource, networkSource, 
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

    const CanAddDevice=(arr, value) =>{
        for(let i=0;i<arr.length;i++){
            if(value.startsWith(arr[i])){
                return true;
            }
        }
        return false;
    }

    const deviceExist=()=>{
        var foundItem = lineConfiguration.getDeviceByName(item[deviceProperty], item[stationProperty], item.line);
        return foundItem;
    }

    const renderAddDeviceModal=()=>{
        if(canCreateDevice){
            if(deviceExist()){
                return <Icon data={iconStatusSuccess} style={{marginLeft:'15px',}}/>
            } else {
                if(CanAddDevice(lineOptions.addDeviceOptions,item[deviceProperty])){
                    return <ModalAddDevice item={item} name={item[deviceProperty]} line={item.line} location={item[stationProperty]} 
                            powerSource={powerSource} networkSource={networkSource}/>
                }
            }
        }
    }

    return (
        
        <div>
            <CreateableDropdownItem title={lineTitle} item={item} property={"line"} options={lines} index={index}/>
            <CreateableDropdownItem title={stationTitle} item={item} property={stationProperty} options={stations} index={index} onChange={onStationChange}/>
            {
                <div style={{display:'flex', alignContent:'center', alignItems:'center'}}>
                    <CreateableDropdownItem title={deviceTitle} item={item} property={deviceProperty} options={deviceOptions} index={index} onChange={onDeviceChange}/>
                    {
                        renderAddDeviceModal()
                    }
                </div>
            }
            
        </div>
    );
};
export default DeviceSelection;