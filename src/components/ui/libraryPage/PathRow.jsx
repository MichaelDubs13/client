import React , {useState } from 'react';
import { DataTable,  DataTH, TBody, FormInputSearch} from "@tesla/design-system-react";
import BlockRow from './BlockRow';


const PathRow = ({blocks, path}) => {
    const[query, setQuery] = useState("");
    const handleSearchChange = (event)=>{
        setQuery(event.target.value);
    }
    return (
        <>
            <div style={{marginBottom:"10px"}}/>
            <div>
                <FormInputSearch value={query} onChange={handleSearchChange}/>
                <DataTable border={4} style={{width:"2000px"}}> 
                    <thead>
                        <tr>
                            <DataTH sortable={true} key="arrow"></DataTH>
                            <DataTH sortable={true} key="name">NAME</DataTH>
                            <DataTH sortable={true} key="path" >PATH</DataTH>
                            <DataTH sortable={true} key="type" >TYPE</DataTH>
                            <DataTH sortable={true} key="rev" >REV</DataTH>
                        </tr>
                    </thead>
                    
                    <TBody>
                    { 
                        blocks.filter((block) => block.Name.toLowerCase().includes(query.toLowerCase())).map( (block, key) =>{
                        return(
                            <BlockRow block={block} parentPath={path} key={key}/>
                        )})
                    }
                    </TBody>
                </DataTable>
            </div>
        </>
    );
}

export default PathRow;