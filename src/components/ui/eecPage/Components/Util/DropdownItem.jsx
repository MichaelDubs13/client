import { useState} from "react";
import { FormItem, FormLabel, FormInputDropdown } from '@tesla/design-system-react';
import "../../Eec.css";

const DropdownItem = ({title, placeHolder, options, setModelValue, onChange, index, property}) =>{
    const [selectedOption, setSelectedOption] = useState(placeHolder);

    const handleOptionSelect = async (event) =>{
        const reportedValue = event.value;
        setSelectedOption(event.value);
        if(property){
            setModelValue(index, property, reportedValue)
        } else {
            setModelValue(reportedValue);
        }
        if(onChange){
            onChange(event);
        }
      };


    return (
        <>
            {                
                <FormItem className="form-item" style={{display:"flex"}}>
                    <FormLabel className="form-label"  htmlFor="context">{title}</FormLabel>
                    <FormInputDropdown
                    id="dropdown"
                    label="dropdown"
                    onOptionSelect={handleOptionSelect}
                    options={options}
                    placeholder={placeHolder}
                    selected={selectedOption}
                    style={{ marginBottom: "5px"}}
                  ></FormInputDropdown>
                </FormItem>
            }
                
            
            
        </>
    );
}

export default DropdownItem;