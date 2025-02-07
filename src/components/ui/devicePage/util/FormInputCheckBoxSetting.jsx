import {FormItem, FormLabel, FormInputCheckbox, } from '@tesla/design-system-react';
import { useState, useEffect } from 'react';

const FormInputCheckBoxSetting = ({topic, group, originalValue, handleChanges, changes}) => {
    const originalValueBool = Boolean(Number(originalValue)) ? originalValue === 1 : originalValue === 'true';
    const [value, setValue] = useState(originalValueBool);
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
        var oldValue = originalValueBool;
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
                        <FormInputCheckbox type='checkbox' 
                            placeholder={originalValueBool}
                            checked={value}
                            value={value}
                            style={GetBackGroundColor(valueChanged)}
                            onChange={handleChange}/>
                </FormItem>
        </>
    )
}

export default FormInputCheckBoxSetting