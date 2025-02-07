import { useRef, useState, useEffect } from "react";
import { FormItem, FormLabel, FormInputDropdown } from '@tesla/design-system-react';
import "./Eec.css";

const DropdownItem = ({item, index}) =>{
    const [selectedOption, setSelectedOption] = useState(item.placeholder);

    const handleOptionSelect = async (event) =>{
        setSelectedOption(event.value);
        item.value = event.value;
      };

    useEffect(() => {
        const array =item.value.split("_")

        let indexElem = array.indexOf("#index");
        if (indexElem > -1) {
            array[indexElem] = index;
            item.value = array.join("");
            setSelectedOption(item.value);
        } else{
            item.value = item.placeholder;
        }
    }, []);

    return (
        <>
            {                
                <FormItem className="form-item" style={{display:"flex"}}>
                    <FormLabel className="form-label"  htmlFor="context">{item.name}</FormLabel>
                    <FormInputDropdown
                    id="dropdown"
                    label="dropdown"
                    onOptionSelect={handleOptionSelect}
                    options={item.options}
                    placeholder="output"
                    selected={selectedOption}
                    style={{ marginBottom: "5px"}}
                  ></FormInputDropdown>
                </FormItem>
            }
                
            
            
        </>
    );
}

export default DropdownItem;