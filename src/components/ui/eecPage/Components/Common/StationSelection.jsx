import { useEffect } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import "../../Eec.css";
import { lineStore } from '../../Store/lineStore';


const StationSelection = ({
    item, index, setModelValue, 
    title,
    property,
}) => {
    const getStationOptions = lineStore((state) => state.getStationOptions)     
    const stations = lineStore((state) => state.stations)   
    
    useEffect(() => {
        getStationOptions();
    }, [item[property]]);

    

    return (
        
        <div>
           <CreateableDropdownItem title={title} placeHolder={item[property]} options={stations} setModelValue={setModelValue} index={index} property={property}/>
        </div>
    );
};
export default StationSelection;