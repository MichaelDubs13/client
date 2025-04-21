import {  useState } from "react";
import { FormLabel, FormItem, Button, FormInputText, Heading, } from '@tesla/design-system-react';
import { hmiStore } from "../../Store/hmiStore";
import HmiConfiguration from "./HmiConfiguration";
import HeadingItem from "../Util/HeadingItem";
import { projectStore } from "../../Store/projectStore";
import "../../Eec.css";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";

const HmiInstances = () => {
    // this is the data being used in the UI for the HMI
    const line = projectStore((state) => state.line);
    const hmis = hmiStore((state) => state.hmis);
    const addHmis =  hmiStore((state) => state.addHmis);
    const deleteHmi =  hmiStore((state) => state.deleteHmi);
    const duplicateHmi =  hmiStore((state) => state.duplicateHmi);
    const [numberOfHmis, setNumberOfHmis] = useState(hmis.length);

    const handleSumbit = (event) => {
        event.preventDefault(); 
        addHmis(numberOfHmis); 
    }
    
    const handleValueChange = (event)=> {
        setNumberOfHmis(event.target.value);
    }    

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteHmi(index)
        }
    }

    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateHmi(index)
        }
    }

    return (
        <>
             <div>
                <Heading is="h4">HMI Configuration</Heading>
                <FormItem className="form-set-item">
                    <FormLabel className="form-set-label" htmlFor="context">Enter the number of HMIs required for this line:</FormLabel>
                    <FormInputText
                        id="context"
                        className="form-set-input"
                        value={numberOfHmis}
                        placeholder={hmis.length}
                        onChange={handleValueChange}/>
                    <Button variant='secondary' style={{marginLeft:"10px", marginTop:'10px'}} onClick={handleSumbit}>Set</Button>
                </FormItem>                        
                
                {   
                    hmis.map((hmi, index) => {
                        return <HeadingItem label={`${index+1}:HMI ++${hmi.line}+${hmi.location}-${hmi.hmiDT} Parameters`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={"/panel.png"}
                                children={<HmiConfiguration hmi={hmi} index={index}/>}
                                buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />,
                                    <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                                ]}/>
                    })
                }
            </div>
        </>
    )
}

export default HmiInstances;