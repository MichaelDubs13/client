import { Component, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import pdpStore from "../../../store/eec/pdpStore";
import { FormLabel, FormItem, Button, FormInputText} from '@tesla/design-system-react';
import ListGroup from "./ListGroup";
import ItemStore from "../../../store/eec/ItemStore";
import PowerDistributionComponent from "./PowerDistribution";
import "./Eec.css";
import MEB_PDP_Testing from "./M_W_PdpConfiguration";

const PdpConfiguration = () => {
    const counts = pdpStore((state)=> state.counts)
    const item = counts[0];
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(0);
    const pdps = pdpStore((state) => state.pdps);
    const addPdp =  pdpStore((state) => state.addPdp);

    const handleSumbit = (event) => {
        event.preventDefault();    

        const data = createData();
        addPdp(value, data);
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
                    Power Distribution Panel Configuration
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
                            pdps.map((pdp, index) => (
                                // <ListGroup item={pdp}><PowerDistributionComponent pdp={pdp}/></ListGroup>
                                // <ListGroup item={pdp}><MEB_PDP_Testing pdp={pdp}/></ListGroup>
                                <MEB_PDP_Testing pdp={pdp}/>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}
    
export default PdpConfiguration;