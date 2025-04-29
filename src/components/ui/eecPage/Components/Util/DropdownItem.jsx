import { useState} from "react";
import { FormItem, FormLabel, FormInputDropdown } from '@tesla/design-system-react';
import "../../Eec.css";
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
const DropdownItem = ({title, item, property, placeHolder, setModelValue, options,onChange, index}) =>{
    const defaultValue = item? item[property] : placeHolder;
    const [selectedOption, setSelectedOption] = useState(defaultValue);

    const handleOptionSelect = async (event) =>{
        const reportedValue = event.value;
        setSelectedOption(event.value);

        if(item){
            if(property && index){
                item.setValue (index, property, reportedValue)
            } else if(property && !index){
                item.setValue (reportedValue, property);
            }  else {
                item.setValue (reportedValue);
            }
        } else {
            setModelValue(reportedValue);
        }
        

        if(onChange){
            onChange(reportedValue);
        }
      };


    return (
        <>
            {                
                <FormItem className="form-item" style={{display:"flex"}}>
                    <FormLabel className="form-label"  htmlFor="context">{title}</FormLabel>
                    <FormInputDropdown
                    id="dropdown"
                    label="dropdown"
                    onOptionSelect={handleOptionSelect}
                    options={options}
                    placeholder={defaultValue}
                    selected={selectedOption}
                    style={{ marginBottom: "5px"}}
                  ></FormInputDropdown>
                </FormItem>
            }
                
            
            
        </>
    );
}

DropdownItem.prototype = {
    title:PropTypes.string.isRequired,
    placeHolder:PropTypes.string.isRequired,
    options:PropTypes.array.isRequired,
    setModelValue:PropTypes.func,
    onChange:PropTypes.func,
    index:PropTypes.object,
    property:PropTypes.string
}

export default DropdownItem;