import { useState, useEffect } from "react";
import { FormItem, FormLabel, FormInputText} from '@tesla/design-system-react';
import "../../Eec.css";

const InputTextItem = ({title, placeHolder, readOnly, setModelValue, onChange, index, property}) =>{
    const [value, setValue] = useState(placeHolder);
    const [finishedInput, setFinishedInput] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(0);
    const delayTime = 1000; 

    useEffect(() => {
        if (finishedInput) {
            if(property){
                setModelValue(index, property, value)
            } else {
                setModelValue(value);
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
                    <FormLabel className="form-label" htmlFor="context">{title}</FormLabel>
                    <FormInputText
                    id="context"
                    readOnly={readOnly}
                    placeholder={placeHolder}
                    value={value}
                    onChange={handleValueChange}/>
                </FormItem>
            }
        </>
    );
}

export default InputTextItem;