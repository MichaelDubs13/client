import React, { useState, useEffect } from 'react';
import { TD, TBody, DataTH, DataTable, Pagination, FormInputSearch, Link } from "@tesla/design-system-react";
import DownloadButton from '../libraryPage/DownloadButton';
import useEecStore from '../../../store/eecStore';
import { Icon, IconButton } from '@tesla/design-system-react';
import { iconStatusSuccess} from '@tesla/design-system-icons';



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
                  <DataTH sortable={true} key="progress" >Progress</DataTH>
                  <DataTH sortable={true} key="time" >Time</DataTH>
                  <DataTH sortable={true} key="state" >State</DataTH>
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
                              {
                                history.job_id ?
                                <TD><Link href={`http://sjc37p1epnap001.teslamotors.com:8686/#/jobs/${history.job_id}`}>Job Progress</Link> </TD> :
                                <TD></TD>
                              }
                              <TD>{history.time}</TD>
                              <TD>
                                {
                                  history.state === 1 &&
                                  <IconButton size="medium">
                                    <Icon data={iconStatusSuccess} size="medium" />
                                  </IconButton> 
                                }
                              </TD>
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
