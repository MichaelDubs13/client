import useDeviceStore from "../../../../store/deviceStore";
import React, { useState,  useEffect } from "react";
import { DataTable, TBody, DataTH, FormInputSearch, Loader, Pagination, Button} from "@tesla/design-system-react";
import PlcRevRow from "./PlcRevRow";


const ChangeLogTab = ({id, isLoading})=> {
    const plcRevisions = useDeviceStore((state) => state.plcRevisions);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(40);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = plcRevisions.filter((record) => record.comment.toLowerCase().includes(query.toLowerCase()));
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);

    const handleSearchChange = (event)=>{
        setQuery(event.target.value);
        setCurrentPage(1);
    }
    const paginate = (selectedPage) =>{
        setCurrentPage(selectedPage);
    }
    const handleRecordsPerPageChange = (number) =>{
        setRecordsPerPage(number);
    }
    return (
    <>
        <FormInputSearch value={query} onChange={handleSearchChange}/>
                <DataTable border={4} style={{width:"2000px"}}> 
                    <Loader show={isLoading} contained={true}/>
                    <thead>
                        <tr>
                            <DataTH sortable={true} key="arrow"></DataTH>
                            <DataTH sortable={true} key="arrow2"></DataTH>
                            <DataTH sortable={true} key="RevisionID" >RevisionID</DataTH>
                            <DataTH sortable={true} key="UserName" >UserName</DataTH>
                            <DataTH sortable={true} key="Date" >Date</DataTH>
                            <DataTH sortable={true} key="Comment" >Comment</DataTH>
                        </tr>
                    </thead>
                    
                    <TBody>
                    { 
                        currentRecords && currentRecords.map( (rev, key) =>{
                            return <PlcRevRow rev={rev} plc_id={id} />
                    })}
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
    )
}

export default ChangeLogTab;