import {mcpStore} from "../../Store/mcpStore";
import { Heading} from '@tesla/design-system-react';
import HeadingItem from "../Util/HeadingItem";
import { projectStore } from "../../Store/projectStore";
import McpConfiguration from "./McpConfiguration";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import "../../Eec.css";

const McpConfigurations = () => {    
    const line = projectStore((state) => state.line);
    const mcps = mcpStore((state) => state.mcps);
    const addMcp =  mcpStore((state) => state.addMcp);
    const deleteMcp =  mcpStore((state) => state.deleteMcp);
    const duplicateMcp = mcpStore((state) => state.duplicateMcp);

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
                <SetItemsNumberInputBox title={"Enter the number of Main Control Panels required for this line:"} items={mcps} addItems={addMcp}/>                                                      
                {   
                    mcps.map((mcp, index) => {
                        const location = mcp.location
                        return <HeadingItem label={`Main Control Panel ++${mcp.line}+${location}:`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={mcp.UI.icon}
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