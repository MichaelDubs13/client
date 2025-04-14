import { useState } from "react";
import {mcpStore} from "../../Store/mcpStore";
import { FormLabel, FormItem, Button, FormInputText, Heading} from '@tesla/design-system-react';
import HeadingItem from "../Util/HeadingItem";
import { projectStore } from "../../Store/projectStore";
import McpConfiguration from "./McpConfiguration";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";
import "../../Eec.css";

const McpConfigurations = () => {    
    const line = projectStore((state) => state.line);
    const mcps = mcpStore((state) => state.mcps);
    const addMcp =  mcpStore((state) => state.addMcp);
    const deleteMcp =  mcpStore((state) => state.deleteMcp);
    const duplicateMcp = mcpStore((state) => state.duplicateMcp);
    const [numberOfMcps, setNumberOfMcps] = useState(mcps.length);

    const handleSumbit = (event) => {
        event.preventDefault();    
        addMcp(numberOfMcps);
    }
    
    const handleValueChange = (event)=> {
        setNumberOfMcps(event.target.value);
    }
    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteMcp(index)
        }
    }
    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateMcp(index)
        }
    }

    return (
        <>
            <div>
                <Heading is="h4">Main Control Panel Configuration</Heading>
                <FormItem className="form-set-item">
                    <FormLabel className="form-set-label" htmlFor="context">Enter the number of Main Control Panels required for this line:</FormLabel>
                    <FormInputText
                    id="context"
                    className="form-set-input"
                    value={numberOfMcps}
                    onChange={handleValueChange}/>
                    <Button variant='secondary' style={{marginLeft:"10px"}} onClick={handleSumbit}>Set</Button>
                </FormItem>                        
                {   
                    mcps.map((mcp, index) => {
                        const location = mcp.location
                        return <HeadingItem label={`Main Control Panel ++${line}+${location} Parameters:`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={"/panel.png"}
                                children={<McpConfiguration mcp={mcp} index={index}/>}
                                buttons={[<DeleteButton onClick={() => handleDeleteItem(index)}/>,
                                    <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                                ]}/>
                })}
            </div>
        </>
    )
}
    
export default McpConfigurations;