import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";


const RevisionRow = ({revision}) => {
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
                    <td className='td-changeset'>{revision.revision}</td>
                    <td className='td-changeset'>{revision.comment}</td>
                    <td className='td-changeset'>{revision.username}</td>
                    <td className='td-changeset'>{revision.date}</td>
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

export default RevisionRow;