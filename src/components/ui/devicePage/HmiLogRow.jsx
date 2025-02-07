import { List, ListItem } from "@tesla/design-system-react";
import {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import useDeviceStore from "../../../store/deviceStore";



const HmiLogRow = ({hmi_id, log_id}) => {
    const [expanded, setExpanded] = useState(false)
    const [content, setContent] = useState("");
    const fetchHmiLog = useDeviceStore((state) => state.fetchHmiLog);
    
    const handleListClick = async () => {
        if(expanded){
            setExpanded(false);
        }else {
            const result = await fetchHmiLog(hmi_id, log_id);
            setContent(result);
            setExpanded(true);
        }
    }

    return (
        <>
        <ListItem className="li-device" onClick={handleListClick}>
            <span className='tree-node-4th' style={{fontSize:20}}> 
            <IconContext.Provider value={{ color:"black", size:20 }}>
            {
                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
            }
            </IconContext.Provider>
            {log_id}
            </span>                        
        </ListItem>
        
        <List>
                {
                    expanded && 
                    <div style={{ "overflowY": "scroll", "maxHeight": "1800vh", "width":"1800px", "display": "flex" , "flexWrap": "wrap", "whiteSpace": "pre-wrap"}}>
                        {content}
                    </div>
                }
        </List>
        
        </>
    )
}

export default HmiLogRow