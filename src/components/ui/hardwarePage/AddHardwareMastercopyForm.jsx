import React, { useState, useEffect } from 'react';
import { DataTH, DataTable, Button, FormInputSearch, TBody, Pagination, FormInputDropdown } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import useJobStore from '../../../store/jobStore.js'; 
import MastercopyRow from './MastercopyRow.jsx';
import useDeviceStore from '../../../store/deviceStore.js';
import TemplateMastercopyRow from './TemplateMastercopyRow.jsx';


const AddHardwareMastercopyForm = ({onSubmit}) => {
  const {user, isAuthenticated} = useAuthStore()
  const [viewTemplateMastercopy, setViewTemplateMastercopy] = useState(false)
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const createJob = useJobStore((state) => state.createJob);
  const[query, setQuery] = useState("");
  const [gsds, setGSDs] = useState([]);
  const mastercopyGsds = useDeviceStore((state) => state.mastercopyGsds);
  const fetchMissingGSDs = useDeviceStore((state) => state.fetchMissingGSDs);
  const fetchMastercopyGSDs = useDeviceStore((state) => state.fetchMastercopyGSDs);
  const fetchGsdFolders = useDeviceStore((state) => state.fetchGsdFolders);
  const itemRefs = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(40);
  const indexOfLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexOfLastPost - recordsPerPage;
  const filteredRecords = viewTemplateMastercopy ? mastercopyGsds.filter(gsd => !gsd.name.startsWith('ClosedXML')).filter((gsd) => gsd.name && gsd.name.toLowerCase().includes(query.toLowerCase())) : gsds.filter((gsd) => gsd.name && gsd.name.toLowerCase().includes(query.toLowerCase()));
  const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);


  useEffect(() => {
    if (isAuthenticated === true) {
      setUserEmail(user.email);
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  useEffect(()=>{
    const fetchData = async () =>{
      var missingGsds = await fetchMissingGSDs();
      var mastercopyGsds = await fetchMastercopyGSDs();
      await fetchGsdFolders();
      setGSDs(missingGsds);
      getLatestVersion(missingGsds, mastercopyGsds);
  }

  fetchData();
  }, []);

const getItems = () => {
    var results = []
    itemRefs.forEach(item => {
        if(item.checked){
            var gsd = gsds.filter(i => i.name === item.name)
            if(gsd[0].mastercopyName && gsd[0].mastercopyFolder){
              results.push(gsd[0]);
            }
        }})
    
    return results;
};

const getLatestVersion= (gsds, mastercopyGsds) => {

  var groupByName = Object.groupBy(gsds, gsd => gsd.parsedName);
  
  Object.keys(groupByName).forEach((key) => {
    var mastercopyGsdGroup = mastercopyGsds.filter(i => i.parsedName === key)
    
    if(groupByName[key].length === 1 && mastercopyGsdGroup.length === 0){
      groupByName[key][0].isLatest = true;
    }
    else{
      var latestVersion = 0.0;
      var latestTime = 0;
      var latestRevision = 0;
      var latestGsds = [];
      var latestMastercopyGsds = [];
      groupByName[key].forEach((gsd) => {
        gsd.isLatest = false;

        var version = parseFloat(gsd.version.substring(1))
        if(version === latestVersion){
          latestGsds.push(gsd);
        }
        else if(version > latestVersion){
          latestGsds = []
          latestVersion = version;
          latestGsds.push(gsd);
        }
      })

      const clonedMastercopyGsds = [...mastercopyGsdGroup];
      var breakLoop = false;
      clonedMastercopyGsds.forEach((gsd) => {
        var version = parseFloat(gsd.version.substring(1))
        if(version > latestVersion){
          latestGsds = [];
          latestMastercopyGsds = [];
          breakLoop = true;
        }
        else if(version === latestVersion && !breakLoop) {
          latestMastercopyGsds.push(gsd);
        }
      })

      
      if(latestGsds.length > 1){
        const clonedGsds = [...latestGsds];
        latestGsds = [];
        clonedGsds.forEach((gsd) => {
          var time = parseInt(gsd.time)
          if(time === latestTime){
            latestGsds.push(gsd);
          }
          else if(time > latestTime){
            latestGsds = []
            latestTime = time;
            latestGsds.push(gsd);
          }
        })
      }

      breakLoop = false;
      if(latestMastercopyGsds.length > 0){

        const clonedMastercopyGsds = [...latestMastercopyGsds];
        latestMastercopyGsds = [];
        
        clonedMastercopyGsds.forEach((gsd) => {
          var time = parseInt(gsd.time)
          if(time > latestTime ){
            latestGsds = [];
            latestMastercopyGsds = [];
            breakLoop = true;
          } else if(time === latestTime && !breakLoop){
            latestMastercopyGsds.push(gsd);
          }
        })
      }


      if(latestGsds.length > 1){
        const clonedGsds = [...latestGsds];
        latestGsds = [];
        clonedGsds.forEach((gsd) => {
          var revision = parseInt(gsd.revision)
          if(revision === latestRevision){
            latestGsds.push(gsd);
          }
          else if(revision > latestRevision){
            latestGsds = []
            latestRevision = revision;
            latestGsds.push(gsd);
          }
        })
      }

      if(latestMastercopyGsds.length > 0){
        const clonedMastercopyGsds = [...latestMastercopyGsds];
        latestMastercopyGsds = [];
        clonedMastercopyGsds.forEach((gsd) => {
          var revision = parseInt(gsd.revision)
          if(revision >= latestRevision){
            latestGsds = [];
          }
        })
      }

      latestGsds.forEach((gsd) => gsd.isLatest = true);
    }
    
  })
}

const handleSearchChange = (event)=>{
    setQuery(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    var checkedGsds = getItems();
    if(checkedGsds.length > 0){
      const formData = new FormData();
      const payload = createPayload(checkedGsds);
      formData.set("data", JSON.stringify(payload));
      await createJob(formData);
    }
    
    onSubmit()
  };

const getParam = (gsds) =>{
    //define application param
    
    var applicationPath = "C:\\CodeGen\\ProjectChangeLog.exe";
    var arg1 = `--CreateHardwareMastercopy`;
    var arg2 = gsds.map((gsd) => gsd.project).join(';');
    var arg3 = gsds.map((gsd) => gsd.server).join(';');
    var arg4 = gsds.map((gsd) => gsd.name).join(';');
    var arg5 = gsds.map((gsd) => gsd.mastercopyName).join(';');
    var arg6 = gsds.map((gsd) => gsd.mastercopyFolder).join(';');
    var args = [arg1, arg2, arg3, arg4, arg5, arg6]
    
    return {applicationPath, args}
}
const createPayload = (gsds) => {
    var currentdate = new Date();
    var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const param = getParam(gsds);
    const payload = {
      "job_name": "CreateHardwareMastercopy",
      "job_description" : "CreateHardwareMastercopy",
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
const paginate = (selectedPage) =>{
  setCurrentPage(selectedPage);
}
const handleRecordsPerPageChange = (number) =>{
  setRecordsPerPage(number);
}

const handleViewAvailableMastercopyChange = async (event) =>{
  setViewTemplateMastercopy(false)
}

const handleViewTemplateMastercopyChange = async (event) =>{
  setViewTemplateMastercopy(true)  
}

  return (
    <>
    <div style={{display: "flex", flexDirection: "column"}}></div>
      <h2 style={{ marginBottom: "10px"}}>Add Hardware Mastercopy</h2>
      <FormInputSearch value={query} onChange={handleSearchChange}/>
      <Button style={{width:'100px'}} onClick={handleSubmit}>Generate</Button>
      <div style={{display: "flex", marginTop:'12px', marginBottom:'12px'}}>
        <Button variant="secondary" 
          style={{width:'150px'}} 
          onClick={handleViewAvailableMastercopyChange}>View Missing Mastercopies</Button>
        <Button variant="secondary" 
          style={{width:'150px'}} 
          onClick={handleViewTemplateMastercopyChange}>View Template Mastercopies</Button>
      </div>
      
      <DataTable border={4} style={{width:"2000px"}}> 
                <thead>
                    <tr>
                        <DataTH sortable={true} key="arrow"></DataTH>
                        <DataTH sortable={true} key="name">NAME</DataTH>
                        <DataTH sortable={true} key="version">VERSION</DataTH>
                        <DataTH sortable={true} key="date">DATE</DataTH>
                        <DataTH sortable={true} key="revision">REVISION</DataTH>
                        <DataTH sortable={true} key="gsd" >GSD</DataTH>
                    </tr>
                </thead>
                
                <TBody>
                {  viewTemplateMastercopy ?
                  currentRecords.map( (gsd, key) =>{
                    return(
                      <TemplateMastercopyRow hardware={gsd} gsds={gsds}/>
                    )}) 
                    :
                    currentRecords.map( (gsd, key) =>{
                    return(
                        <MastercopyRow hardware={gsd} key={key} ref={(node) =>itemRefs[key] = node}/>
                    )})
                }
                 </TBody>
        </DataTable>
        <Pagination 
                                onPageChange={paginate}
                                onRecordsPerPageChange={handleRecordsPerPageChange}
                                variant="select"
                                recordsPerPage={recordsPerPage}
                                totalPages = {Math.ceil(filteredRecords.length / recordsPerPage)}
                                page={currentPage}
                                totalRecords={filteredRecords.length}
                                totalRecordsLabel={"Total: "}
                                recordsPerPageSteps={[20,40, 100, 200]}
                                prevLinkLabel={'Prev'}
                                nextLinkLabel={'Next'}
                            />
    </>
  );
};

export default AddHardwareMastercopyForm;