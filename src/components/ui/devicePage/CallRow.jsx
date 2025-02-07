import React, {  } from "react";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import blockDataService from "../../../services/blockDataService";
import { MdOutlineFileDownload } from "react-icons/md"
import {IconContext} from "react-icons";

const CallRow = ({call, plc_id, searchType, searchWord}) => {
    let navigate = useNavigate(); 
    const nameSearchWords = searchType === "blocks" ? searchWord : "";
    const networkSearchWords = searchType === "networks" ? searchWord : "";
    const handleToggleClick = async () => {
        let path = `/devices/plc/${plc_id}`; 
        navigate(path);
    };

    const handleDownloadXMLClick = async (event)=> {
        let url = await blockDataService.getBlockXML(call?.container, call?.plc);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${call?.container}.xml`;
        a.click();
    }

return (
        <>
            <tr>
                    <button onClick={(event) => handleDownloadXMLClick(event)}>
                        <IconContext.Provider value={{ color:"black", size:20 }}>
                            {
                                <MdOutlineFileDownload/>
                            }
                        </IconContext.Provider>
                    </button>
                    <td onClick={handleToggleClick}>{call?.plc}</td>
                    <td onClick={handleToggleClick}>
                    <Highlighter 
                        searchWords={[nameSearchWords]}
                        autoEscape={true}
                        highlightStyle={{ backgroundColor: '#e2e3e3' }}
                        textToHighlight = {call?.name}/>
                    </td>
                    <td onClick={handleToggleClick}>{call?.path.replace("Program blocks/", "")}</td>
                    <td onClick={handleToggleClick}>{call?.container}</td>
                    <td onClick={handleToggleClick}>{call?.networkNumber}</td>
                    <td>
                    <Highlighter 
                        searchWords={[networkSearchWords]}
                        autoEscape={true}
                        highlightStyle={{ backgroundColor: '#e2e3e3' }}
                        textToHighlight = {call?.network}/>
                    </td>
            </tr>
        </>
    )
}

export default CallRow;