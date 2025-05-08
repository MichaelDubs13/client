import {  useEffect, useState } from "react";
import { FormLabel, FormItem, Button, FormInputText } from '@tesla/design-system-react';
import "../../Eec.css";
import { useForm, Controller } from "react-hook-form";

const SetItemsNumberInputBox = ({title, items, addItems, index, property, validation}) => {
    const [numberOfItems, setNumberOfItems] = useState(items.length);
    const { control, trigger, setValue, formState: { errors } } = useForm();
    const validationProperty = "input";

    useEffect(() => {
        setValue(validationProperty, items.length);
        validate();
    }, []);
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
    const validate = async () => {
        if(validation){
            await trigger(validationProperty);
            console.log(errors)
        }
    };
    return (
        <>
             <div>
                <FormItem className="form-set-item">
                    <FormLabel className="form-set-label" htmlFor="context">{title}</FormLabel>
                    <div className="form-input">
                        <Controller
                            name={validationProperty}
                            render={({ field }) => (
                                <FormInputText
                                id="context"
                                className="form-set-input"
                                value={numberOfItems}
                                placeholder={items.length}
                                onChange={(event) => {
                                    field.onChange(event.target.value);
                                    validate();
                                    handleValueChange(event)
                                }}/>
                            )}
                        control={control}
                        rules={{ validate:value =>  validation(value)}}
                    />
                     {errors[validationProperty] && <p style={{color:'red'}}>{errors[validationProperty].message}</p>}
                    </div>
                    <Button variant='secondary' style={{marginLeft:"10px", marginTop:'10px'}} onClick={handleSumbit}>Set</Button>
                </FormItem>                        
            </div>
        </>
    )
}

export default SetItemsNumberInputBox;