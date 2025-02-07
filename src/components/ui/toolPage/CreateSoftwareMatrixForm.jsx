import React, { useState, useEffect } from 'react';
import {FormItem, FormLabel, FormInputText, Button, FormItemFileUpload, FormInputDropdown } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import useJobStore from '../../../store/jobStore.js';
import * as XLSX from 'xlsx'
import { templateOptions, stableTemplateProject } from '../../../store/templateStore.js';
import { Icon, Tooltip, TooltipWrapper, useTooltipState } from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';


const CreateSoftwareMatrixForm = ({onSubmit}) => {
  const [ipListPath, setIpListPath] = useState("");
  const [ipListFile, setIpListFile] = useState(null);
  const {user, isAuthenticated} = useAuthStore();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [worksheetOptions, setWorkSheetOptions] = useState([]);
  const [selectedWorksheet, setSelectedWorksheet] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(stableTemplateProject); 
  const createJob =  useJobStore((state) => state.createJob);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const {
    open: openTip,
    handlers: handlersTip,
    wrapperRef: wrapperRefTip,
  } = useTooltipState({ initialOpen: false });
  
  useEffect(() => {
    if (isAuthenticated === true) {
      setUserEmail(user.email);
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData();
    const payload = createPayload(ipListFile.name);
    formData.set("ipListFile", ipListFile);
    formData.set("data", JSON.stringify(payload));
    await createJob(formData);
    fetchJobs();

    onSubmit()
  };
  const handleTemplateOptionSelect = async (event) =>{
    setSelectedTemplate(event.value);
  };
  const handleUserEmailChange = async (event) => {
    setUserEmail(event.target.value);
  }
  const handleWorksheetOptionChange = async (event) => {
    setSelectedWorksheet(event.value);
  }
  const handleIpListUpload = async (event) => {
    event.preventDefault();
    if(event.target.files){
      var file = event.target.files[0];
      setIpListPath(event.target.value);
      setIpListFile(file);

      var reader = new FileReader();
      reader.onload = function(event) {
        var data = event.target.result;
        const wb = XLSX.read(data, {type:'binary'});

        setWorkSheetOptions(wb.SheetNames)
        if(wb.SheetNames.includes("Local IP")){
          setSelectedWorksheet("Local IP");
        }}
      reader.readAsBinaryString(file)
    }
  }
  
  const getParam = (ipListPath, worksheet) =>{
    const inputProject = selectedTemplate.split('(');
    const inputProjectName = inputProject[0];
    let useStableVersion = false;
    if(inputProject.length > 1) {
      useStableVersion = true;
    }
    var applicationPath = "C:\\CodeGen\\ProjectChangeLog.exe";
    var arg1 = `--CreateSoftwareMatrix`;
    var arg2 = ipListPath;
    var arg3 = worksheet;
    var arg4 = userEmail;
    var arg5 = inputProjectName;
    var args = [arg1, arg2, arg3, arg4, arg5]
    
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
    const jobName = "CreateSoftwareMatrix";
    const param = getParam(ipListPath, selectedWorksheet);
    const payload = {
      "job_name": jobName,
      "job_description" : "CreateSoftwareMatrix",
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
      <h2 style={{ marginBottom: "10px"}}>
        Create SoftwareMatrix
        <TooltipWrapper
                {...handlersTip}
                wrapperRef={wrapperRefTip}
                inline
                className="tds-text--regular tds-text--contrast-medium tds-density--dense"
                >
                <button>
                    <Icon size="large" data={iconInfo} inline align="text-middle" />
                </button>

                <Tooltip open={openTip} align="start">
                    <p>Create "Software Matrix" will lookup configured devices in ip list and use "SoftwareMatrixMap" tab from IP List to generate a software matrix</p>
                </Tooltip>
        </TooltipWrapper>
      </h2>
      <FormItem>
          <FormLabel htmlFor="ipList">IP List</FormLabel>
          <FormItemFileUpload
              id="ipList"
              accept=".xlsm"
              multiple = {false}
              label="Select File"
              placeholder="Upload IP List"
              value={ipListPath}
              style={{ marginBottom: "5px"}}
              onChange={handleIpListUpload}/>
      </FormItem>
      <FormItem>
          <FormLabel htmlFor="worksheet">Worksheet</FormLabel>
          <FormInputDropdown
              id="worksheet"
              label="worksheet"
              onOptionSelect={handleWorksheetOptionChange}
              options={worksheetOptions}
              placeholder=""
              selected={selectedWorksheet}
              style={{ marginBottom: "5px"}}
            ></FormInputDropdown>
      </FormItem>
      <FormItem>
            <FormLabel htmlFor="template">Template</FormLabel>
            <FormInputDropdown
                id="template"
                label="template"
                onOptionSelect={handleTemplateOptionSelect}
                options={templateOptions}
                placeholder= {stableTemplateProject}
                selected={selectedTemplate}
                style={{ marginBottom: "5px"}}
              ></FormInputDropdown>
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
      <Button onClick={handleSubmit}>Create Software Matrix</Button>
    </>
  );
};

export default CreateSoftwareMatrixForm;