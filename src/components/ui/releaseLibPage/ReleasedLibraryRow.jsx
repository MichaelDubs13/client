import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import RevisionRow from './RevisionRow';
import { FormInputSearch, TBody, Pagination, DataTable, ListItem } from "@tesla/design-system-react";
import useLibraryStore from '../../../store/libraryStore';


const ReleasedLibraryRow = ({lib}) => {
    const[query, setQuery] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [revisions, setRevisions] = useState([]);
    const fetchReleasedLibRevs = useLibraryStore((state) => state.fetchReleasedLibRevs);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = revisions.sort((a,b) => b.revision - a.revision).filter((record) => record.comment.toLowerCase().includes(query.toLowerCase()) );
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
    
    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);
        var revs = await fetchReleasedLibRevs(lib.id);
        setRevisions(revs);
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

                <tr className={`tr-changeset`} //"tds--highlighted" 
                    onClick={handleToggleClick}>
                    <td>
                        <IconContext.Provider value={{ color:"black", size:12 }}>
                            {
                                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                        </IconContext.Provider>
                            
                        </td>
                    <td className='td-changeset'>{lib.name}</td>
                    <td className='td-changeset'>{lib.date}</td>
                    <td className='td-changeset'>{lib.user}</td>
                </tr>
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


export default ReleasedLibraryRow;