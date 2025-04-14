import { xpdpStore } from '../../Store/xpdpStore';
import { FormLabel, FormInputText, Button, FormItem,Heading } from '@tesla/design-system-react';
import XpdpConfiguration from "./XpdpConfiguration";
import { projectStore } from "../../Store/projectStore";
import { useState } from "react";
import HeadingItem from "../Util/HeadingItem";
import DeleteButton from '../Util/DeleteButton';
import DuplicateButton from '../Util/DuplicateButton';
import "../../Eec.css";


const XpdpConfigurations = () => {
    const line = projectStore((state) => state.line);
    const xpdps = xpdpStore((state) => state.xpdps);
    const addXpdp =  xpdpStore((state) => state.addXpdp);
    const deleteXpdp =  xpdpStore((state) => state.deleteXpdp);
    const duplicateXpdp = xpdpStore((state) => state.duplicateXpdp);
    const [numberOfXPdps, setNumberOfXPdps] = useState(xpdps.length);

    const handleSumbit = (event) => {
        event.preventDefault();  
        addXpdp(numberOfXPdps);
    }
    const handleValueChange = (event)=> {
        setNumberOfXPdps(event.target.value) 
    }    
    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteXpdp(index)
        }
    }
    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateXpdp(index)
        }
    }

    return (
        
        <div>
            <Heading is="h4">120/208VAC Power Distribution Panel Configuration</Heading>
            <FormItem className="form-set-item">
                <FormLabel className="form-set-label" htmlFor="context">Enter the number of 120/208VAC Power Distribution Panels required for this line:</FormLabel>
                <FormInputText
                id="context"
                className="form-set-input"
                value={numberOfXPdps}
                onChange={handleValueChange}/>
                <Button variant='secondary' style={{marginLeft:"10px"}} onClick={handleSumbit}>Set</Button>
            </FormItem>                        
            {   
                xpdps.map((xpdp, index) => {
                    return <HeadingItem label={`120/208VAC Power Distribution Panel ++${line}+${xpdp.location} Parameters`}
                    size={18} margin={"20px"} open={false}
                    headerIcon={"/panel.png"}
                    children={<XpdpConfiguration xpdp={xpdp} xpdpIndex={index}/>} 
                    buttons={[<DeleteButton onClick={() => handleDeleteItem(index)}/>,
                        <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                    ]}/>
                    
                })
            }
        </div>
    );
};
export default XpdpConfigurations;