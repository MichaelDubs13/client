import { useEffect, useState } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import { lineStore } from '../../Store/lineStore';
import "../../Eec.css";


const DeviceSelection = ({
    item, index, setModelValue, 
    title, station,
    property,
}) => {
    const getDeviceOptions = lineStore((state) => state.getDeviceOptions)     
    const [deviceOptions, setDeviceOptions] = useState([])   
    
    useEffect(() => {
        var deviceOptions = getDeviceOptions(station);
        setDeviceOptions(deviceOptions)
    }, [item[property], station]);

    

    return (
        
        <div>
           <CreateableDropdownItem title={title} placeHolder={item[property]} options={deviceOptions} setModelValue={setModelValue} index={index} property={property}/>
        </div>
    );
};
export default DeviceSelection;