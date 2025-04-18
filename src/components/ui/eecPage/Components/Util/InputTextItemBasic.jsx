import { useState, useEffect } from "react";
import { FormItem, FormLabel, FormInputText} from '@tesla/design-system-react';
import "../../Eec.css";
import PropTypes from "prop-types";

/**
 * This InputText component is the basic inputTextComponent with a callback function that detects when user finishes typing
 * @param {string} title - label of the input text component
 * @param {string} data - initial value of the of input text component
 * @param {Function} onTypingFinished - callback function triggers 1 seconds after input text box value is changed
 * @param {Function} onChange - callback function triggers when input text box value is changed
 * @returns 
 */
const InputTextItemBasic = ({title, data, onTypingFinished, onChange}) =>{
    const [value, setValue] = useState(data);
    const [finishedInput, setFinishedInput] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(0);
    const delayTime = 500; 

    useEffect(() => {
        if (finishedInput) {
           if(onTypingFinished){
                onTypingFinished(value);
           }
        }
      }, [finishedInput]);
      
    const handleValueChange = (event)=> {
        const reportedValue = event.target.value;
        setValue(reportedValue);
        clearTimeout(typingTimeout);
        setTypingTimeout(
        setTimeout(() => {
            setFinishedInput(event.target.value);
        }, delayTime)
        );
        
        if(onChange){
            onChange(event);
        }
    }

    return (
        <>
            {                
                <FormItem className="form-item">
                    <FormLabel className="form-label" >{title}</FormLabel>
                    <FormInputText
                        type="number"
                        value={value}
                        onChange={handleValueChange}
                    />
                </FormItem>
            }
        </>
    );
}

InputTextItemBasic.prototype = {
    title:PropTypes.string.isRequired,
    data:PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    onTypingFinished:PropTypes.func,
    onChange:PropTypes.func,
}

export default InputTextItemBasic;