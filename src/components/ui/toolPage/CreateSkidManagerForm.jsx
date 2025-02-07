import React, { useState, useEffect } from 'react';
import {FormItem, FormLabel, FormInputText, Button, FormItemFileUpload, FormInputDropdown, Loader } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import useJobStore from '../../../store/jobStore.js';
import useProjectStore from '../../../store/projectStore.js'; 
import useDeviceStore from '../../../store/deviceStore.js';
import * as XLSX from 'xlsx'
import CreatableSelect from 'react-select/creatable';


const CreateSkidManagerForm = ({onSubmit}) => {
  const [skidManagerPath, setSkidManagerPath] = useState("");
  const [skidManagerFile, setSkidManagerFile] = useState(null);
  const [worksheetOptions, setWorkSheetOptions] = useState([]);
  const [enabledProjects, setEnabledProjects] = useState([]);
  const [selectedWorksheet, setSelectedWorksheet] = useState('');
  const [selectedInputServer, setSelectedInputServer] = useState('Server59:http://sjc04p1tiaap59.teslamotors.com:8735');
  const [selectedInputProject, setSelectedInputProject] = useState("");
  const {user, isAuthenticated} = useAuthStore();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [lines, setLines] = useState([]);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const createJob =  useJobStore((state) => state.createJob);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const fetchLines = useDeviceStore((state) => state.fetchLines);
  const [isLoading, setIsLoading] = useState(false);
  

  
  
  useEffect(() => {
    if (isAuthenticated === true) {
      setUserEmail(user.email);
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  useEffect(() => {
    const getLines= async()=>{
        const data = await fetchLines("all");
        //temp only allow server59
        const server = "http://sjc04p1tiaap59.teslamotors.com:8735";
        setLines([server,]);
        const url = encodeURIComponent(`${server}`);
        var projects = await fetchProjects(url);
        //var enabledProjects = projects.filter(project=> project.enable_codegen) 
        setEnabledProjects(projects);
    }
    getLines();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData();
    const payload = createPayload(skidManagerFile.name);
    formData.set("skidManagerFile", skidManagerFile);
    formData.set("data", JSON.stringify(payload));
    await createJob(formData);
    fetchJobs();

    onSubmit()
  };

  const handleUserEmailChange = async (event) => {
    setUserEmail(event.target.value);
  }
  const handleWorksheetOptionChange = async (event) => {
    setSelectedWorksheet(event.value);
  }
  const handleInputServerOptionChange = async (event) => {
    setSelectedInputServer(`${event.name}:${event.server}`);
    const url = encodeURIComponent(`${event.server}`);
    setIsLoading(true);
    var projects = await fetchProjects(url);
    //var enabledProjects = projects.filter(project=> project.enable_codegen) 
    setEnabledProjects(projects);
    setIsLoading(false);
  }
   
  const handleInputProjectChange= async (event) => {
    setSelectedInputProject(`${event.name}`);
  }

  const handleSkidManagerUpload = async (event) => {
    if(event.target.files){
      setSkidManagerPath(event.target.value);
      setSkidManagerFile(event.target.files[0]);
      await checkExcel(event.target.files[0]);
    }
  }  
 
  const getParam = (jobName) =>{
    //define application param
    var applicationPath = "C:\\CodeGen\\ProjectChangeLog.exe";
    var arg1 = `--CreateSkidManager`;
    var arg2 = skidManagerPath;
    var arg3 = jobName;
    var arg4 = userEmail;
    var arg5 = selectedWorksheet;
    var arg6 = selectedInputServer;
    var arg7 = selectedInputProject;

    var args = [arg1, arg2, arg3, arg4, arg5, arg6, arg7]
    
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
    const jobName = selectedInputProject;
    const param = getParam(jobName);
    const payload = {
      "job_name": jobName,
      "job_description" : "CreateSkidManager",
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
  const checkExcel = async (file) =>{
    const defaultWorksheet = "V2 Template";
    var reader = new FileReader();
      reader.onload = function(event) {
        var data = event.target.result;
        const wb = XLSX.read(data, {type:'binary'});

        setWorkSheetOptions(wb.SheetNames)
        if(wb.SheetNames.includes(defaultWorksheet)){
          setSelectedWorksheet(defaultWorksheet);
        }
      }
      reader.readAsBinaryString(file)
  }
  return (
    
    <>
    
      <div style={{display: "flex", flexDirection: "column"}}>
        <h2 style={{ marginBottom: "10px"}}>Import Skid Manager</h2>
        <Loader show={isLoading} contained={true}/>
        <FormItem>
            <FormLabel htmlFor="skidManager">SkidManager Configuration</FormLabel>
            <FormItemFileUpload
                id="skidManager"
                accept=".xlsm"
                multiple = {false}
                label="Select File"
                placeholder="Upload Skid Manager Config"
                value={skidManagerPath}
                style={{ marginBottom: "5px"}}
                onChange={handleSkidManagerUpload}/>
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
   
        {

            <div>
              <FormItem>
                <FormLabel htmlFor="userEmail">User Email</FormLabel>
                <FormInputText
                  id="userEmail"
                  placeholder="Enter User Email"
                  value={userEmail}
                  onChange={handleUserEmailChange}
                />
              </FormItem>
           
            <FormLabel htmlFor="inputServer">Source Server</FormLabel>
                <CreatableSelect 
                  selectOption
                  options={lines} 
                  getOptionLabel={(line) => `${line.name} : ${line.server}`}
                  getOptionValue={(line) => `${line.name} : ${line.server}`}
                  onChange={handleInputServerOptionChange}
                  placeholder={selectedInputServer}
                  selected={selectedInputServer}
                  isValidNewOption={() => false}
                  style={{ marginBottom: "5px"}}
                  />
            <FormLabel htmlFor="inputProject">Source Project</FormLabel>
                <CreatableSelect 
                  selectOption
                  options={enabledProjects} 
                  getOptionLabel={(project) => `${project.name}`}
                  getOptionValue={(project) => `${project.name}`}
                  onChange={handleInputProjectChange}
                  placeholder={selectedInputProject}
                  selected={selectedInputProject}
                  isValidNewOption={() => false}
                  style={{ marginBottom: "5px"}}
                  />
            </div>
        }
        
        <Button 
            style={{ marginTop: "20px"}}
            onClick={handleSubmit}>Create</Button>
      </div>
    
    
    </>
  );
};

export default CreateSkidManagerForm;