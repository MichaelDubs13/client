import { useState, useEffect } from "react";
import { FormItem, FormLabel, FormInputText, Button, FormItemFileUpload, FormInputDropdown } from '@tesla/design-system-react';
import "./Eec.css";

const InputItem = ({item, index}) =>{
    const [value, setValue] = useState("");

    const handleValueChange = (event)=> {
        setValue(event.target.value);
        item.value = event.target.value;
    }
    useEffect(() => {
        const array =item.value.split("_")

        let indexElem = array.indexOf("#index");
        if (indexElem > -1) {
            array[indexElem] = index;
            item.value = array.join("");
            setValue(item.value);
        } else{
            item.value = item.placeholder;
        }
    }, []);

    return (
        <>
            {                
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">{item.name}</FormLabel>
                    <FormInputText
                    id="context"
                    readOnly={item.uneditable}
                    placeholder={item.placeholder}
                    value={value}
                    onChange={handleValueChange}/>
                </FormItem>
            }
                
            
            
        </>
    );
}

export default InputItem;