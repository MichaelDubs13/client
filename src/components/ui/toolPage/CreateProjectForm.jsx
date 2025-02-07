import React, { useState, useEffect } from 'react';
import {FormItem, FormLabel, FormInputText, Button, FormItemFileUpload, FormInputDropdown, SwitchToggle, Loader } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import useJobStore from '../../../store/jobStore.js';
import useProjectStore from '../../../store/projectStore.js'; 
import * as XLSX from 'xlsx'
import IpListCheckerRow from './IpListCheckerRow.jsx';
import useDeviceStore from '../../../store/deviceStore.js';
import CreatableSelect from 'react-select/creatable';
import { templateOptions, stableTemplateProject, coatingProject, V17Project } from '../../../store/templateStore.js';
import { Icon, Tooltip, TooltipWrapper, useTooltipState } from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';


const CreateProjectForm = ({onSubmit}) => {
  const [showAdvancedSetting, setShowAdvancedSetting] = useState(false);
  const [softwareMatrixFile, setSoftwareMatrixFile] = useState(null);
  const [softwareMatrixPath, setSoftwareMatrixPath] = useState("");
  const [ipListPath, setIpListPath] = useState("");
  const [ipListFile, setIpListFile] = useState(null);
  const [worksheetOptions, setWorkSheetOptions] = useState([]);
  const [selectedWorksheet, setSelectedWorksheet] = useState('');
  const [selectedOutputServer, setSelectedOutputServer] = useState('Server59:http://sjc04p1tiaap59.teslamotors.com:8735');
  const [selectedInputServer, setSelectedInputServer] = useState('Server58:http://sjc04p1tiaap58.teslamotors.com:8735');
  const [inputServer, setInputServer] = useState('http://sjc04p1tiaap58.teslamotors.com:8735');
  const [selectedInputProject, setSelectedInputProject] = useState(stableTemplateProject);
  const {user, isAuthenticated} = useAuthStore();
  const [selectedOutput, setSelectedOutput] = useState('Multiuser'); 
  const [selectedTemplate, setSelectedTemplate] = useState(stableTemplateProject); 
  const [selectedHmi, setSelectedHmi] = useState("HMI01_Clean(22inch)"); 
  const [projectName, setProjectName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [compile, setCompile] = useState(false);
  const [clearHardware, setClearHardware] = useState(false);
  const [buildHmi, setBuildHmi] = useState(true);
  const [ipListRows, setIpListRows] = useState([]);
  const [lines, setLines] = useState([]);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const createJob =  useJobStore((state) => state.createJob);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const projects = useProjectStore((state) => state.projects);
  const fetchLines = useDeviceStore((state) => state.fetchLines);
  const outputOptions = ["Multiuser", "SharePoint"];
  const hmiOptions = ["HMI01_Clean(22inch)", "HMI02_Clean(15inch)"];
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const getLines= async()=>{
        const data = await fetchLines("all");
        setLines(data);
    }
    getLines();
  }, []);

  const handleOutputOptionSelect = async (event) =>{
    setSelectedOutput(event.value);
  };

  const handleTemplateOptionSelect = async (event) =>{
    setSelectedTemplate(event.value);
    setSelectedInputProject(event.value);
  };
  const handleHmiOptionSelect = async (event) =>{
    setSelectedHmi(event.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData();
    const payload = createPayload();
    formData.set("softwareMatrixFile", softwareMatrixFile);
    formData.set("ipListFile", ipListFile);
    formData.set("data", JSON.stringify(payload));
    await createJob(formData);
    fetchJobs();

    onSubmit()
  };

  const handleProjectNameChange = async (event) => {
    setProjectName(event.target.value);
  }

  const handleUserEmailChange = async (event) => {
    setUserEmail(event.target.value);
  }
  const handleWorksheetOptionChange = async (event) => {
    setSelectedWorksheet(event.value);
  }
  const handleOutputServerOptionChange = async (event) => {
    setSelectedOutputServer(`${event.name}:${event.server}`);
  }
  const handleInputServerOptionChange = async (event) => {
    setSelectedInputServer(`${event.name}:${event.server}`);
    setInputServer(`${event.server}`)
    const url = encodeURIComponent(`${event.server}`);
    setIsLoading(true);
    await fetchProjects(url);
    setIsLoading(false);
  }
   
  const handleInputProjectChange= async (event) => {
    setSelectedInputProject(`${event.name}`);
  }

  const handleSoftwareMatrixUpload = async (event) => {
    if(event.target.files){
      const file = event.target.files[0];
      const fileNames = file.name.split('.');
      const newFileName = `${fileNames[0]}_${Date.now()}.${fileNames[1]}`;
      const newFile = new File([file], newFileName, { type: file.type });
      setSoftwareMatrixPath(event.target.value);
      setSoftwareMatrixFile(newFile);
    }
  }  
  const handleIpListUpload = async (event) => {
    if(event.target.files){
      const file = event.target.files[0];
      const fileNames = file.name.split('.');
      const newFileName = `${fileNames[0]}_${Date.now()}.${fileNames[1]}`;
      const newFile = new File([file], newFileName, { type: file.type });
      setIpListPath(event.target.value);
      setIpListFile(newFile);
      await checkIpList(event.target.files[0]);
    }
  }  
  const handleSwitchSettingChange = async(event)=>{
    setShowAdvancedSetting(!showAdvancedSetting);

    const url = encodeURIComponent(`${inputServer}`);
    await fetchProjects(url);
  }
  const handleSwitchCompileChange = async(event)=>{
    setCompile(!compile);
  }
  const handleSwitchBuildHmiChange = async(event)=>{
    setBuildHmi(!buildHmi);
  }
  const handleSwitchClearHardwareChange = async(event)=>{
    setClearHardware(!clearHardware);
  }
  const getParam = (softwareMatrixPath, ipListPath, jobName) =>{
    //define application param
    const inputProject = selectedInputProject.split('(');
    const inputProjectName = inputProject[0];
    let useStableVersion = false;
    if(inputProject.length > 1) {
      useStableVersion = true;
    }
    let version = selectedTemplate === V17Project ? "V17" : "V18"
    var applicationPath = "C:\\CodeGen\\ProjectChangeLog.exe";
    var arg1 = `--CodeGenBuild_${version}`;
    var arg2 = softwareMatrixPath;
    var arg3 = ipListPath;
    var arg4 = jobName;
    var arg5 = userEmail;
    var arg6 = selectedHmi?.replace(/ *\([^)]*\) */g, "");
    var arg7 = compile;
    var arg8 = buildHmi;
    var arg9 = clearHardware;
    var arg10 = selectedWorksheet;
    var arg11 = selectedOutputServer;
    var arg12 = selectedInputServer;
    var arg13 = inputProjectName;
    var arg14 = useStableVersion;
    var args = [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14]
    
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
    const jobName = projectName.trim();
    const param = getParam("","", jobName);
    const payload = {
      "job_name": jobName,
      "job_description" : "CodeGen",
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
  const checkIpList = async (file) =>{
    const defaultWorksheet = "Local IP";
    var reader = new FileReader();
      reader.onload = function(event) {
        var data = event.target.result;
        const wb = XLSX.read(data, {type:'binary'});

        setWorkSheetOptions(wb.SheetNames)
        if(wb.SheetNames.includes(defaultWorksheet)){
          setSelectedWorksheet(defaultWorksheet);
        }
        var arr = XLSX.utils.sheet_to_json(wb.Sheets[defaultWorksheet]);
        setIpListRows(arr);
      }
      reader.readAsBinaryString(file)
  }
  return (
    
    <>
    
      <div style={{display: "flex", flexDirection: "column"}}>
        <h2 style={{ marginBottom: "10px"}}>
            Create New Project
            <TooltipWrapper
                {...handlersTip}
                wrapperRef={wrapperRefTip}
                inline
                className="tds-text--regular tds-text--contrast-medium tds-density--dense"
                >
                <button>
                    <Icon size="large" data={iconInfo} inline align="text-middle" />
                </button>

                <Tooltip open={openTip} align="start" orientation="down">
                    <p>Select Template {stableTemplateProject} for latest projects</p>
                    <p>Select Template {coatingProject} for coating projects</p>
                    <p>Select Template {V17Project} for V17 projects</p>
                    <p>Enter a project name to generate the project under the selected server, if the project name already exist on the selected server, code gen will override the project on the server</p>
                </Tooltip>
        </TooltipWrapper>
        </h2>
        <Loader show={isLoading} contained={true}/>
        <FormItem>
            <FormLabel htmlFor="softwareMatrix">Software Matrix</FormLabel>
            <FormItemFileUpload
                id="softwareMatrix"
                accept=".xlsx, .xlsm"
                multiple = {false}
                label="Select File"
                placeholder="Upload SoftwareMatrix"
                value={softwareMatrixPath}
                style={{ marginBottom: "5px"}}
                onChange={handleSoftwareMatrixUpload}/>
        </FormItem>
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
            <FormLabel htmlFor="worksheet">IP List Worksheet</FormLabel>
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
                  <FormLabel htmlFor="hmi">HMI</FormLabel>
                  <FormInputDropdown
                      id="hmi"
                      label="hmi"
                      onOptionSelect={handleHmiOptionSelect}
                      options={hmiOptions}
                      placeholder="output"
                      selected={selectedHmi}
                      style={{ marginBottom: "5px"}}
                    ></FormInputDropdown>
              </FormItem>
          <FormItem>
          <FormLabel htmlFor="projectName">Project Name</FormLabel>
          <FormInputText
            id="projectName"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={handleProjectNameChange}
          />
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
        <IpListCheckerRow rows={ipListRows} setRows={setIpListRows}/>
        <SwitchToggle 
                className='toggle-switch' 
                trueLabel='Advanced' 
                value={showAdvancedSetting} 
                onChange={handleSwitchSettingChange} />
        {
            showAdvancedSetting && 
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
              
              <div style={{display:'flex', direction:'row'}}>
                <SwitchToggle 
                  className='toggle-switch' 
                  trueLabel='Compile' 
                  value={compile} 
                  onChange={handleSwitchCompileChange}/>
                  <SwitchToggle 
                  className='toggle-switch' 
                  trueLabel='Build HMI' 
                  defaultValue={true}
                  defaultChecked={true}
                  value={buildHmi} 
                  onChange={handleSwitchBuildHmiChange}/>
                  <SwitchToggle 
                  className='toggle-switch' 
                  trueLabel='Clear Hardware' 
                  value={clearHardware} 
                  onChange={handleSwitchClearHardwareChange}/>
              </div>
              <FormItem>
                  <FormLabel htmlFor="output">Output</FormLabel>
                  <FormInputDropdown
                      id="output"
                      label="output"
                      onOptionSelect={handleOutputOptionSelect}
                      options={outputOptions}
                      placeholder="output"
                      selected={selectedOutput}
                      style={{ marginBottom: "5px"}}
                    ></FormInputDropdown>
              </FormItem>
              <FormItem>
            <FormLabel htmlFor="outputServer">Output Server</FormLabel>
                <CreatableSelect 
                  selectOption
                  options={lines} 
                  getOptionLabel={(line) => `${line.name} : ${line.server}`}
                  getOptionValue={(line) => `${line.name} : ${line.server}`}
                  onChange={handleOutputServerOptionChange}
                  placeholder={selectedOutputServer}
                  selected={selectedOutputServer}
                  isValidNewOption={() => false}
                  style={{ marginBottom: "5px"}}
                  />
            </FormItem>
            <FormLabel htmlFor="inputServer">Template Server</FormLabel>
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
            <FormLabel htmlFor="inputProject">Template Project</FormLabel>
                <CreatableSelect 
                  selectOption
                  options={projects} 
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
            onClick={handleSubmit}>Create Project</Button>
      </div>
    
    
    </>
  );
};

export default CreateProjectForm;