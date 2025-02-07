import useDeviceStore from "../../../../store/deviceStore";
import React, { useState, useEffect } from "react";
import { TBody, DataTH, DataTable, FormInputSearch,Pagination } from "@tesla/design-system-react";
import CallRow from "../CallRow";



const CallsTab = ({id}) => {
    const fetchPlcCall = useDeviceStore((state) => state.fetchPlcCall);
    const calls = useDeviceStore((state) => state.calls);
    const[query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(40);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = calls.filter((record) => record.name.toLowerCase().includes(query.toLowerCase()));
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
    useEffect(()=>{
        const fetchData = async (id) =>{
            await fetchPlcCall(id);
        }

        fetchData(id);
    }, []);
    const handleSearchChange = (event)=>{
        setQuery(event.target.value);
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
        {
            <DataTable border={4} style={{width:"2000px"}}> 
            <thead>
                <tr>
                    <DataTH sortable={true} key="PLC" >PLC</DataTH>
                    <DataTH sortable={true} key="Name" >Name</DataTH>
                    <DataTH sortable={true} key="Path" >Path</DataTH>
                    <DataTH sortable={true} key="Container" >Container</DataTH>
                    <DataTH sortable={true} key="NetworkNumber" >Network #</DataTH>
                    <DataTH sortable={true} key="NetworkTitle" >Network Title</DataTH>
                </tr>
            </thead>
            
            <TBody>
            { 
                currentRecords && currentRecords.map( (call, key) =>{
                    return <CallRow call={call} plc_id={call.plc_id}/>;
                })
            }
            </TBody>
        </DataTable>
        }
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

export default CallsTab;