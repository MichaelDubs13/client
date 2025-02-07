import useDeviceStore from "../../../store/deviceStore";
import React, { useState,  useEffect } from "react";
import {Button, Loader } from "@tesla/design-system-react";
import HmiRow from "./HmiRow";
import HmiGroupRow from "./HmiGroupRow";
import HmiGeneralSettings from "./HmiGeneralSettings";
import useChangeHistoryStore from "../../../store/changeHistoryStore";
import useAuthStore from "../../../store/authStore";

const UpdateHmiSettingsForm = ({id}) => {
    const groups = useDeviceStore((state) => state.groups);
    const setGroups = useDeviceStore((state) => state.setGroups);
    const fetchHmiSettings = useDeviceStore((state) => state.fetchHmiSettings);
    const updateHmiSettingsById = useDeviceStore((state) => state.updateHmiSettingsById);
    const deviceSettings = useDeviceStore((state)=>state.deviceSettings);
    const hmiChangeHistory = useChangeHistoryStore((state) => state.hmiChangeHistory)
    const hmiChange = useChangeHistoryStore((state) => state.hmiChange)
    const clearHistory = useChangeHistoryStore((state) => state.clearHistory)
    const clearChange = useChangeHistoryStore((state) => state.clearChange)
    const addChange = useChangeHistoryStore((state) => state.addChange)
    const addHistory = useChangeHistoryStore((state) => state.addHistory)
    const {user} = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [rerender, setRerender] = useState(false);

    useEffect(()=>{
        const fetchData = async (id) =>{
            var settings = await fetchHmiSettings(id);
            clearHistory();
            clearChange();
            if(settings){
                setGroups(settings.Groups.Group)
            }
        }

        fetchData(id);
    }, [rerender]);

    const buildChangeLogMessage = (group)=> {
        return `Added new group ${group}`;
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(hmiChange.length > 0){
            setIsLoading(true)
            const formData = new FormData();
            formData.set("data", JSON.stringify(hmiChange));
            formData.set("user", JSON.stringify(user));
            var data = await updateHmiSettingsById(id, formData);
            setRerender(!rerender); 
            setIsLoading(false)
        }
    }

    const handleAddGroup = async(event)=>{
        event.preventDefault()
        var group = {
            Name : {_text: "NewGroup"},
            UserName:{_text: "Admin"},
            Pwd:{_text: "password"},
            Priority:{_text: "6"},
            IsNew:true,
        }
        setGroups([...groups, group])
        
        const message = buildChangeLogMessage(group.Name._text);
        addChange({[group.Name._text]: group})
        addHistory({[group.Name._text]: {group:message}})
    }
    
return (
        <>
            <h2 style={{ marginBottom: "10px"}}>HMI Settings</h2>
            <Loader show={isLoading} contained={true}/>
            <div style={{display: "flex", flexDirection: "column"}}>
            {
                deviceSettings &&
                <HmiRow 
                    list={
                        [<HmiGeneralSettings deviceSettings={deviceSettings}/>]
                    }
                    title="General"
                    isExpanded={true}
                />
            }
            {
                deviceSettings &&
                <HmiRow 
                    list={
                        groups?.map((group, index) => {
                            return <HmiGroupRow group={group} index={index}/>
                        })
                    }
                    title="Groups"
                    isExpanded={true}
                />
            }
                        {
                deviceSettings &&
                <HmiRow 
                    list={
                        hmiChangeHistory.map(history => {
                            return <tr>{Object.values(Object.values(history)[0])[0]}</tr>
                        })
                    }
                    title={`Pending Changes: ${hmiChangeHistory.length}`}
                    isExpanded={false}
                />
            }
            </div>
            <Button 
                variant="secondary"
                style={{ marginTop: "20px"}}
                onClick={handleAddGroup}>Add Group</Button>
            <Button 
                variant="secondary"
                style={{ marginTop: "20px"}}
                onClick={handleSubmit}>Update</Button>
        
        </>
    )
}

export default UpdateHmiSettingsForm;