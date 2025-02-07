import useDeviceStore from "../../../../store/deviceStore";
import React, { useState, useEffect } from "react";
import {TBody, DataTH, DataTable, FormItem, FormLabel, FormInputDropdown, FormInputSearch, Pagination } from "@tesla/design-system-react";
import BlockRow from "../BlockRow";
import { templateProject } from "../../../../store/templateStore";

const LibraryTab = ({id}) => {
    const template_id = 10
    const devices = useDeviceStore((state) => state.devices);
    const blocks = useDeviceStore((state) => state.blocks);
    const fetchBlocksPerPLC = useDeviceStore((state) => state.fetchBlocksPerPLC);
    const [selectedPLC, setSelectedPLC] = useState({label:templateProject, value: template_id});
    const[query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(40);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = blocks.filter((record) => record.name.toLowerCase().includes(query.toLowerCase()));
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
    const fetchPLCs = useDeviceStore((state) => state.fetchPLCs);
    
    useEffect(()=>{
        const fetchData = async (id) =>{
            await fetchPLCs();
            await fetchBlocksPerPLC(id, template_id);
        }

        fetchData(id);
    }, []);
    const handlePlcOptionSelect = async (event)=>{
        setSelectedPLC(event.value);
        await fetchBlocksPerPLC(id, event.value);
    }
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
        <div style={{display: "flex", flexDirection: "column"}}>
            <FormItem>
                <FormInputDropdown
                    id="template"
                    label="template"
                    onOptionSelect={handlePlcOptionSelect}
                    options={devices.map((device) => ({label:device.name, value: device.id}))}
                    selected={selectedPLC}
                    style={{ marginBottom: "5px"}}
                  ></FormInputDropdown>
            </FormItem>
        </div>
        {
            <DataTable border={4} style={{width:"2000px"}}> 
            <thead>
                <tr>
                    <DataTH sortable={true} key="Arrow" ></DataTH>
                    <DataTH sortable={true} key="Name" >Name</DataTH>
                    <DataTH sortable={true} key="Path" >PATH</DataTH>
                    <DataTH sortable={true} key="Rev" >PLC Rev</DataTH>
                    <DataTH sortable={true} key="Rev" >Template Rev</DataTH>
                </tr>
            </thead>
            
            <TBody>
            { 
                currentRecords && currentRecords.map( (record, key) =>{
                    return <BlockRow block={record}/>;
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

export default LibraryTab;