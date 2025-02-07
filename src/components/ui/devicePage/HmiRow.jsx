import { List, ListItem } from "@tesla/design-system-react";
import {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";

const HmiRow = ({list, title, isExpanded}) => {
    const [expanded, setExpanded] = useState(isExpanded)

    
    const handleListClick = async () => {
        if(expanded){
            setExpanded(false);
        }else {
            setExpanded(true);
        }
    }

    return (
        <>
        <ListItem onClick={handleListClick} style={{listStyle:"none"}}>
            <span style={{fontSize:30, verticalAlign:'middle'}}>
            <IconContext.Provider value={{ color:"black", size:30 }}>
            {
                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
            }
            </IconContext.Provider>
            {title}
            </span>                        
        </ListItem>
        
        <List style={{marginBottom:"10px", marginLeft:"18px"}}>
                {
                    expanded && 
                    <div style={{marginTop:"10px", fontSize:"15px"}}>
                    {
                        list?.map((item) => {return item})
                    }
                    </div>
                }
        </List>
        
        </>
    )
}

export default HmiRow