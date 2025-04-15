import {  useState } from "react";
import { FormLabel, FormItem, Button, FormInputText, Heading, } from '@tesla/design-system-react';
import { pdpStore } from "../../Store/pdpStore";
import PdpConfiguration from "./PdpConfiguration";
import HeadingItem from "../Util/HeadingItem";
import { projectStore } from "../../Store/projectStore";
import "../../Eec.css";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";

const PdpConfigurations = () => {
    const line = projectStore((state) => state.line);
    const pdps = pdpStore((state) => state.pdps);
    const addPdps =  pdpStore((state) => state.addPdps);
    const deletePdp =  pdpStore((state) => state.deletePdp);
    const duplicatePdp =  pdpStore((state) => state.duplicatePdp);
    const [numberOfPdps, setNumberOfPdps] = useState(pdps.length);

    const handleSumbit = (event) => {
        event.preventDefault(); 
        addPdps(numberOfPdps); 
    }
    
    const handleValueChange = (event)=> {
        setNumberOfPdps(event.target.value);
    }    

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deletePdp(index)
        }
    }

    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicatePdp(index)
        }
    }

    return (
        <>
             <div>
                <Heading is="h4">Power Distribution Panel Configuration</Heading>
                <FormItem className="form-set-item">
                    <FormLabel className="form-set-label" htmlFor="context">Enter the number of Power Distribution Panels required for this line:</FormLabel>
                    <FormInputText
                        id="context"
                        className="form-set-input"
                        value={numberOfPdps}
                        placeholder={pdps.length}
                        onChange={handleValueChange}/>
                    <Button variant='secondary' style={{marginLeft:"10px", marginTop:'10px'}} onClick={handleSumbit}>Set</Button>
                </FormItem>                        
                
                {   
                    pdps.map((pdp, index) => {
                        return <HeadingItem label={`${index+1}:Power Distribution Panel ++${line}+${pdp.location} Parameters`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={"/panel.png"}
                                children={<PdpConfiguration pdp={pdp} index={index}/>}
                                buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />,
                                    <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                                ]}/>
                    })
                }
            </div>
        </>
    )
}

export default PdpConfigurations;