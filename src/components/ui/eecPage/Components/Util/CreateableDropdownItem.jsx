import { useEffect, useState} from "react";
import { FormItem, FormLabel, } from '@tesla/design-system-react';
import "../../Eec.css";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import EditableSelect from "./EditableSelect";

/**
 * This Dropdown component is used to set values in objects from the stores and updates the UI
 * @param {string} title - label of the Dropdown component
 * @param {string} placeHolder - initial value of the of Dropdown component
 * @param {Array} options - a list of options available for dropdown component
 * @param {Function} setModelValue - function to set value in the store, function itself should be defined in store
 * @param {Function} onChange - callback function triggers when input text box value is changed
 * @param {object} index - object containing indexes of the target property, store will use these indexes to find the target object for value update
 * @param {string} property - object key to be updated, store will use the value of this parameter to find the property for value update
 * @returns 
 */
const CreateableDropdownItem = ({title, item, property, placeHolder, setModelValue, options, onChange, index, type, validation, isRequired, duplicateExist, capitalizeValues}) =>{
    const defaultValue = item? item[property] : placeHolder;
    const [selectedOption, setSelectedOption] = useState({label:defaultValue , value:defaultValue });
    const { control, trigger, setValue, formState: { errors } } = useForm();
    const validationProperty = "select"

    useEffect(() => {
        setValue(validationProperty, defaultValue);
        validate();
    }, []);

    useEffect(() => {
        validate();
    }, [duplicateExist]);

    useEffect(() => {
        setSelectedOption({label:defaultValue, value:defaultValue});
    }, [defaultValue]);
    
    const setItemValue = (reportedValue) => {
        if(item){
            if(property != null && index != null){
                item.setValue(index, property, reportedValue)
            } else if(property && !index){
                item.setValue(reportedValue, property);
            }  else {
                item.setValue(reportedValue);
            }
        } else {
            setModelValue(reportedValue);
        }
    }

    const handleOptionSelect = async (event) =>{
        const reportedValue = event ? event.value : '';
        setItemValue(reportedValue)
        if(onChange){
            onChange(reportedValue);
        }
    };

    const handleOptionCreation = (inputValue) => {
        if(inputValue){
          if(capitalizeValues){
            inputValue = inputValue.toUpperCase();
          }
          setItemValue(inputValue)
        }
    };
    const validate = async () => {
        if(validation || isRequired){
            await trigger(validationProperty);
        }
    };

    const validateData = (value) => {
        if(isRequired){
            if(!value){
                return 'value is required';
            }
        }
        if(duplicateExist){
            return 'same device already exist'
        }

        if(validation)return validation(value)
    }

    return (
        <>
            {   
            type === "condensed" ?
                <div style={{minWidth:'100px'}}>
                    <Controller
                        name={validationProperty}
                        render={({ field }) => (
                            <EditableSelect
                                options={options}
                                selected={selectedOption}
                                placeHolder={defaultValue}
                                onChange={(event) => {
                                    var value = event ? event.value : '';
                                    handleOptionSelect(event)
                                    field.onChange(value);
                                    validate();
                                }}
                                onCreateOption={(value) => {
                                    handleOptionCreation(value);
                                    field.onChange(value);
                                    validate();
                                }}
                            />
                        )}
                        control={control}
                        rules={{ validate:value => validateData(value)}}
                    />
                     {errors[validationProperty] && <p style={{color:'red'}}>{errors[validationProperty].message}</p>}
                </div>
                :             
                <FormItem className="form-item">
                    <FormLabel className="form-label"  htmlFor="context">{title}</FormLabel>
                    <div style={{ marginBottom: "5px", width:'700px'}}>
                        <Controller
                        name={validationProperty}
                        render={({ field }) => (
                            <EditableSelect
                                options={options}
                                selected={selectedOption}
                                placeHolder={defaultValue}
                                onChange={(event) => {
                                    var value = event ? event.value : '';
                                    field.onChange(value);
                                    validate();
                                    handleOptionSelect(event)
                                }}
                                onCreateOption={(value) => {
                                    field.onChange(value);
                                    validate();
                                    handleOptionCreation(value);
                                }}
                            />
                        )}
                        control={control}
                        rules={{ validate:value => validateData(value)}}
                    />
                     {errors[validationProperty] && <p style={{color:'red'}}>{errors[validationProperty].message}</p>}
                    </div>
                </FormItem>
            }
                
            
            
        </>
    );
}

CreateableDropdownItem.prototype = {
    title:PropTypes.string.isRequired,
    placeHolder:PropTypes.string.isRequired,
    options:PropTypes.array.isRequired,
    setModelValue:PropTypes.func,
    onChange:PropTypes.func,
    index:PropTypes.object,
    property:PropTypes.string
}

export default CreateableDropdownItem;