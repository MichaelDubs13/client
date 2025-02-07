import React, { useState } from "react";
import { iconChevron90, iconChevron180, iconDownload} from '@tesla/design-system-icons';
import { Icon } from '@tesla/design-system-react'
import fileDataService from "../../../services/fileDataService";
import ReferenceRow from "./ReferenceRow";

const HardwareRow = ({hardware}) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);  
      } else {
        setExpanded(false);
      }
    };

    const handleDownloadXMLClick = async (event)=> {
        let url = await fileDataService.getGsd(hardware.name);
    }

return (
        <>
           <tr className={`tr-block`} //"tds--highlighted" 
                    onClick={handleToggleClick}>
                    <td>
                        <button onClick={(event) => handleDownloadXMLClick(event)}>
                            <Icon data={iconDownload}/>
                        </button>
                    </td>
                    <td className='td-block'>{hardware?.parsedName}</td>
                    <td className='td-block'>{hardware?.version}</td>
                    <td className='td-block'>{hardware?.time}</td>
                    <td className='td-block'>{hardware?.revision}</td>
                    <td className='td-block'>{hardware?.name}</td>
            </tr>
        </>
    )
}

export default HardwareRow;