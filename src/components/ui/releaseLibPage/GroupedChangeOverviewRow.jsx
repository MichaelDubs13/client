import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormInputSearch, TBody, Pagination, DataTable, ListItem, SwitchToggle } from "@tesla/design-system-react";
import GroupedChangeSetRow from './GroupedChangeSetRow';


const GroupedChangeOverviewRow = ({changeSets}) => {
    const[query, setQuery] = useState("");
    const [libraryObjectOnly, setLibraryObjectOnly] = useState(true);
    const libraryPath = "Project libraryTypes";
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = Object.entries(changeSets).filter((record) => record[0].startsWith(libraryPath)).filter((record) => record[0].toLowerCase().includes(query.toLowerCase()) );
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
    const handleSwitchLibOnlyChange = async(event)=>{
        setLibraryObjectOnly(!libraryObjectOnly);
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
                    Changed Library Objects
                    </span>   
                </ListItem> 
                                
                {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                        <FormInputSearch value={query} onChange={handleSearchChange}
                            placeholder="search by path"/>
                        <SwitchToggle 
                            className='toggle-switch' 
                            trueLabel='LibraryOnly' 
                            value={libraryObjectOnly} 
                            onChange={handleSwitchLibOnlyChange}/>
                            <DataTable border={4} style={{width:"2000px"}}>   
                                <TBody>
                                { 
                                    currentRecords.map( (changeSet, key) =>{
                                    return(
                                        <GroupedChangeSetRow changeSet={changeSet} key={key}/>
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

export default GroupedChangeOverviewRow;