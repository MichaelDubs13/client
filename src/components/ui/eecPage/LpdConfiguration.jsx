import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import lpdStore from "../../../store/eec/lpdStore";
import { FormLabel, FormItem, Button, FormInputText} from '@tesla/design-system-react';
import ItemStore from "../../../store/eec/ItemStore";
import ListGroup from "./ListGroup";
import "./Eec.css";

const LpdConfiguration = () => {
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(0);
    const counts = lpdStore((state)=> state.counts)
    const item = counts[0];
    const lpds = lpdStore((state) => state. lpds);
    const addLpd =  lpdStore((state) => state.addLpd);
    const handleSumbit = (event) => {
        event.preventDefault();    

        const data = createData();
        addLpd(value, data);
    }
    const handleValueChange = (event)=> {
        setValue(event.target.value);
        item.value = event.target.value;
    }
    const handleToggleClick = async () => {
        if (!expanded) {
          setExpanded(true);
          
        } else {
          setExpanded(false);
        }
      };
   
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
                    24VDC Power Distribution Configuration
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
                            lpds.map((lpd, index) => (
                                <ListGroup item={lpd}></ListGroup>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}
    
export default LpdConfiguration;