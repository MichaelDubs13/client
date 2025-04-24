import { useEffect } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import "../../Eec.css";
import { lineStore } from '../../Store/lineStore';


const LineStationSelection = ({
    item, 
    index, 
    lineTitle,
    stationTitle,
    stationProperty,
    onLineChange,
}) => {
    const getStationOptions = lineStore((state) => state.getStationOptions)     
    const stations = lineStore((state) => state.stations)  
    const getLineOptions = lineStore((state) => state.getLineOptions)     
    const lines = lineStore((state) => state.lines)   
    
    useEffect(() => {
        getStationOptions();
    }, [item[stationProperty]]);

    useEffect(() => {
        getLineOptions();
        getStationOptions();
    }, [item.line]);

    return (
        
        <div>
            {
                lineTitle && 
                <CreateableDropdownItem title={lineTitle} item={item} options={lines} index={index} property={"line"} onChange={onLineChange}/>
            }
            <CreateableDropdownItem title={stationTitle} item={item} property={stationProperty} options={stations} index={index}/>
        </div>
    );
};
export default LineStationSelection;