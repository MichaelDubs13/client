import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormInputSearch, TBody, Pagination, DataTable, ListItem } from "@tesla/design-system-react";



const LibraryErrorRow = ({errors, title}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = errors;
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
    const [expanded, setExpanded] = useState(false);
    
    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);
        
      } else {
        setExpanded(false);
      }
    };

    const paginate = (selectedPage) =>{
        setCurrentPage(selectedPage);
    }
    const handleRecordsPerPageChange = (number) =>{
        setRecordsPerPage(number);
    }

    return (
        <>

                <ListItem style={{marginLeft:"80px", display:"flex", justifyContent:'space-between', flexWrap:'wrap', width:'100%'}} onClick={handleToggleClick}>
                    
                    <span className='changeset-title'>
                    <IconContext.Provider value={{ color:"black", size:25 }}>
                    {
                        expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                    }
                    </IconContext.Provider>
                    {title}
                    </span>
                    <span className='changeset-title'>
                    {` Count: ${errors.length}`}
                    </span>   
                </ListItem> 
                                
                {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                            <DataTable border={4} style={{width:"2000px"}}>   
                                <TBody>
                                { 
                                    currentRecords.map( (error, key) =>{
                                    return(
                                        <tr>
                                            <td className='td-changeset'>{error.name}</td>
                                            <td className='td-changeset'>{error.type}</td>
                                            <td className='td-changeset'>{error.path}</td>
                                            {
                                                error.defaultVersion ?? <td className='td-changeset'>{error.defaultVersion}</td>
                                            }
                                            {
                                                error.instanceVersion ?? <td className='td-changeset'>{error.instanceVersion}</td>
                                            }
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

export default LibraryErrorRow;