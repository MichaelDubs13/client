import {FormItem, FormLabel, FormInputText } from '@tesla/design-system-react';
import { useState, useEffect } from 'react';

const FormInputTextSetting = ({topic, group, originalValue, handleChanges, changes}) => {
    const [value, setValue] = useState(originalValue);
    const [valueChanged, setValueChanged] = useState(false);

    useEffect(() => {
        if(Object.keys(changes).length === 0){
            setValueChanged(false); 
        }
        
      },[changes]);

    const GetBackGroundColor = (changed) =>{
        if(changed){
            return {backgroundColor:"lightgreen"}
        } 
         return {};
    }

    const handleChange = (event) => {
        var oldValue = originalValue;
        var newValue = event.target.checked;
     
        setValue(newValue);
        if(oldValue === newValue){
            setValueChanged(false);
   
        } else {
            handleChanges(topic, newValue)
            setValueChanged(true);
        }
    }

    return (
        <>
                <FormItem className="hmi-form-item"> 
                        <FormLabel className="hmi-form-label"  htmlFor={group + topic}>{topic}</FormLabel>
                        <FormInputText
                            className='hmi-form-input'
                            id={group + topic}
                            placeholder={originalValue}
                            value={value}
                            style={GetBackGroundColor(valueChanged)}
                            onChange={handleChange}
                            />
                </FormItem>
        </>
    )
}

export default FormInputTextSetting