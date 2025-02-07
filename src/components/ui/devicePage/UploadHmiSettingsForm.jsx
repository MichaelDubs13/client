import React, { useState, useEffect } from 'react';
import {FormItem, FormLabel,FormItemFileUpload, Button, Loader, TBody, Table, DataTH, DataTable } from '@tesla/design-system-react';
import { PiCircleFill } from "react-icons/pi";
import {IconContext} from "react-icons";
import useDeviceStore from '../../../store/deviceStore';
import PrivateRoute from "../../auth/privateRoute";
import useAuthStore from '../../../store/authStore';
const FormData = require('form-data');
const checkIpAddress = (ip) => {
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Pattern.test(ip);
}


const UploadHmiSettingsForm = ({hosts}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hmiSettingFile, setHmiSettingFile] = useState(null);
    const [hmiSettingPath, setHmiSettingPath] = useState("");
    const [HMIs, setHMIs] = useState([]);
    const uploadHmiSettings= useDeviceStore((state) => state.uploadHmiSettings);
    const {user} = useAuthStore();
     
    useEffect(()=>{
        setHMIs(hosts);
    }, [hosts]);

    const handleSubmit = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.set("user", JSON.stringify(user));
        formData.set("hosts", JSON.stringify(hosts));
        formData.set("data", hmiSettingFile);
        
        var results = await uploadHmiSettings(formData);

        var updatedHMIs = HMIs
        results[0].forEach(result => {
            var hmi = HMIs.find(hmi => hmi.ipAddress === result.ipAddress);
            
            if(hmi){
                hmi['result'] = result.result
                hmi['reason'] = result.reason
                updatedHMIs = updatedHMIs.map(item => item.ipAddress == hmi.ipAddress ? hmi : item);
            }
        })

        setHMIs(updatedHMIs);
        setIsLoading(false);
    }

    const handleHmiSettingUpload = async (event) => {
        event.preventDefault();
        if(event.target.files){
            var file = event.target.files[0];
            setHmiSettingPath(event.target.value);
            setHmiSettingFile(file);
            setHMIs(hosts);
        }
    }



    
return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}></div>
            <h2 style={{ marginBottom: "10px"}}>Selected HMIs</h2>
            <Loader show={isLoading} contained={true}/>
            <PrivateRoute >
                <DataTable border={4} style={{width:"1500px", float:"right", marginBottom:"40px"}}>
                    <thead>
                        <tr>                        
                            <DataTH sortable={true} key="name">Name</DataTH>
                            <DataTH sortable={true} key="ipAddress">IP ADDRESS</DataTH>
                            <DataTH sortable={true} key="device">Result</DataTH>
                            <DataTH sortable={true} key="reason">Reason</DataTH>
                        </tr>
                    </thead>
                    <TBody>
                    {
                        HMIs.map((host) => {
                        return <tr className={`tr-block`}>
                                    <td className='td-device'>{host.name}</td>
                                    <td className='td-device'>{host.ipAddress}</td>
                                    <td className='td-device'>
                                        <div>
                                            <a href="#" title= {host.result? "completed" : "failed"}> 
                                                <IconContext.Provider value={host.result? { color:"lightgreen", size:30 } : { color:"red", size:30 }}>
                                                    <PiCircleFill/>
                                                </IconContext.Provider> 
                                            </a>
                                        </div>
                                    </td>
                                    <td className='td-device'>{host.reason}</td>
                            </tr>
                        })
                    }
                    </TBody>
                </DataTable>
                <FormItem>
                    <FormLabel htmlFor="hmiList">HMI Settings</FormLabel>
                    <FormItemFileUpload
                        id="hmiList"
                        accept=".xml"
                        multiple = {false}
                        label="Select File"
                        placeholder="Upload HMI Settings"
                        value={hmiSettingPath}
                        style={{ marginBottom: "5px"}}
                        onChange={handleHmiSettingUpload}/>
                </FormItem>

                <Button 
                    variant="secondary"
                    style={{ marginTop: "20px", width:"200px"}}
                    onClick={handleSubmit}>Upload</Button>
            </PrivateRoute>
        </>
    )
}

export default UploadHmiSettingsForm;