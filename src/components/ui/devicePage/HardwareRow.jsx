import React, {  } from "react";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";

const HardwareRow = ({hardware, plc_id, searchWord}) => {
    let navigate = useNavigate(); 

    const handleToggleClick = async () => {
        let path = `/devices/plc/${plc_id}`; 
        navigate(path);
    };


return (
        <>
            <tr
                onClick={handleToggleClick}>
                <td>{hardware?.plc}</td>
                <td>{hardware?.name}</td>
                <Highlighter 
                    searchWords={[searchWord]}
                    autoEscape={true}
                    highlightStyle={{ backgroundColor: '#3368ff', color:"white" }}
                    textToHighlight = {hardware?.gsd}/>
                <td>{hardware?.ipAddress}</td>
            </tr>
        </>
    )
}

export default HardwareRow;