import { useState, useEffect } from "react";
import { FormItem, FormLabel, FormInputText} from '@tesla/design-system-react';
import "../../Eec.css";

const InputTextItemBasic = ({title, data, onTypingFinished, onChange}) =>{
    const [value, setValue] = useState(data);
    const [finishedInput, setFinishedInput] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(0);
    const delayTime = 1000; 

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

export default InputTextItemBasic;