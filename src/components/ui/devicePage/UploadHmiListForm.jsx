import React, { useState } from 'react';
import {FormItem, FormLabel,FormItemFileUpload, Button, Loader } from '@tesla/design-system-react';
import * as XLSX from 'xlsx'
import useDeviceStore from '../../../store/deviceStore';
const FormData = require('form-data');

const checkIpAddress = (ip) => {
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Pattern.test(ip);
}


const UploadHmiListForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hmiListFile, sethmiListFile] = useState(null);
    const [hmiListPath, setHmiListPath] = useState("");
    const [devices, setDevices] = useState([]);
    const createHMIs = useDeviceStore((state) => state.createHMIs);
     
    const handleSubmit = async () => {
       setIsLoading(true);
       const formData = new FormData();
       formData.set("data", JSON.stringify(devices));
       await createHMIs(formData);
       setIsLoading(false);
    }

    const handleHmiListUpload = async (event) => {
        event.preventDefault();
        if(event.target.files){
            var file = event.target.files[0];
            setHmiListPath(event.target.value);
            sethmiListFile(file);
            var deviceInfos = [];
            var reader = new FileReader();
            reader.onload = function(event) {
            var data = event.target.result;
            const wb = XLSX.read(data, {type:'binary'});
            const ipListCol = 0;
            const nameCol = 1;
            const plcCol = 14;
            for (const [key, value] of Object.entries(wb.Sheets)) {
                const data = XLSX.utils.sheet_to_json(value, {header:1});
                
                data.map((row) => {
                    if(row.length > 13){
                        if(checkIpAddress(row[ipListCol]) && row[plcCol] && row[ipListCol] && row[nameCol]){
                            deviceInfos.push({device:row[nameCol], ipAddress:row[ipListCol], plc:row[plcCol]})
                        }
                    }        
                })
            }}

            reader.readAsBinaryString(file);
            setDevices(deviceInfos);
        }
    }



    
return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}></div>
            <h2 style={{ marginBottom: "10px"}}>Upload HMI List</h2>
            <Loader show={isLoading} contained={true}/>
            <FormItem>
                <FormLabel htmlFor="hmiList">HMI List</FormLabel>
                <FormItemFileUpload
                    id="hmiList"
                    accept=".xlsx"
                    multiple = {false}
                    label="Select File"
                    placeholder="Upload HMI List"
                    value={hmiListPath}
                    style={{ marginBottom: "5px"}}
                    onChange={handleHmiListUpload}/>
            </FormItem>

            <Button 
                style={{ marginTop: "20px"}}
                onClick={handleSubmit}>Upload</Button>
        </>
    )
}

export default UploadHmiListForm;