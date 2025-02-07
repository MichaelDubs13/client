import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormInputSearch, TBody, Pagination, DataTable, ListItem } from "@tesla/design-system-react";
import RevisionRow from './RevisionRow';


const RevisionOverviewRow = ({revisions}) => {
    const[query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = revisions.filter((record) => record.comment.toLowerCase().includes(query.toLowerCase()) );
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

                <ListItem style={{margin:"40px"}} onClick={handleToggleClick}>
                    
                    <span className='changeset-title'>
                    <IconContext.Provider value={{ color:"black", size:25 }}>
                    {
                        expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                    }
                    </IconContext.Provider>
                    Revision History
                    </span>   
                </ListItem> 
                                
                {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                        <FormInputSearch value={query} onChange={handleSearchChange}
                            placeholder="search by comment"/>

                            <DataTable border={4} style={{width:"2000px"}}>   
                                <TBody>
                                { 
                                    currentRecords.map( (revision, key) =>{
                                    return(
                                        <RevisionRow revision={revision} key={key}/>
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

export default RevisionOverviewRow;