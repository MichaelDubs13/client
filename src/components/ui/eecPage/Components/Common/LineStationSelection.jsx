import { useEffect, useState } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import "../../Eec.css";
import { lineConfiguration, lineStore } from '../../Store/lineStore';
import { isValidLocation } from '../Util/Validations';
import { FormItem, FormLabel } from '@tesla/design-system-react';


const LineStationSelection = ({
    item, 
    index, 
    title,
    stationProperty,
    onLineChange,
}) => {
    const [stations, setStations]=useState([])
    const getLineOptions = lineStore((state) => state.getLineOptions)     
    const lines = lineStore((state) => state.lines)   
    
    useEffect(() => {
        var stations = lineConfiguration.getStationOptions(item.line);
        setStations(stations)
    }, [item[stationProperty]]);

    useEffect(() => {
        getLineOptions();
        lineConfiguration.getStationOptions(item.line);
    }, [item.line]);

    return (
        
        <div>
             <div style={{display:'flex'}}>
                <FormItem className='form-item-device'>
                    <FormLabel className="form-label-device">{title? title:"Device Location (e.g., ++LINE+LOCATION)" }</FormLabel>
                    <FormLabel>++</FormLabel>
                    <CreateableDropdownItem item={item} options={lines} index={index} property={"line"} onChange={onLineChange} 
                    isRequired={true} capitalizeValues={true} type="condensed"/>
                    <FormLabel>+</FormLabel>
                    <CreateableDropdownItem item={item} property={stationProperty} options={stations} index={index} type="condensed"
                            validation={isValidLocation} isRequired={true} capitalizeValues={true}/>
                </FormItem>
            </div>
        </div>
    );
};
export default LineStationSelection;