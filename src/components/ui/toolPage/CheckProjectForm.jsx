import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Loader, FormItem, FormLabel, FormInputText, Button} from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import useProjectStore from '../../../store/projectStore.js'; 
import useJobStore from '../../../store/jobStore.js';
import useDeviceStore from '../../../store/deviceStore.js';

const CheckProjectForm = ({onSubmit}) => {
    const {user, isAuthenticated} = useAuthStore()
    const [selectedUrl, setSelectedUrl] = useState(); 
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedVersion, setSelectedVersion] = useState("");
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const projects = useProjectStore((state) => state.projects);
    const fetchProjects = useProjectStore((state) => state.fetchProjects);
    const [lines, setLines] = useState([]);
    const fetchLines = useDeviceStore((state) => state.fetchLines);
    const fetchJobs = useJobStore((state) => state.fetchJobs);
    const createJob =  useJobStore((state) => state.createJob);

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

    const handleUserEmailChange = async (event) => {
      setUserEmail(event.target.value);
    }

    const handleUrlSelect = async (event) =>{
      if(event)
        {
          setSelectedUrl(event.server);
          //fetch projects in the server
          const url = encodeURIComponent(`${event.server}`);
          //console.log(selectedUrl)
          setIsLoading(true);
          await fetchProjects(url);
          setIsLoading(false);
        }  
  };

  const handleProjectSelect = (event) =>{
    const {value, name} = event.target;
      setSelectedProject(name);
      setSelectedVersion(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    const payload = createPayload();
    formData.set("data", JSON.stringify(payload));
    await createJob(formData);
    fetchJobs();
    onSubmit()
  };

  const getParam = (server, project, version) =>{
    //define application param
    var applicationPath = "C:\\CodeGen\\ProjectChangeLog.exe";
    var version = version.split('.')[0]
    var arg1 = `--StaticAnalyzerCheck_V${version}`;
    var arg2 = server;
    var arg3 = project;
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
    const jobName = selectedProject;
    console.log(selectedUrl)
    console.log(selectedProject)
    const param = getParam(selectedUrl, selectedProject, selectedVersion);
    const payload = {
      "job_name": jobName,
      "job_description" : "StaticAnalyzer",
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
      <h2 style={{ marginBottom: "10px"}}>Check Project</h2>
      <Loader show={isLoading} contained={true}/>
      <FormItem>
        <FormLabel htmlFor="userEmail">User Email</FormLabel>
        <FormInputText
          id="userEmail"
          placeholder="Enter User Email"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
      </FormItem>
      <FormItem>
          <FormLabel htmlFor="server">Server</FormLabel>
            <CreatableSelect 
            isClearable 
            selectOption
            options={lines} 
            getOptionLabel={(line) => `${line.name} : ${line.server}`}
            getOptionValue={(line) => `${line.name} : ${line.server}`}
            onChange={handleUrlSelect}
            isValidNewOption={() => false}
            //onCreateOption={handleCreate}
            style={{ marginBottom: "5px"}}
            />
      </FormItem>
      <FormItem> 
        <div style={{ display: "flex", flexDirection: "column" }}>
          { projects.map( ( project, key) =>  {
            return(
              <label key={"Label"+ key}>
                <input type="radio" 
                  name={project.name}
                  key={"projectChoice" + key}
                  value={project.version}
                  onChange ={(evt)=>handleProjectSelect(evt)}
                  style={{marginRight: "10px"}}/>
                {project.name}
              </label>
            )})
          }
          </div>
      </FormItem>
      <Button 
      onClick={handleSubmit}
      style={{marginTop: "10px"}}
      >Check Project</Button>
    </>
  );
};

export default CheckProjectForm;