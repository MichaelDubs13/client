import { useEffect, useState } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import { lineStore } from '../../Store/lineStore';
import "../../Eec.css";


const DeviceSelection = ({
    item, index,  
    lineTitle = "Manufacturing Line name (e.g., UBM1, DOR1)", 
    stationTitle, stationProperty,
    deviceTitle, deviceProperty,
    onDeviceChange, onStationChange,
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

    

    return (
        
        <div>
            <CreateableDropdownItem title={lineTitle} item={item} property={"line"} options={lines} index={index}/>
            <CreateableDropdownItem title={stationTitle} item={item} property={stationProperty} options={stations} index={index} onChange={onStationChange}/>
            <CreateableDropdownItem title={deviceTitle} item={item} property={deviceProperty} options={deviceOptions} index={index} onChange={onDeviceChange}/>
        </div>
    );
};
export default DeviceSelection;