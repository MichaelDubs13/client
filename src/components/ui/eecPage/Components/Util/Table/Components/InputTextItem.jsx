import { useState, useEffect } from "react";
import {FormInputText} from '@tesla/design-system-react';
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
const InputTextItem = ({inputRef, className, item, property, readOnly, onChange, onFocus, index, createNew}) =>{
    const [value, setValue] = useState(item[property]);
    const [previousValue, setPreviousValue] = useState();
    const [finishedInput, setFinishedInput] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(0);
    const delayTime = 1000; 
    const defaultValue = item[property]      

    useEffect(() => {
        if (finishedInput) {
            if(onChange){
                if(previousValue != value){
                    const reportedValue = value
                    if(createNew){
                        if(property && index){
                            item.setValue(index, property, reportedValue)
                        } else if(property && !index){
                            item.setValue(reportedValue, property);
                        }  else {
                            item.setValue(reportedValue);
                        }
                    }  else {
                        item[property] = reportedValue;
                    }
                    onChange(value);
                }
            }
        }
        }, [finishedInput]);

    const handleValueChange = (event)=> {
        const reportedValue = event.target.value;
        setPreviousValue(value);
        setValue(reportedValue);

        clearTimeout(typingTimeout);
        setTypingTimeout(
        setTimeout(() => {
            setFinishedInput(reportedValue);
        }, delayTime)
        );
    }


    return (
        <>
            {                
            <FormInputText
                id="context"
                className={className}
                inputRef={inputRef}
                readOnly={readOnly}
                placeholder={defaultValue}
                value={value}
                onFocus={onFocus}
                onChange={handleValueChange}/>
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