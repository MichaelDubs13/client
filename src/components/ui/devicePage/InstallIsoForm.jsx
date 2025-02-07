import React, { useState } from 'react';
import {FormItem, FormLabel,FormInputCheckbox, Button, Loader } from '@tesla/design-system-react';
import useTiaServerStore from '../../../store/TiaServerStore';



const InstallIsoForm = ({shop_id, line_id, onSubmit}) => {

    const [files, setFiles] = useState(["SiVarc_V18.iso", "Totally_Integrated_Automation_Portal_V18_Upd4.iso", "STARTDRIVE_ADVANCED_V18_SP2_UPD1.iso"]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const installISOs = useTiaServerStore((state)=> state.installISOs);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.set("data", JSON.stringify(selectedFiles));
       installISOs(shop_id,line_id, formData);  
       onSubmit();     
    }
    const handleChange = (event) => {
        if(event.target.checked){
            setSelectedFiles([...selectedFiles, event.target.value]);
        } else {
            setSelectedFiles(selectedFiles.filter(file => file != event.target.value))
        }   
        
    };
return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}></div>
            <h2 style={{ marginBottom: "10px"}}>Install ISOs</h2>
            <Loader show={isLoading} contained={true}/>
            {
                files.map(file => {
                    
                    return  <FormItem style={{display:"flex", alignItems:"center"}}> 
                                <FormLabel className="hmi-form-label"  htmlFor={file}>{file}</FormLabel>
                                <FormInputCheckbox type='checkbox' 
                                    value={file}
                                    onChange={handleChange}/>
                        </FormItem>
                })
            }
            <Button 
                style={{ marginTop: "20px"}}
                onClick={handleSubmit}>Install</Button>
        </>
    )
}

export default InstallIsoForm;