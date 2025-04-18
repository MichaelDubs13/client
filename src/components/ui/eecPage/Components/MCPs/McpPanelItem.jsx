import InputTextItem from "../Util/InputTextItem";
import {mcpStore} from "../../Store/mcpStore";
import CheckboxItem from "../Util/CheckboxItem";
import HeadingItem from "../Util/HeadingItem";
import EthConfiguration from "./EthConfiguration";
import StationSelection from "../Common/StationSelection";
import DeviceSelection from "../Common/DeviceSelection";
import "../../Eec.css";


const McpPanelItem = ({mcp, index}) => {
    const setMcpValue = mcpStore((state) => state.setMcpValue);
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <StationSelection title={"MCP mounted in Station number (e.g., 00010)"} item={mcp} setModelValue={setMcpValue} index={mcpIndex} property={"mcpMountingLocation"}/>    
            <StationSelection title={"MCP power source is from what location (i.e., Station number) (e.g., 00010)"} item={mcp} setModelValue={setMcpValue} index={mcpIndex} property={"psu_location"}/>    
            <DeviceSelection title={"MCP power source is from what device (e.g., PSU01)"} item={mcp} setModelValue={setMcpValue} index={mcpIndex} property={"psu_location_dt"} station={mcp.psu_location}/>                                
            <InputTextItem title={"UPS01 Local IP Address (e.g., 192.168.1.x)"} placeHolder={mcp.ups_ip} setModelValue={setMcpValue} index={mcpIndex} property={"ups_ip"}/>
            <CheckboxItem title={"PLC-to-PLC Ethernet switch required?"} placeHolder={mcp.plc_network_switch_required} setModelValue={setMcpValue} index={mcpIndex} property={"plc_network_switch_required"}/>
            {
                mcp.plc_network_switch_required && 
                <HeadingItem label={`ETH - Configuration parameters`} size={18} margin={"20px"} open={false} children={<EthConfiguration mcp={mcp} index={index}/>}/>
            }
        </div>
    );
};
export default McpPanelItem;