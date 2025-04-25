import { useState } from "react";
import { FormItem, FormLabel, FormInputText} from '@tesla/design-system-react';
import "../../Eec.css";
import PropTypes from "prop-types";

/**
 * This InputText component is used to set values in objects from the stores and updates the UI
 * @param {string} title - label of the input text component
 * @param {string} placeHolder - initial value of the of input text component
 * @param {bool} readOnly - if set to true, editing of the input text is disabled
 * @param {Function} setModelValue - function to set value in the store, function itself should be defined in store
 * @param {Function} onChange - callback function triggers when input text box value is changed
 * @param {object} index - object containing indexes of the target property, store will use these indexes to find the target object for value update
 * @param {string} property - object key to be updated, store will use the value of this parameter to find the property for value update
 * @returns 
 */
const InputTextItem = ({title, item, property, placeHolder, readOnly, setModelValue, onChange, index, createNew}) =>{
    const [value, setValue] = useState(placeHolder);
    const defaultValue = item ? item[property] : placeHolder;
    const setPropertyValue = item? item.setValue : setModelValue;
      
    const handleValueChange = (event)=> {
        const reportedValue = event.target.value;
        setValue(reportedValue);

        if(createNew){
            if(property && index){
                setPropertyValue(index, property, reportedValue)
            } else if(property && !index){
                setPropertyValue(reportedValue, property);
            }  else {
                setPropertyValue(reportedValue);
            }
        }  else {
            item[property] = reportedValue;
        }
        
        if(onChange){
            onChange(reportedValue);
        }
    }


    return (
        <>
            {                
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">{title}</FormLabel>
                    <FormInputText
                    id="context"
                    readOnly={readOnly}
                    placeholder={defaultValue}
                    value={value}
                    onChange={handleValueChange}/>
                </FormItem>
            }
        </>
    );
}

InputTextItem.prototype = {
    title:PropTypes.string.isRequired,
    placeHolder:PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    readOnly:PropTypes.bool,
    setModelValue:PropTypes.func,
    onChange:PropTypes.func,
    index:PropTypes.object,
    property:PropTypes.string
}

export default InputTextItem;