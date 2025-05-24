import { useState, useEffect } from "react";
import { FormItem, FormLabel, FormInputText, FormFeedback} from '@tesla/design-system-react';
import "../../Eec.css";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
/**
 * This InputText component is used to set values in objects from the stores and updates the UI
 * @param {string} title - label of the input text component
 * @param {string} placeHolder - initial value of the of input text component
 * @param {bool} readOnly - if set to true, editing of the input text is disabled
 * @param {Function} setModelValue - function to set value in the store, function itself should be defined in store
 * @param {Function} onChange - callback function triggers when input text box value is changed
 * @param {object} index - object containing indexes of the target property, store will use these indexes to find the target object for value update
 * @param {string} property - object key to be updated, store will use the value of this parameter to find the property for value update
 * @returns 
 */
const InputTextItem = ({title, item, property, placeHolder, setModelValue, readOnly, onChange, index, createNew, onTypingFinished, validation, valueStyle}) =>{
    const { control, trigger, setValue, formState: { errors } } = useForm();
    const defaultValue = item? item[property] : placeHolder;
    const [itemValue, setItemValue] = useState(defaultValue);
    const [finishedInput, setFinishedInput] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(0);
    const delayTime = 500;
    const validationProperty = "input"
    useEffect(() => {
        setValue(validationProperty, defaultValue);
        validate();
    }, []);

    useEffect(() => {
        if (finishedInput) {
        if(onTypingFinished){
            onTypingFinished(itemValue);
        }
        }
    }, [finishedInput]);

    const handleValueChange = (event)=> {
        const reportedValue = event.target.value;
        setItemValue(reportedValue);

        if(!createNew){
            if(item){
                if(property && index){
                    item.setValue(index, property, reportedValue)
                } else if(property && !index){
                    item.setValue(reportedValue, property);
                }  else {
                    item.setValue(reportedValue);
                }
            } else {
                setModelValue(reportedValue);
            }
        }  else {
            item[property] = reportedValue;
        }

        clearTimeout(typingTimeout);
        setTypingTimeout(
            setTimeout(() => {
                setFinishedInput(reportedValue);
            }, delayTime)
        );
        
        if(onChange){
            onChange(reportedValue);
        }
    }
    const validate = async () => {
        if(validation){
            await trigger(validationProperty);
        }
    };

    return (
        <>
            {               
               readOnly? 
               <FormItem className={title? "form-item-readonly":"form-item-readonly-notitle"}>
                    {
                        title  && <FormLabel className="form-label-title-readonly" htmlFor="context">{title}</FormLabel>
                    }
                    <FormLabel className="form-label-readonly" style={valueStyle}>{defaultValue}</FormLabel>
                </FormItem> 
                :
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">{title}</FormLabel>
                    <div className="form-input">
                        <Controller
                            name={validationProperty}
                            render={({ field }) => (
                                <FormInputText
                                id="context"
                                style={valueStyle}
                                readOnly={readOnly}
                                placeholder={defaultValue}
                                value={itemValue}
                                onChange={(event) => {
                                    field.onChange(event.target.value);
                                    validate();
                                    handleValueChange(event)
                                }}/>
                            )}
                        control={control}
                        rules={{ validate:value => validation(value)}}
                    />
                     {errors[validationProperty] && <p style={{color:'red'}}>{errors[validationProperty].message}</p>}
                    </div>
                </FormItem> 
            }
        </>
    );
}

InputTextItem.prototype = {
    title:PropTypes.string.isRequired,
    placeHolder:PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    readOnly:PropTypes.bool,
    setModelValue:PropTypes.func,
    onChange:PropTypes.func,
    index:PropTypes.object,
    property:PropTypes.string
}

export default InputTextItem;