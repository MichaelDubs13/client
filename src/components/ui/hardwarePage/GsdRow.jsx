import React, { useState } from "react";
import HardwareRow from "./HardwareRow";
import { DataTH, TBody, DataTable } from "@tesla/design-system-react";


const GsdRow = ({group}) => {

return (
        <>
            <DataTable border={4} style={{width:"2000px"}}> 
                <thead>
                    <tr>
                        <DataTH sortable={true} key="arrow"></DataTH>
                        <DataTH sortable={true} key="arrow"></DataTH>
                        <DataTH sortable={true} key="name">NAME</DataTH>
                        <DataTH sortable={true} key="version">VERSION</DataTH>
                        <DataTH sortable={true} key="date">DATE</DataTH>
                        <DataTH sortable={true} key="revision">REVISION</DataTH>
                        <DataTH sortable={true} key="gsd" >GSD</DataTH>
                    </tr>
                </thead>
                
                <TBody>
                { 
                    group.map( (gsd, key) =>{
                    return(
                        <HardwareRow hardware={gsd} key={key}/>
                    )})
                }
                </TBody>
            </DataTable>
        </>
    )
}

export default GsdRow;