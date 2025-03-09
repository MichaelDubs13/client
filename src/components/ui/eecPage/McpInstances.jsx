import { Component, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import mcpStore from "../../../store/eec/mcpStore";
import { FormLabel, FormItem, Button, FormInputText} from '@tesla/design-system-react';
import Item from "./Item";
import "./Eec.css";
import ItemStore from "../../../store/eec/ItemStore";
import McpConfiguration from "./McpConfiguration";

const McpInstances = () => {    
    const counts = mcpStore((state)=> state.counts)
    const item = counts[0];
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(0);
    const mcps = mcpStore((state) => state.mcps);
    const addMcp =  mcpStore((state) => state.addMcp);

    const handleSumbit = (event) => {
        event.preventDefault();    

        const data = createData();
        addMcp(value, data);
    }
    
    const handleToggleClick = async () => {
        if (!expanded) {
          setExpanded(true);
          
        } else {
          setExpanded(false);
        }
      };
      
    const handleValueChange = (event)=> {
        setValue(event.target.value);
        item.value = event.target.value;
    }

    const createData = () => {
        var plant = ItemStore.lineGroupItems.find(item => item.parameter === "FunctionalAssignment_(PLANT)").value
        var shop = ItemStore.lineGroupItems.find(item => item.parameter === "FunctionDesignation_(SHOP)").value
        var line = ItemStore.lineGroupItems.find(item => item.parameter === "InstallationSite_(LINE)").value
        var installationLocation = ItemStore.lineGroupItems.find(item => item.parameter === "InstallationLocation").value

        const data = {
          plant:plant,
          shop:shop,
          line:line,
          installationLocation:installationLocation,  
          //busbars:[],
        }

        return data;
    }
    

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
                                <FormItem className="form-item">
                                    <FormLabel className="form-label" htmlFor="context">{item.name}</FormLabel>
                                    <FormInputText
                                    id="context"
                                    value={value}
                                    onChange={handleValueChange}/>
                                    <Button style={{marginLeft:"10px"}} onClick={handleSumbit}>Set</Button>
                                </FormItem>                        
                        {   
                            mcps.map((mcp, index) => (
                                // <ListGroup item={pdp}><PowerDistributionComponent pdp={pdp}/></ListGroup>
                                <McpConfiguration mcp={mcp}/>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}
    /* const [expanded, setExpanded] = useState(false);
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
} */
    
export default McpInstances;