import {  useState } from "react";
import { FormLabel, FormItem,FormInputDropdown } from '@tesla/design-system-react';
import "../../Eec.css";

const SetItemsNumberDropdown = ({title, items, addItems, index, property, options}) => {
    const [numberOfItems, setNumberOfItems] = useState(items.length);

    const handleValueChange = (event)=> {
        event.preventDefault(); 
        setNumberOfItems(event.target.value);
        if(index != null && property != null){
            addItems(index, property, numberOfItems);     
        } else if(index != null) {
            addItems(index, numberOfItems);     
        } else {
            addItems(numberOfItems); 
        }
    }    

    return (
        <>
             <div>                 
                 <FormItem className="form-item" style={{display:"flex"}}>
                        <FormLabel className="form-label"  htmlFor="context">{title}</FormLabel>
                        <FormInputDropdown
                        id="dropdown"
                        label="dropdown"
                        onOptionSelect={handleValueChange}
                        options={options}
                        placeholder={items.length}
                        selected={numberOfItems}
                        style={{ marginBottom: "5px"}}
                        ></FormInputDropdown>
                </FormItem>
            </div>
        </>
    )
}

export default SetItemsNumberDropdown;