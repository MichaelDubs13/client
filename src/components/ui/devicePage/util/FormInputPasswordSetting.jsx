import {FormItem, FormLabel, FormInputText } from '@tesla/design-system-react';
import { useState, useEffect } from 'react';
import { FaRegEyeSlash } from "react-icons/fa6";

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
                        <FormLabel className="hmi-form-label" htmlFor={group + topic}>{topic}</FormLabel>
                        <div className="password-container">
                            <FormInputText
                                className="password hmi-form-input"
                                id={group + topic}
                                placeholder={originalValue}
                                value={value}
                                style={GetBackGroundColor(valueChanged)}
                                onChange={handleChange}
                                />
                            <span className="password-viewer" onClick={()=>{}}>
                                <FaRegEyeSlash size={20} color='slategray' aria-hidden={true}/>
                            </span>
                        </div>
                </FormItem>
        </>
    )
}

export default FormInputTextSetting