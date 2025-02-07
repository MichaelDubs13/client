import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormInputSearch, TBody, Pagination, DataTable, ListItem } from "@tesla/design-system-react";
import ReleasedLibraryRow from './ReleasedLibraryRow';


const ReleasedLibraryOverviewRow = ({libs}) => {
    const[query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = libs.sort((a,b) => b.revision - a.revision).filter((record) => record.name.toLowerCase().includes(query.toLowerCase()) );
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
    const [expanded, setExpanded] = useState(false);
    
    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

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
                <ListItem onClick={handleToggleClick} style={{listStyle:"none", marginTop:"20px"}}>
                    <span style={{fontSize:30, verticalAlign:'middle'}}>
                    <IconContext.Provider value={{ color:"black", size:30 }}>
                    {
                        expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                    }
                    </IconContext.Provider>
                    Released Libraries
                    </span>                        
                </ListItem>
                                
                {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                        <FormInputSearch value={query} onChange={handleSearchChange}
                            placeholder="search by library name"/>

                            <DataTable border={4} style={{width:"2000px"}}>   
                                <TBody>
                                { 
                                    currentRecords.map( (lib, key) =>{
                                    return(
                                        <ReleasedLibraryRow lib={lib} key={key}/>
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
                                recordsPerPageSteps={[20,40, 100, 200]}
                                prevLinkLabel={'Prev'}
                                nextLinkLabel={'Next'}
                            />
                        </td>
                    </tr>
                    )
                } 
        </>
    );
}

export default ReleasedLibraryOverviewRow;