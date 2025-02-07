import { useState, useEffect } from "react";
import { FormItem, FormLabel, FormInputText} from '@tesla/design-system-react';
import "./Eec.css";

const CheckboxItem = ({item, index}) =>{
    const [value, setValue] = useState(item.value);

    const handleValueChange = ()=> {
        setValue(!value);
        item.value = !value;
    }

    return (
        <>
            {                
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">{item.name}</FormLabel>
                    <input id="context" type="checkbox" style={{transform:"scale(1.5)"}} 
                    checked={value} 
                    onChange={handleValueChange}/> :
                </FormItem>
            }
                
            
            
        </>
    );
}

export default CheckboxItem;