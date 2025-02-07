import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormInputSearch, TBody, Pagination, DataTable, ListItem } from "@tesla/design-system-react";
import ChangeSetRow from './ChangeSetRow';
import useLibraryStore from "../../../store/libraryStore";
import LibraryErrorRow from './LibraryErrorRow';


const ErrorOverViewRow = () => {
    const inconsistentLib = useLibraryStore((state) => state.inconsistentLib);
    const inconsistentDepLib = useLibraryStore((state) => state.inconsistentDepLib);
    const duplicateNameLib = useLibraryStore((state) => state.duplicateNameLib);
    const nondefaultInstances = useLibraryStore((state) => state.nondefaultInstances);
    const [expanded, setExpanded] = useState(false);
   
    
    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);
        
      } else {
        setExpanded(false);
      }
    };

    return (
        <>

                <ListItem style={{margin:"40px"}} onClick={handleToggleClick}>
                    
                    <span className='changeset-title'>
                    <IconContext.Provider value={{ color:"black", size:25 }}>
                    {
                        expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                    }
                    </IconContext.Provider>
                    Library Errors
                    </span>   
                </ListItem> 
                                
                {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                           <LibraryErrorRow errors={duplicateNameLib} title={"Duplicate Names"}/>
                           <LibraryErrorRow errors={inconsistentLib} title={"Inconsistent Library"}/>
                           <LibraryErrorRow errors={inconsistentDepLib} title={"Inconsistent Dependency"}/>
                           <LibraryErrorRow errors={nondefaultInstances} title={"Nondefault Versions"}/>
                        </td>
                    </tr>
                    )
                } 
        </>
    );
}

export default ErrorOverViewRow;