import { useEffect, useState} from "react";
import { FormItem, FormLabel, } from '@tesla/design-system-react';
import "../../Eec.css";
import PropTypes from "prop-types";
import CreatableSelect from 'react-select/creatable';

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
const CreateableDropdownItem = ({title, item, property, placeHolder, setModelValue, options, onChange, index}) =>{
    const defaultValue = item? item[property] : placeHolder;
    const [selectedOption, setSelectedOption] = useState({label:defaultValue , value:defaultValue });
    const [alloptions, setAllOptions]=useState(options);
    

    useEffect(() => {
        setAllOptions(options);
    }, [options]);

    useEffect(() => {
        setSelectedOption({label:defaultValue, value:defaultValue});
    }, [defaultValue]);
    
    const setValue = (reportedValue) => {
        
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
    }

    const handleOptionSelect = async (event) =>{
        if(!event) return;
        console.log(item);
        const reportedValue = event.value;
        setSelectedOption(event.value);
        setValue(reportedValue)
        
        if(onChange){
            onChange(reportedValue);
        }
    };

    const handleOptionCreation = (inputValue) => {
        if(inputValue){
          var newOption = {label:inputValue, value: inputValue};
          setAllOptions([...alloptions,newOption])
          setSelectedOption(newOption)
          setValue(inputValue)
        }
    };

    return (
        <>
            {                
                <FormItem className="form-item">
                    <FormLabel className="form-label"  htmlFor="context">{title}</FormLabel>
                    <div style={{ marginBottom: "5px", width:'700px'}}>
                        <CreatableSelect 
                            selectOption
                            options={alloptions} 
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={handleOptionSelect}
                            onCreateOption={handleOptionCreation}
                            placeholder={defaultValue}
                            selected={selectedOption}
                            value={selectedOption}
                        />
                    </div>
                </FormItem>
            }
                
            
            
        </>
    );
}

CreateableDropdownItem.prototype = {
    title:PropTypes.string.isRequired,
    placeHolder:PropTypes.string.isRequired,
    options:PropTypes.array.isRequired,
    setModelValue:PropTypes.func,
    onChange:PropTypes.func,
    index:PropTypes.object,
    property:PropTypes.string
}

export default CreateableDropdownItem;