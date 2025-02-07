import React, { useState, useEffect } from 'react';
import {FormItem, FormLabel, FormInputText, Button, FormItemFileUpload, FormInputDropdown } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import useJobStore from '../../../store/jobStore.js';
import * as XLSX from 'xlsx'


const CreatePtpForm = ({onSubmit}) => {
  const [ptpPath, setPtpPath] = useState("");
  const [ptpFile, setPtpFile] = useState(null);
  const {user, isAuthenticated} = useAuthStore();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');  
  const createJob =  useJobStore((state) => state.createJob);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  
  useEffect(() => {
    if (isAuthenticated === true) {
      setUserEmail(user.email);
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData();
    const payload = createPayload(ptpFile.name);
    formData.set("ptpFile", ptpFile);
    formData.set("data", JSON.stringify(payload));
    await createJob(formData);
    fetchJobs();

    onSubmit()
  };

  const handleUserEmailChange = async (event) => {
    setUserEmail(event.target.value);
  }

  const handlePtpUpload = async (event) => {
    event.preventDefault();
    if(event.target.files){
      var file = event.target.files[0];
      setPtpPath(event.target.value);
      setPtpFile(file);

      var reader = new FileReader();
      reader.onload = function(event) {
        var data = event.target.result;
        const wb = XLSX.read(data, {type:'binary'});

      reader.readAsBinaryString(file)
    }
  }
  }
  
  const getParam = (filePath) =>{
    //define application param
    var applicationPath = "python";
    var arg1 = `--CreatePTP`;
    var arg2 = "D:\\ptp_fanuc_generator\\build_ptp_fanuc.py";
    var arg3 = userEmail;
    var arg4 = "";
    var arg5 = "";
    var arg6 = "";
    var args = [arg1, arg2, arg3, arg4, arg5, arg6]
    
    return {applicationPath, args}
}
  const createPayload = (fileName) => {
    var currentdate = new Date();
    var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const jobName = "CreatePTP";
    const param = getParam(ptpPath);
    const payload = {
      "job_name": jobName,
      "job_description" : "CreatePTP",
      "created_at": datetime,
      "last_updated": datetime,
      "job_image" :  "",
      "user_id": 0,
      "job_id" : 0,
      "job_pid" : 0,
      "job_length": 1000,
      "job_status": 0,
      "job_progress": 0,
      "record": "",
      "user_name": userName,
      "email": userEmail,
      "applicationPath": param.applicationPath,
      "args": param.args,
    };

    
    return payload;
  }

  return (
    <>
    <div style={{display: "flex", flexDirection: "column"}}></div>
      <h2 style={{ marginBottom: "10px"}}>PTP Generator</h2>
      <FormItem>
          <FormLabel htmlFor="ptp">PTP Configuration</FormLabel>
          <FormItemFileUpload
              id="ptp"
              accept=".xlsx"
              multiple = {false}
              label="Select File"
              placeholder="Upload PTP configuration"
              value={ptpPath}
              style={{ marginBottom: "5px"}}
              onChange={handlePtpUpload}/>
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="userEmail">User Email</FormLabel>
        <FormInputText
          id="userEmail"
          placeholder="Enter User Email"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
      </FormItem>
      <Button onClick={handleSubmit}>Create PTP</Button>
    </>
  );
};

export default CreatePtpForm;