import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";


const ChangeSetRow = ({changeSet}) => {
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
                    <td className='td-changeset'>{changeSet.revision}</td>
                    <td className='td-changeset'>{changeSet.path}</td>
                    <td className='td-changeset'>{changeSet.type}</td>
                    <td className='td-changeset'>{changeSet.object}</td>
                    <td className='td-changeset'>{changeSet.username}</td>
                    <td className='td-changeset'>{changeSet.date}</td>
                </tr>
                                
                {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                        </td>
                    </tr>
                )
                } 
        </>
    );
}

export default ChangeSetRow;