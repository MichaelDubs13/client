import useDeviceStore from "../../../../store/deviceStore";
import React, { useState,  useEffect } from "react";
import {Button, Loader,} from "@tesla/design-system-react";
import useAuthStore from "../../../../store/authStore";
import FormInputCheckBoxSetting from "../util/FormInputCheckBoxSetting";
import FormInputTextSetting from "../../util/FormInputTextSetting";
import FormInputPasswordSetting from "../../util/FormInputPasswordSetting";

const UpdatePlcSettingsForm = ({id, plc}) => {
    const {user} = useAuthStore();
    const updatePlcSettingsById = useDeviceStore((state) => state.updatePlcSettingsById);
    const fetchPLC = useDeviceStore((state) => state.fetchPLC);
    const [isLoading, setIsLoading] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [changes, setChanges] = useState({});

    useEffect(()=>{
        const fetchData = async (id) =>{
            var plc = await fetchPLC(id);
        }
        fetchData(id);
    }, [rerender]);
    const handleSubmit = async (event) => {
        event.preventDefault()

        setIsLoading(true)
        const formData = new FormData();
        formData.set("data", JSON.stringify(changes));
        formData.set("user", JSON.stringify(user));
        var data = await updatePlcSettingsById(id, formData);
        setChanges({})
        setRerender(!rerender); 
        setIsLoading(false)
    }

    const handleEnableChanges = (key, value) => {
        if(!changes.hasOwnProperty(value))
        {
            setChanges({...changes, [key]:value})    
        } else {
            let newChanges = changes;
            newChanges[value] = value;
            setChanges(newChanges)
        }    
    }
 
    
return (
        <>
            <h2 style={{ marginBottom: "10px"}}>PLC Settings</h2>
            <Loader show={isLoading} contained={true}/>
            <FormInputCheckBoxSetting topic={"enable_report"} group={""} originalValue={plc.enable_report} handleChanges={handleEnableChanges} changes={changes}/>
            <FormInputCheckBoxSetting topic={"enable_codegen"} group={""} originalValue={plc.enable_codegen} handleChanges={handleEnableChanges} changes={changes}/>
            <FormInputTextSetting topic={"shop"} group={""} originalValue={plc.shop} handleChanges={handleEnableChanges} changes={changes}/>
            <FormInputTextSetting topic={"line"} group={""} originalValue={plc.line} handleChanges={handleEnableChanges} changes={changes}/>
            <FormInputTextSetting topic={"name"} group={""} originalValue={plc.name} handleChanges={handleEnableChanges} changes={changes}/>
            <FormInputTextSetting topic={"plc_username"} group={""} originalValue={plc.username} handleChanges={handleEnableChanges} changes={changes}/>
            <FormInputPasswordSetting topic={"plc_password"} group={""} originalValue={plc.password} handleChanges={handleEnableChanges} changes={changes}/>
            <div className="device-info">
                    <h5 className="device-info-key">Last Report Result: </h5>
                    <h5 className="device-info-text">{plc.last_update_succeeded ? "Succeeded" : "Failed" }</h5>
            </div>
            <div className="device-info">
                    <h5 className="device-info-key">Last Error: </h5>
                    <h5 className="device-info-text">{plc.last_report_error}</h5>
            </div>
            
            <Button 
                variant="secondary"
                style={{ marginTop: "20px"}}
                onClick={handleSubmit}>Update</Button>
        
        </>
    )
}

export default UpdatePlcSettingsForm; 