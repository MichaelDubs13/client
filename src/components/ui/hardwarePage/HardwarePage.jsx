import { FormInputSearch, TBody, DataTH } from "@tesla/design-system-react";
import React, { useState, useEffect } from 'react';
import { DataTable} from "@tesla/design-system-react";
import useDeviceStore from "../../../store/deviceStore";
import ModalAddHardwareMastercopyForm from "./ModalAddHardwareMastercopyForm";
import HardwareGroupRow from "./HardwareGroupRow";


const HardwarePage = () => {
    const[query, setQuery] = useState("");
    const gsds = useDeviceStore((state) => state.gsds);
    const fetchGSDs = useDeviceStore((state) => state.fetchGSDs);
    const filteredGsds = gsds.filter((gsd)=>(gsd.name.toUpperCase().startsWith("GSD") || gsd.name.toUpperCase().startsWith("SYSTEM:") ) 
                        && !gsd.name.includes("SIEMENS-PRECONF")).filter((gsd) => gsd.name && gsd.name.toUpperCase().includes(query.toUpperCase()))
    const groupedGsds = Object.groupBy(filteredGsds, ({ parsedName }) => parsedName.toUpperCase());
    useEffect(()=>{
        fetchGSDs();
    }, []);

    const handleSearchChange = (event)=>{
        setQuery(event.target.value);
        Object.keys(groupedGsds).forEach((key, index) => {
            console.log(groupedGsds[key])
        })    
    }
    return (
   
        <>
            <ModalAddHardwareMastercopyForm/>
            <h2>Hardware</h2>
            <FormInputSearch value={query} onChange={handleSearchChange}/>
            <DataTable border={4} style={{width:"2000px"}}>  
                <thead>
                    <tr>
                        <DataTH sortable={true} key="arrow"></DataTH>
                        <DataTH sortable={true} key="name">Name</DataTH>
                        <DataTH sortable={true} key="description" >Description</DataTH>
                        <DataTH sortable={true} key="family" >Family</DataTH>
                        <DataTH sortable={true} key="type" >Type</DataTH>
                    </tr>
                </thead>               
                <TBody>
                { 
                    Object.keys(groupedGsds).map((key, index) => {
                        return(
                            <HardwareGroupRow group={groupedGsds[key]} name = {key}/>
                        )})    
                }
                 </TBody>
            </DataTable>
        </>
    )
    
}

export default HardwarePage