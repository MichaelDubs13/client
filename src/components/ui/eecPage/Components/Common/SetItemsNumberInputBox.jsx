import {  useState } from "react";
import { FormLabel, FormItem, Button, FormInputText } from '@tesla/design-system-react';
import "../../Eec.css";

const SetItemsNumberInputBox = ({title, items, addItems, index, property}) => {
    const [numberOfItems, setNumberOfItems] = useState(items.length);

    const handleSumbit = (event) => {
        event.preventDefault(); 
        if(index != null && property != null){
            addItems(index, property, numberOfItems);     
        } else if(index != null) {
            addItems(index, numberOfItems);     
        } else {
            addItems(numberOfItems); 
        }
    }
    
    const handleValueChange = (event)=> {
        setNumberOfItems(event.target.value);
    }    

    return (
        <>
             <div>
                <FormItem className="form-set-item">
                    <FormLabel className="form-set-label" htmlFor="context">{title}</FormLabel>
                    <FormInputText
                        id="context"
                        className="form-set-input"
                        value={numberOfItems}
                        placeholder={items.length}
                        onChange={handleValueChange}/>
                    <Button variant='secondary' style={{marginLeft:"10px", marginTop:'10px'}} onClick={handleSumbit}>Set</Button>
                </FormItem>                        
            </div>
        </>
    )
}

export default SetItemsNumberInputBox;