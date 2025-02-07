import {FormItem, FormLabel, FormInputText} from '@tesla/design-system-react';
import { useState, useEffect } from 'react';
import useChangeHistoryStore from '../../../store/changeHistoryStore';
import useDeviceStore from '../../../store/deviceStore';

const FormInputTextSetting = ({topic,group, originalValue, isNew}) => {
    const [value, setValue] = useState(originalValue);
    const [valueChanged, setValueChanged] = useState(false);
    const hmiChangeHistory = useChangeHistoryStore((state) => state.hmiChangeHistory)
    const hmiChange = useChangeHistoryStore((state) => state.hmiChange)
    const addChange = useChangeHistoryStore((state) => state.addChange)
    const removeChange = useChangeHistoryStore((state) => state.removeChange)
    const updateChange = useChangeHistoryStore((state) => state.updateChange)
    const addHistory = useChangeHistoryStore((state) => state.addHistory)
    const removeHistory = useChangeHistoryStore((state) => state.removeHistory)
    const updateHistory = useChangeHistoryStore((state) => state.updateHistory)
    const groups = useDeviceStore((state) => state.groups);
    const updateGroup = useDeviceStore((state) => state.updateGroup);
    const groupName = group ? group : "General"; 

    useEffect(() => {
        if(hmiChangeHistory.length === 0){
            setValueChanged(false);   
        }
      }, [hmiChangeHistory]);
    
    const buildChangeLogMessage = (key, oldValue, newValue)=> {
        if(isNew){

        } else{
            const groupMessage = group ? ` under group ${group}` : '';
            return `Changed ${key}${groupMessage} from "${oldValue}" to "${newValue}"`
        }   
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
         
        if(isNew){
           var group = hmiChange.filter(change => change[groupName])
           var groupObject = group[0][groupName];
           if(groupObject){
            groupObject[key]._text = newValue;
            if(key === "Name"){
                if (newValue !== groupName) {
                    Object.defineProperty(group[0], newValue,
                        Object.getOwnPropertyDescriptor(group[0], groupName));
                    delete group[0][groupName];
                    updateGroup(groupName, group[0][newValue])
                }
            }
           }

           console.log(hmiChange)
        } else{
            var object = findObject(groupName, key);
            if(object){
                updateChange(groupName, key, newValue);
                updateHistory(groupName, key, message);
            } else{
                addChange({[groupName]: {[key]:newValue}})
                addHistory({[groupName]: {[key]:message}})
            }
        }
       
    }

    const handleChange = (event) => {
        var key = topic;
        var oldValue = originalValue;
        var newValue = event.target.value;
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
                        <FormLabel className="hmi-form-label" htmlFor={group + topic}>{topic}</FormLabel>
                        <FormInputText
                            className='hmi-form-input'
                            id={group + topic}
                            placeholder={originalValue}
                            value={value}
                            style={GetBackGroundColor(valueChanged)}
                            onChange={handleChange}
                            />
                </FormItem>
        </>
    )
}

export default FormInputTextSetting