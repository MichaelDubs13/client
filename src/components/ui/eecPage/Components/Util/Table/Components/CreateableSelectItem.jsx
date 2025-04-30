import { useState, useEffect} from "react";
import CreatableSelect from 'react-select/creatable';
import PropTypes from "prop-types";
import { all } from "axios";


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
const CreateableSelectItem = ({inputRef, className, item, property, options, onChange,onFocus, index}) =>{
    const [selectedOption, setSelectedOption] = useState({label:item[property] , value:item[property] });
    const [alloptions, setAllOptions]=useState(options);
    const defaultValue = item[property] 
    

    useEffect(() => {
        setAllOptions(options);
    }, [options]);

    useEffect(() => {
        setSelectedOption({label:defaultValue, value:defaultValue});
    }, [defaultValue]);
    
    const setValue = (reportedValue) => {
        if(property && index){
            item.setValue(index, property, reportedValue)
        } else if(property && !index){
            item.setValue(reportedValue, property);
        }  else {
            item.setValue(reportedValue);
        }
    }

    const handleOptionSelect = async (event) =>{
        if(!event) return;
        
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
        console.log(alloptions)
        }
    };


    return (
        <>
            {                
                <div style={{ width:'200px'}}>
                    <CreatableSelect 
                        selectOption
                        // menuPortalTarget={document.body}
                        // menuPosition="fixed"
                        ref={inputRef}
                        className={className}
                        options={alloptions} 
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        onChange={handleOptionSelect}
                        onCreateOption={handleOptionCreation}
                        onFocus={onFocus}
                        placeholder={defaultValue}
                        selected={selectedOption}
                        value={selectedOption}/>    
                </div>
            }            
        </>
    );
}

CreateableSelectItem.prototype = {
    title:PropTypes.string.isRequired,
    placeHolder:PropTypes.string.isRequired,
    options:PropTypes.array.isRequired,
    setModelValue:PropTypes.func,
    onChange:PropTypes.func,
    index:PropTypes.object,
    property:PropTypes.string
}

export default CreateableSelectItem;