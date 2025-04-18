import InputTextItem from "../Util/InputTextItem";
import { projectStore } from "../../Store/projectStore";
import {mcpStore} from "../../Store/mcpStore";
import McpPanelItem from "./McpPanelItem";
import HeadingItem from "../Util/HeadingItem";
import PlcConfiguration from "./PlcConfiguration";
import KedConfiguration from "./KedConfiguration";
import LethConfiguration from "./LethConfiguration";
import LineLocationSelection from "../Common/LineLocationSelection";
import "../../Eec.css";

const McpConfiguration = ({mcp, index}) => {
    const setMcpValue = mcpStore((state) => state.setMcpValue);
    const mcpIndex = {mcpIndex:index}

    return (
        
        <div>
            <LineLocationSelection item={mcp} index={mcpIndex} setModelValue={setMcpValue} showPlantShop={true}/>
            <HeadingItem label={`Panel Mounting Location and Options`} size={18} margin={"20px"} open={false} children={<McpPanelItem mcp={mcp} index={index}/>}/>
            <HeadingItem label={`PLC01 Configuration parameters`} size={18} margin={"20px"} open={false} children={<PlcConfiguration mcp={mcp} index={index}/>}/>
            <HeadingItem label={`KED - Plant switch configuration parameters`} size={18} margin={"20px"} open={false} children={<KedConfiguration mcp={mcp} index={index}/>}/>
            <HeadingItem label={`LETH - Configuration parameters`} size={18} margin={"20px"} open={false} children={<LethConfiguration mcp={mcp} index={index}/>}/>
        </div>  
    );
};
export default McpConfiguration;