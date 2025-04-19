import { useEffect, useState } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import { lineStore } from '../../Store/lineStore';
import "../../Eec.css";


const DeviceSelection = ({
    item, index, setModelValue, 
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
        console.log(item[deviceProperty])
        console.log(item[stationProperty])
        setDeviceOptions(deviceOptions)
    }, [item[deviceProperty], item[stationProperty], item.line]);

    

    return (
        
        <div>
            <CreateableDropdownItem title={lineTitle} placeHolder={item.line} options={lines}  setModelValue={setModelValue} index={index} property={"line"}/>
            <CreateableDropdownItem title={stationTitle} placeHolder={item[stationProperty]} options={stations} setModelValue={setModelValue} index={index} property={stationProperty} onChange={onStationChange}/>
            <CreateableDropdownItem title={deviceTitle} placeHolder={item[deviceProperty]} options={deviceOptions} setModelValue={setModelValue} index={index} property={deviceProperty} onChange={onDeviceChange}/>
        </div>
    );
};
export default DeviceSelection;