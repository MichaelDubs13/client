import { useEffect } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import "../../Eec.css";
import { lineStore } from '../../Store/lineStore';
import { isNumberValidation, isValidLocation } from '../Util/Validations';
import { FormItem, FormLabel } from '@tesla/design-system-react';


const LineStationSelection = ({
    item, 
    index, 
    title,
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
             <div style={{display:'flex'}}>
                <FormItem className='form-item-device'>
                    <FormLabel className="form-label-device">{title? title:"Device Location (e.g., ++LINE+LOCATION)" }</FormLabel>
                    <FormLabel>++</FormLabel>
                    <CreateableDropdownItem item={item} options={lines} index={index} property={"line"} onChange={onLineChange} isRequired={true} type="condensed"/>
                    <FormLabel>+</FormLabel>
                    <CreateableDropdownItem item={item} property={stationProperty} options={stations} index={index} type="condensed"
                            validation={isValidLocation} isRequired={true}/>
                </FormItem>
            </div>
        </div>
    );
};
export default LineStationSelection;