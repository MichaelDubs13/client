import { useState, useEffect } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import { lineConfiguration, lineStore } from '../../Store/lineStore';
import { projectStore } from '../../Store/projectStore';
import InputTextItem from '../Util/InputTextItem';
import { FormItem, FormLabel } from '@tesla/design-system-react';
import "../../Eec.css";
import { isValidLocation } from '../Util/Validations';

const LineLocationSelection = ({
    item, index,
    lineTitle = "Manufacturing Line name (e.g., UBM1, DOR1)", 
    locationTitle ="Location designation (e.g., MPDP01, WPDP01)", 
    onLocationChange,
    onLineChange,
    showPlantShop
}) => {
    const plant = projectStore((state) => state.plant);
    const shop = projectStore((state) => state.shop);
    const getLineOptions = lineStore((state) => state.getLineOptions)     
    const lines = lineStore((state) => state.lines)   
    const [locationOptions, setLocationOptions] = useState([]);
    const [duplicateExist, setDuplicateExist]=useState(false)

    useEffect(() => {
        getLineOptions();
        var locations = lineConfiguration.getStationOptions(item.line);
        setLocationOptions(locations);
    }, [item.line]);

    useEffect(() => {
        var exist = getDuplicateDevice(item.line, item.location)
        setDuplicateExist(exist);
    }, []);

    const getDuplicateDevice = (line, location) =>{
        var targetDevice = lineConfiguration.getDeviceByNameGlobal(null, location, line);
        if(targetDevice){
            if(targetDevice.data.id != item.data.id){
                return true;
            }
        }
        return false;
    }

    const handleLineChange = (value)=>{
        var exist = getDuplicateDevice(value, item.location)
        setDuplicateExist(exist);
        if(onLineChange){
            onLineChange(value);
        }
    }

     const handleLocationChange = (value)=>{
        var exist = getDuplicateDevice(item.line, value)
        setDuplicateExist(exist);
        if(onLocationChange){
            onLocationChange(value);
        }
    }
    
    return (
        
        <div>
            {
                showPlantShop && 
                <div style={{display:'flex'}}>
                    <FormItem className='form-item-device'>
                        <FormLabel className="form-label-device">PLANT+SHOP</FormLabel>
                        <FormLabel>++</FormLabel>
                        <InputTextItem placeHolder={plant} readOnly={true} />
                        <FormLabel>+</FormLabel>
                        <InputTextItem placeHolder={shop} readOnly={true} />
                    </FormItem>
                </div>
            }
            <div style={{display:'flex'}}>
                <FormItem className='form-item-device'>
                    <FormLabel className="form-label-device">Panel Location (e.g., ++LINE+LOCATION)</FormLabel>
                    <FormLabel>++</FormLabel>
                    <CreateableDropdownItem title={lineTitle} item={item} options={lines} index={index} property={"line"} onChange={handleLineChange} type="condensed" 
                        isRequired={true} capitalizeValues={true}/>
                    <FormLabel>+</FormLabel>
                    <CreateableDropdownItem title={locationTitle} item={item} options={locationOptions} index={index} property={"location"} 
                        onChange={handleLocationChange} type="condensed" isRequired={true} duplicateExist={duplicateExist} capitalizeValues={true}
                        validation={isValidLocation} />
                </FormItem>
            </div>
        </div>
    );
};
export default LineLocationSelection;