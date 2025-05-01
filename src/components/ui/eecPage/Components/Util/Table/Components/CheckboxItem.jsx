import { useState} from "react";
import { FormInputCheckbox} from '@tesla/design-system-react';
import PropTypes from "prop-types";


/**
 * This Dropdown component is used to set values in objects from the stores and updates the UI
 * @param {string} title - label of the Dropdown component
 * @param {string} placeHolder - initial value of the of Dropdown component
 * @param {Array} options - a list of options available for dropdown component
 * @param {Function} setModelValue - function to set value in the store, function itself should be defined in store
 * @param {Function} onChange - callback function triggers when input text box value is changed
 * @param {object} index - object containing indexes of the target property, store will use these indexes to find the target object for value update
 * @param {string} property - object key to be updated, store will use the value of this parameter to find the property for value update
 * @returns 
 */
const CheckboxItem = ({inputRef, className, item, property, onChange,onFocus, index}) =>{
    const defaultValue = item[property]
    const [value, setValue]=useState(defaultValue)
    

    const handleValueChange = async (event) =>{
        const reportedValue = !value
        setValue(reportedValue);
        if(property && index){
            item.setValue(index, property, reportedValue)
        } else if(property && !index){
            item.setValue(reportedValue, property);
        }  else {
            item.setValue(reportedValue);
        }

        if(onChange){
            onChange(reportedValue);
        }
      };


    return (
        <>
            {                
                <FormInputCheckbox id="context" type="checkbox" 
                className={className}
                inputRef={inputRef}
                checked={value} 
                onFocus={onFocus}
                onChange={handleValueChange}/>
            }
                
            
            
        </>
    );
}

CheckboxItem.prototype = {
    title:PropTypes.string.isRequired,
    placeHolder:PropTypes.string.isRequired,
    options:PropTypes.array.isRequired,
    setModelValue:PropTypes.func,
    onChange:PropTypes.func,
    index:PropTypes.object,
    property:PropTypes.string
}

export default CheckboxItem;