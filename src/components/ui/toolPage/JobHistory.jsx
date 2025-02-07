import React, { useState, useEffect } from 'react';
import { FormInputSearch, TBody, DataTH, Button, DataTable, Pagination } from "@tesla/design-system-react";
import { Icon, Tooltip, TooltipWrapper, useTooltipState } from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';
import useJobStore from '../../../store/jobStore';
import DownloadButton from '../libraryPage/DownloadButton';



const JobHistory = () => {
  const fetchCodeGenHistory = useJobStore((state) => state.fetchCodeGenHistory);
  const codeGenHistory = useJobStore((state)=>state.codeGenHistory);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const indexOfLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexOfLastPost - recordsPerPage;
  const filteredRecords = codeGenHistory;
  const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
  const {
      open: openJobHistory,
      handlers: handlersJobHistory,
      wrapperRef: wrapperRefJobHistory,
  } = useTooltipState({ initialOpen: false });

  useEffect(()=>{
    fetchCodeGenHistory();
  }, []);

  const paginate = (selectedPage) =>{
    setCurrentPage(selectedPage);
}

const handleRecordsPerPageChange = (number) =>{
    setCurrentPage(1);
    setRecordsPerPage(number);
}
 
  
  return (
    <>
    
    <h2>
      Job History
      <TooltipWrapper
                {...handlersJobHistory}
                wrapperRef={wrapperRefJobHistory}
                inline
                className="tds-text--regular tds-text--contrast-medium tds-density--dense"
                >
                <button>
                    <Icon size="large" data={iconInfo} inline align="text-middle" />
                </button>

                <Tooltip open={openJobHistory} align="start">
                    <p>Generated PLC Programs</p>
                    <p>Use "SoftwareMatrix" and "IpList" buttons to download excels used for generated projects</p>
                </Tooltip>
                </TooltipWrapper>
    </h2>
    <DataTable border={4} style={{width:"1800px", backgroundColor:"white"}}> 
      <thead>
          <tr>
              <DataTH sortable={true} key="username">User</DataTH>
              <DataTH sortable={true} key="projectname" >Project</DataTH>
              <DataTH sortable={true} key="template" >Template</DataTH>
              <DataTH sortable={true} key="projectname" >Output Server</DataTH>
              <DataTH sortable={true} key="softwarematrix">SoftwareMatrix</DataTH>
              <DataTH sortable={true} key="iplist" >IP List</DataTH>
              <DataTH sortable={true} key="createdtime">Created</DataTH>
              <DataTH sortable={true} key="state">State</DataTH>
          </tr>
      </thead>
      <TBody>
      { 
              currentRecords?.map( (history, key) =>{
              return(
                <tr >
                          <td >{history.username}</td>
                          <td >{history.projectname}</td>
                          <td >{history.template}</td>
                          <td >{history.outputserver}</td>
                          {
                            history.softwarematrix ?
                            <td><DownloadButton label={"SoftwareMatrix"} filePath={history.softwarematrix}/></td> :
                            <td></td>
                          }
                          {
                            history.iplist ?
                            <td><DownloadButton label={"IpList"} filePath={history.iplist}/></td> :
                            <td></td>
                          }
                          <td>{history.time}</td>
                          <td>{history.state === 1 ? "Completed" : ""}</td>
                </tr>
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
        recordsPerPageSteps={[5,20,40, 100, 200]}
        prevLinkLabel={'Prev'}
        nextLinkLabel={'Next'}
        />
    </>
  );
};

export default JobHistory;
