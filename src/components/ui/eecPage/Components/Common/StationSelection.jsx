import { useEffect } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import "../../Eec.css";
import { lineStore } from '../../Store/lineStore';


const StationSelection = ({
    item, index, 
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
           <CreateableDropdownItem title={title} item={item} property={property} options={stations} index={index}/>
        </div>
    );
};
export default StationSelection;