import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import ChangeSetRow from './ChangeSetRow';
import { TBody, DataTable } from "@tesla/design-system-react";


const GroupedChangeSetRow = ({changeSet}) => {
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

                <tr className={`tr-changeset`} //"tds--highlighted" 
                    onClick={handleToggleClick}>
                    <td>
                        <IconContext.Provider value={{ color:"black", size:12 }}>
                            {
                                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                        </IconContext.Provider>
                            
                        </td>
                    <td className='td-changeset'>{changeSet[0]}</td>
                </tr>
                                
                {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                            <DataTable border={4} style={{width:"2000px"}}>   
                                <TBody>
                                { 
                                    changeSet[1].map( (changeSet, key) =>{
                                    return(
                                        <ChangeSetRow changeSet={changeSet} key={key}/>
                                    )})
                                }
                                </TBody>
                            </DataTable>
                        </td>
                    </tr>
                )
                } 
        </>
    );
}

export default GroupedChangeSetRow;