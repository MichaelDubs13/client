import { useState } from "react";
import { FormInputCheckbox, FormItem, FormLabel} from '@tesla/design-system-react';
import "../../Eec.css";
import PropTypes from "prop-types";

/**
 * This CheckBox component is used to set values in objects from the stores and updates the UI
 * @param {string} title - label of the CheckBox component
 * @param {bool} placeHolder - initial value of the of CheckBox component
 * @param {Function} setModelValue - function to set value in the store, function itself should be defined in store
 * @param {Function} onChange - callback function triggers when input text box value is changed
 * @param {object} index - object containing indexes of the target property, store will use these indexes to find the target object for value update
 * @param {string} property - object key to be updated, store will use the value of this parameter to find the property for value update
 * @returns 
 */
const CheckboxItem = ({title, item, property,placeHolder, setModelValue, onChange, index, createNew}) =>{
    const defaultValue = item? item[property] : placeHolder;
    const [value, setValue] = useState(defaultValue);
    

    const handleValueChange = (event)=> {
        const reportedValue = !value;
        setValue(reportedValue);
       
        if(!createNew){
            if(item){
                if(property && index){                
                    item.setValue(index, property, reportedValue)
                } else if(property && !index){
                    item.setValue(reportedValue, property);
                }  else {
                    item.setValue(reportedValue);
                }
            } else {
                setModelValue(reportedValue);
            }
        } else {
            item[property] = reportedValue;
        }
       
        
        if(onChange){
            onChange(reportedValue);
        }
    }

    return (
        <>
            {                
                <FormItem className="form-item" >
                    <FormLabel className="form-label" htmlFor="context">{title}</FormLabel>
                    <FormInputCheckbox id="context" type="checkbox" 
                    checked={defaultValue} 
                    onChange={handleValueChange}/>
                </FormItem>
            }
                
            
            
        </>
    );
}

CheckboxItem.prototype = {
    title:PropTypes.string.isRequired,
    placeHolder:PropTypes.bool.isRequired,
    readOnly:PropTypes.bool,
    setModelValue:PropTypes.func,
    onChange:PropTypes.func,
    index:PropTypes.object,
    property:PropTypes.string
}

export default CheckboxItem;