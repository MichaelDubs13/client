import React, { useState, useEffect } from 'react';
import { TBody, DataTH, DataTable, Pagination } from "@tesla/design-system-react";
import useJobStore from '../../../store/jobStore';
import DownloadButton from '../libraryPage/DownloadButton';



const JobHistory = () => {
  const fetchPtpHistory = useJobStore((state) => state.fetchPtpHistory);
  const ptpHistory = useJobStore((state)=>state.ptpHistory);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const indexOfLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexOfLastPost - recordsPerPage;
  const filteredRecords = ptpHistory;
  const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(()=>{
    fetchPtpHistory();
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
    
    <h2>Job History</h2>
    <DataTable border={4} style={{width:"1800px", backgroundColor:"white"}}> 
      <thead>
          <tr>
              <DataTH sortable={true} key="username">User</DataTH>
              <DataTH sortable={true} key="inputfile" >Input File</DataTH>
              <DataTH sortable={true} key="outputfile" >Output File</DataTH>
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
                          {
                            history.inputfile ?
                            <td><DownloadButton label={"Input File"} filePath={history.inputfile}/></td> :
                            <td></td>
                          }
                          {
                            history.outputfile ?
                            <td><DownloadButton label={"Output File"} filePath={history.outputfile}/></td> :
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
