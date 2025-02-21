import { Component, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import xpdpStore from "../../../store/eec/xpdpStore";
import { FormLabel, FormItem, Button, FormInputText} from '@tesla/design-system-react';
import ListGroup from "./ListGroup";
import ItemStore from "../../../store/eec/ItemStore";
import PowerDistributionComponent from "./PowerDistribution";
import "./Eec.css";
import XpdpConfiguration from "./XpdpConfiguration";

const X_PdpConfiguration = () => {
    const counts = xpdpStore((state)=> state.counts)
    const item = counts[0];
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(0);
    const xpdps = xpdpStore((state) => state.xpdps);
    const addXpdp =  xpdpStore((state) => state.addXpdp);

    const handleSumbit = (event) => {
        event.preventDefault();    

        const data = createData();
        addXpdp(value, data);
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
          busbars:[],
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
                    120/208VAC Power Distribution Panel Configuration
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
                            xpdps.map((xpdp, index) => (
                                // <ListGroup item={pdp}><PowerDistributionComponent pdp={pdp}/></ListGroup>
                                <XpdpConfiguration xpdp={xpdp}/>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}
    
export default X_PdpConfiguration;