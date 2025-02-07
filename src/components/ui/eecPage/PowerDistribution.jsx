import ListGroup from "./ListGroup";
import pdpStore from "../../../store/eec/pdpStore";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormLabel, FormInputText, Button, FormItem } from '@tesla/design-system-react';
import { useState } from "react";
import "./Eec.css";

const PowerDistributionComponent = ({pdp}) => {
    const getPowerDistribution =  pdpStore((state) => state.getPowerDistribution);
    //Need to change the const value to change based on the value of the 
    // dpStore.lineGroupItems.find(item => item.parameter === "EnclosureSize").value
    // if "EnclsoureSize" = "800x1400x500(WHD)" then 3 else 4 endif
    const [value, setValue] = useState(0);
    const [busbars, setBusbars] = useState([]);
    const [expanded, setExpanded] = useState(false);
  
    const handleValueChange = (event)=> {
        setValue(event.target.value);
    }

    const handleSumbit = (event) => {
        event.preventDefault(); 
        var busbars = [];
        setBusbars([])
        for (let i = 0; i < value; i++) {
            var parameters = getPowerDistribution();  
            console.log(parameters)  
            var busbar = {
                heading:`Busbar${i === 0? "": i+1}`,
                items:parameters,
            }
            busbars = [...busbars, busbar]
        }

        pdp.busbars = busbars;
        setBusbars(busbars);     
    }
    const handleToggleClick = async () => {
        if (!expanded) {
          setExpanded(true);
          
        } else {
          setExpanded(false);
        }
      };

    return (
        <>
            <div className="div-inline" style={{marginLeft:"30px", marginTop:"15px"}}>
                    <IconContext.Provider value={{ color:"black", size:20 }}>
                    {
                        expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                    }
                    </IconContext.Provider>
                    <button style={{fontSize:23, fontWeight:"bolder"}} 
                        onClick={handleToggleClick}>
                        Power Distribution
                    </button>
                    {
                        expanded &&
                        <div>
                                <div>
                                    <FormItem className="form-item">
                                        <FormLabel className="form-label" htmlFor="context">Number of Busbars</FormLabel>
                                        <FormInputText
                                        id="context"
                                        value={value}
                                        onChange={handleValueChange}/>
                                        <Button style={{marginLeft:"10px"}} onClick={handleSumbit}>Set</Button>
                                    </FormItem>   
                                    {   
                                        busbars.map((busbar, index) => (
                                            <ListGroup item={busbar} groupIndex={index+1}></ListGroup>
                                    ))}
                                </div>
                        </div>
                    }
                </div>
        </>
    )
  };


export default PowerDistributionComponent;