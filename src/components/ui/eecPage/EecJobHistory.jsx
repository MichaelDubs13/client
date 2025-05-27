import React, { useState, useEffect } from 'react';
import { TD, TBody, DataTH, DataTable, Pagination, FormInputSearch } from "@tesla/design-system-react";
import DownloadButton from '../libraryPage/DownloadButton';
import useEecStore from '../../../store/eecStore';



const EecJobHistory = () => {
  const fetchJobHistory = useEecStore((state) => state.fetchJobHistory);
  const jobHistory = useEecStore((state)=>state.jobHistory);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);
  const indexOfLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexOfLastPost - recordsPerPage;
  const filteredRecords = jobHistory.filter(record => record.filename.toLowerCase().includes(query.toLowerCase()))
  const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(()=>{
    fetchJobHistory();
  }, []);

  const paginate = (selectedPage) =>{
    setCurrentPage(selectedPage);
}

const handleRecordsPerPageChange = (number) =>{
    setCurrentPage(1);
    setRecordsPerPage(number);
}
const handleSearchChange = (event) => {
  setQuery(event.target.value);
}
  
  return (
    <>
        <DataTable border={4} style={{width:"1800px", backgroundColor:"white"}}> 
          <thead>
              <tr>
                  <DataTH sortable={true} key="username">User</DataTH>
                  <DataTH sortable={true} key="imx" >IMX</DataTH>
                  <DataTH sortable={true} key="time" >Time</DataTH>
              </tr>
          </thead>
          <TBody>
          { 
                  currentRecords?.map( (history, key) =>{
                  return(
                    <tr >
                              <TD>{history.username}</TD>
                              {
                                history.filename ?
                                <TD><DownloadButton label={history.filename} filePath={`EEC\\${history.filename}`}/></TD> :
                                <TD></TD>
                              }
                              <TD>{history.time}</TD>
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
            recordsPerPageSteps={[3, 5,20,40, 100, 200]}
            prevLinkLabel={'Prev'}
            nextLinkLabel={'Next'}
            />
    </>
  );
};

export default EecJobHistory;
