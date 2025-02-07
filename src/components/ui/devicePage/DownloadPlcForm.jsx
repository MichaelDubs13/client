import React, { useState, useEffect } from 'react';
import {FormItem, FormLabel, FormInputText, Button, FormItemFileUpload, FormInputDropdown } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import useJobStore from '../../../store/jobStore.js';


const DownloadPlcForm = ({device,onSubmit}) => {
  const {user, isAuthenticated} = useAuthStore();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');  
  const createJob =  useJobStore((state) => state.createJob);

  
  useEffect(() => {
    if (isAuthenticated === true) {
      setUserEmail(user.email);
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  const handleUserEmailChange = async (event) => {
    setUserEmail(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    const payload = createPayload();
    formData.set("data", JSON.stringify(payload));
    await createJob(formData);
    onSubmit();
}

const getParam = () =>{
    //define application param
    var applicationPath = "C:\\CodeGen\\ProjectChangeLog.exe";
    var arg1 = `--CreatePlcDownloadLink`;
    var arg2 = device.serverName;
    var arg3 = device.name;
    var arg4 = userEmail;
    var arg5 = "";
    var arg6 = "";
    var args = [arg1, arg2, arg3, arg4, arg5, arg6]
    
    return {applicationPath, args}
}
  const createPayload = () => {
    var currentdate = new Date();
    var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const jobName = "CreatePlcDownloadLink";
    const param = getParam();
    const payload = {
      "job_name": jobName,
      "job_description" : "CreatePlcDownloadLink",
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
      <h2 style={{ marginBottom: "10px"}}>Download PLC program</h2>
      <FormLabel htmlFor="description1">This will create a download link under \\coreautomation\Siemens\Automation\PlcDownloads</FormLabel>
      <FormLabel htmlFor="description2">You will receive a email notification when download link is ready ~3mins</FormLabel>
      <div style={{marginTop:"15px"}}/>
      <FormItem>
        <FormLabel htmlFor="userEmail">User Email</FormLabel>
        <FormInputText
          id="userEmail"
          placeholder="Enter User Email"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
      </FormItem>
      <Button onClick={handleSubmit}>Create</Button>
    </>
  );
};

export default DownloadPlcForm;