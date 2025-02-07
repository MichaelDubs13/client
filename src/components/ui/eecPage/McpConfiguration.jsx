import { Component, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import mcpStore from "../../../store/eec/mcpStore";
import { FormLabel, FormItem, Button, FormInputText} from '@tesla/design-system-react';
import Item from "./Item";
import "./Eec.css";

const McpConfiguration = () => {    
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(0);


    const handleToggleClick = async () => {
        if (!expanded) {
          setExpanded(true);
          
        } else {
          setExpanded(false);
        }
      };

    return (
        <>
            <div className="div-inline">
                <IconContext.Provider value={{ color:"black", size:20 }}>
                {
                    expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                }
                </IconContext.Provider>
                <button style={{fontSize:20, fontWeight:"bolder", marginBottom:"10px"}} 
                    onClick={handleToggleClick}>
                    Main Control Panel Configuration
                </button>
                {
                    expanded &&
                    <div>                   
                        {   
                            mcpStore.configurations.map((configuration, index) => (
                                <Item item={configuration} index={index} />
                        ))}
                    </div>
                }
            </div>
        </>
    )
}
    
export default McpConfiguration;