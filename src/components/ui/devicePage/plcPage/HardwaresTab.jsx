import useDeviceStore from "../../../../store/deviceStore";
import React, { useState, useEffect} from "react";
import { TBody, DataTH, DataTable, FormInputSearch,Pagination } from "@tesla/design-system-react";
import HardwareRow from "../HardwareRow";


const HardwaresTab = ({id}) => {
    const fetchHardwaresPerPLC = useDeviceStore((state) => state.fetchHardwaresPerPLC);
    const hardwares = useDeviceStore((state) => state.hardwares);
    const[query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(40);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = hardwares.filter((record) => record.gsd.toLowerCase().includes(query.toLowerCase()));
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(()=>{
        const fetchData = async (id) =>{
            await fetchHardwaresPerPLC(id);
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
                    <DataTH sortable={true} key="Arrow" ></DataTH>
                    <DataTH sortable={true} key="PLC" >PLC</DataTH>
                    <DataTH sortable={true} key="Name" >Name</DataTH>
                    <DataTH sortable={true} key="GSD" >GSD</DataTH>
                    <DataTH sortable={true} key="IpAddress" >IpAddress</DataTH>
                </tr>
            </thead>
            
            <TBody>
            { 
                currentRecords && currentRecords.map( (hardware, key) =>{
                    return <HardwareRow hardware={hardware}/>;
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

export default HardwaresTab;