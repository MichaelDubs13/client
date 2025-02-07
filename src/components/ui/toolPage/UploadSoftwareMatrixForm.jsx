import React, { useState } from 'react';
import { FormItem, FormLabel, Button, FormItemFileUpload } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import { BACKEND_URL } from '../../../lib/config.js';
import useJobStore from '../../../store/jobStore.js'; 

const UploadSoftwareMatrixForm = ({onSubmit}) => {
  const [file, setFile] = useState(null);
  const [path, setPath] = useState("");
  const {user} = useAuthStore()
  const createJob = useJobStore((state) => state.createJob);
  const {jobs} = useJobStore();


  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData();
    formData.set("file", file);

    try{
      const response = await fetch(`${BACKEND_URL}/jobs/testbench`, {
        method: "POST",
        body:formData
      });

      const parsedResponse = await response.json();
      if(response.ok){
        console.log("File uploaded");
      } else{
        console.error("Upload failed");
      }

      createNewJob(file.name);
    } catch(e){
      console.error(e.message);
    }
    
    onSubmit()
  };

  const handleFileChange = async (event) => {
    if(event.target.files){
      setPath(event.target.value);
      setFile(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  }  

  const createNewJob = (fileName) => {
    var currentdate = new Date();
    var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const jobId =  jobs.length > 0 ? (jobs[jobs.length-1].job_id + 1) : 1;

    const jobName = fileName;

    const payload = {
      "job_name": jobName,
      "job_description" : "TestBench",
      "created_at": datetime,
      "last_updated": datetime,
      "job_image" :  "",
      "user_id": 0,
      "job_id" : jobId,
      "job_pid": 0,
      "job_length": 100,
      "first_name": "Ziqiu",
      "email": "zili@tesla.com"
    };

    createJob(payload);
  }

  return (
    <>
    <div style={{display: "flex", flexDirection: "column"}}></div>
      <h2 style={{ marginBottom: "10px"}}>Upload New TestBench SoftwareMatrix</h2>
      <FormItem>
          <FormLabel htmlFor="excelPath">Software Matrix</FormLabel>
          <FormItemFileUpload
              id="excelPath"
              accept=".xlsx"
              multiple = {false}
              label="Select File"
              placeholder="Upload SoftwareMatrix"
              value={path}
              style={{ marginBottom: "5px"}}
              onChange={handleFileChange}/>
      </FormItem>
      <Button onClick={handleSubmit}>Upload</Button>
    </>
  );
};

export default UploadSoftwareMatrixForm;