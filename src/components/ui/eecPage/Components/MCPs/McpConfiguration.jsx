import McpPanelItem from "./McpPanelItem";
import HeadingItem from "../Util/HeadingItem";
import PlcConfiguration from "./PlcConfiguration";
import KedConfiguration from "./KedConfiguration";
import LethConfiguration from "./LethConfiguration";
import LineLocationSelection from "../Common/LineLocationSelection";
import "../../Eec.css";

const McpConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}
    const handleLineChange = (value) => {
        mcp.setPortsLine(value);
    }
    return (
        
        <div>
            <LineLocationSelection item={mcp} index={mcpIndex} showPlantShop={true} onLineChange={handleLineChange}/>
            <HeadingItem label={`Panel Mounting Location and Options`} size={18} margin={"20px"} open={false} children={<McpPanelItem mcp={mcp} index={index}/>}/>
            <HeadingItem label={`PLC01 Configuration parameters`} size={18} margin={"20px"} open={false} children={<PlcConfiguration mcp={mcp} index={index}/>}/>
            <HeadingItem label={`KED - Plant switch configuration parameters`} size={18} margin={"20px"} open={false} children={<KedConfiguration mcp={mcp} index={index}/>}/>
            <HeadingItem label={`LETH - Configuration parameters`} size={18} margin={"20px"} open={false} children={<LethConfiguration mcp={mcp} index={index}/>}/>
        </div>  
    );
};
export default McpConfiguration;