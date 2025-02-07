import {FormItem, FormLabel, FormInputCheckbox, } from '@tesla/design-system-react';
import { useState, useEffect } from 'react';
import useChangeHistoryStore from '../../../store/changeHistoryStore';

const FormInputCheckBoxSetting = ({topic, group, originalValue, isNew}) => {
    const originalValueBool = originalValue.toLowerCase() === 'true';
    const [value, setValue] = useState(originalValueBool);
    const [valueChanged, setValueChanged] = useState(false);
    const hmiChangeHistory = useChangeHistoryStore((state) => state.hmiChangeHistory)
    const addChange = useChangeHistoryStore((state) => state.addChange)
    const removeChange = useChangeHistoryStore((state) => state.removeChange)
    const updateChange = useChangeHistoryStore((state) => state.updateChange)
    const addHistory = useChangeHistoryStore((state) => state.addHistory)
    const removeHistory = useChangeHistoryStore((state) => state.removeHistory)
    const updateHistory = useChangeHistoryStore((state) => state.updateHistory)
    const groupName = group ? group : "General"; 
    
    useEffect(() => {
        if(hmiChangeHistory.length === 0)
        {
            setValueChanged(false);   
        }
      }, [hmiChangeHistory]);

    const buildChangeLogMessage = (key, oldValue, newValue)=> {
        const groupMessage = group ? ` under group ${group} ` : '';
        return `Changed ${key}${groupMessage} from "${oldValue}" to "${newValue}"`
    }


    const GetBackGroundColor = (changed) =>{
        if(changed){
            return {backgroundColor:"lightgreen"}
        } 
         return {};
    }
    const findObject = (groupName, key) => {
        for(const history of hmiChangeHistory){
            if(history.hasOwnProperty(groupName)){
                if(history[groupName].hasOwnProperty(key)){
                    return history;
                }
            }
        }
        return null;
    }
    const updateStore = (key, oldValue, newValue) => {
        var message = buildChangeLogMessage(key, oldValue, newValue);
         var object = findObject(groupName, key);
        if(object){
            updateChange(groupName, key, newValue);
            updateHistory(groupName, key, message);
        } else{
            addChange({[groupName]: {[key]:newValue}})
            addHistory({[groupName]: {[key]:message}})
        }
    }

    const handleChange = (event) => {
        var key = topic;
        var oldValue = originalValueBool;
        var newValue = event.target.checked;

        setValue(newValue);

        if(oldValue === newValue){
            setValueChanged(false);
            removeChange(groupName, key);
            removeHistory(groupName,key);
        } else {
            setValueChanged(true);
            updateStore(key, oldValue, newValue);
        }
    }

  
    


    return (
        <>
                <FormItem className="hmi-form-item"> 
                        <FormLabel className="hmi-form-label"  htmlFor={group + topic}>{topic}</FormLabel>
                        <FormInputCheckbox type='checkbox' 
                            placeholder={originalValueBool}
                            value={value}
                            checked={value}
                            style={GetBackGroundColor(valueChanged)}
                            onChange={handleChange}/>
                </FormItem>
        </>
    )
}

export default FormInputCheckBoxSetting