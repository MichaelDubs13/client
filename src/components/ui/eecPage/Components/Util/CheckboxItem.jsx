import { useState } from "react";
import { FormInputCheckbox, FormItem, FormLabel} from '@tesla/design-system-react';
import "../../Eec.css";

const CheckboxItem = ({title, placeHolder, setModelValue, onChange, index, property}) =>{
    const [value, setValue] = useState(placeHolder);

    const handleValueChange = (event)=> {
        const reportedValue = !value;
        
        setValue(reportedValue);
        if(property){
            setModelValue(index, property, reportedValue)
        } else {
            setModelValue(reportedValue);
        }
        
        if(onChange){
            onChange(reportedValue);
        }
    }

    return (
        <>
            {                
                <FormItem className="form-item" >
                    <FormLabel className="form-label" htmlFor="context">{title}</FormLabel>
                    <FormInputCheckbox id="context" type="checkbox" 
                    checked={value} 
                    onChange={handleValueChange}/>
                </FormItem>
            }
                
            
            
        </>
    );
}

export default CheckboxItem;