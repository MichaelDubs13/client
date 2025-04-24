import {  useState } from "react";
import { FormLabel, FormItem, Button, FormInputText, Heading, } from '@tesla/design-system-react';
import { safetyGateStore } from "../../Store/safetyGateStore";
import SafetyGateInstances from "./SafetyGateInstances";
import HeadingItem from "../Util/HeadingItem";
import { projectStore } from "../../Store/projectStore";
import "../../Eec.css";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";

const SafetyGateLocationCount = () => {
    // this is the data being used in the UI for the safety gate switches
    const line = projectStore((state) => state.line);
    const safetyGates = safetyGateStore((state) => state.safetyGates);
    const addSafetyGates =  safetyGateStore((state) => state.addSafetyGates);
    const deleteSafetyGate =  safetyGateStore((state) => state.deleteSafetyGate);
    const duplicateSafetyGate =  safetyGateStore((state) => state.duplicateSafetyGate);
    const [numberOfSafetyGates, setNumberOfSafetyGates] = useState(safetyGates.length);

    const handleSumbit = (event) => {
        event.preventDefault(); 
        addSafetyGates(numberOfSafetyGates); 
    }
    
    const handleValueChange = (event)=> {
        setNumberOfSafetyGates(event.target.value);
    }    

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteSafetyGate(index)
        }
    }

    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateSafetyGate(index)
        }
    }

    return (
        <>
             <div>
                <Heading is="h4">Safety Gate Switch Configuration</Heading>
                <FormItem className="form-set-item">
                    <FormLabel className="form-set-label" htmlFor="context">Enter the number of LOCATIONs (i.e., Station numbers) in which Safety Gate Switches are required for this LINE:</FormLabel>
                    <FormInputText
                        id="context"
                        className="form-set-input"
                        value={numberOfSafetyGates}
                        placeholder={safetyGates.length}
                        onChange={handleValueChange}/>
                    <Button variant='secondary' style={{marginLeft:"10px", marginTop:'10px'}} onClick={handleSumbit}>Set</Button>
                </FormItem>                        
                
                {   
                    safetyGates.map((safetyGate, index) => {
                        return <HeadingItem label={`${index+1}:The group of Safety Gate Switches within ++${line}+${safetyGate.location}`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={safetyGate.UI.icon}
                                children={<SafetyGateInstances safetyGate={safetyGate} index={index}/>}
                                buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />,
                                    <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                                ]}/>
                    })
                }
            </div>
        </>
    )
}

export default SafetyGateLocationCount;