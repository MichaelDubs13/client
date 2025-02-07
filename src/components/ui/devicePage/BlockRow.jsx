import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";


const BlockRow = ({block}) => {
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
            <tr
                onClick={handleToggleClick}>
                <td>
                    <IconContext.Provider value={{ color:"black", size:15 }}>
                        {
                            expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                        }
                    </IconContext.Provider>
                        
                    </td>
                    <td>{block?.name}</td>
                    <td>{block?.path}</td>
                    <td style={block?.plc_revision === block?.template_revision ? {backgroundColor:"#99FF66"} : {backgroundColor:"#E06666"}}>{block?.plc_revision}</td>
                    <td>{block?.template_revision}</td>
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
    )
}

export default BlockRow;