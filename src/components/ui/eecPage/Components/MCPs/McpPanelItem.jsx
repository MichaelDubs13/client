import InputTextItem from "../Util/InputTextItem";
import CheckboxItem from "../Util/CheckboxItem";
import HeadingItem from "../Util/HeadingItem";
import EthConfiguration from "./EthConfiguration";
import LineStationSelection from "../Common/LineStationSelection";
import DeviceSelection from "../Common/DeviceSelection";
import "../../Eec.css";
import { isValidIP } from "../Util/Validations";


const McpPanelItem = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <LineStationSelection title={"MCP mounted in (e.g., ++LINE+LOCATION)"} item={mcp} index={mcpIndex} stationProperty={"mcpMountingLocation"}/>    
            <DeviceSelection item={mcp} index={mcpIndex} 
                deviceTitle={"MCP power source is from what device (e.g., PSU01)"} deviceProperty={"psu_location_dt"}
                stationTitle={"MCP power source is from what location (i.e., Station number) (e.g., 00010)"} stationProperty={"psu_location"}
                type="powerSource"/>                                
            <InputTextItem title={"UPS01 Local IP Address (e.g., 192.168.1.x)"} item={mcp} index={mcpIndex} property={"ups_ip"} validation={isValidIP}/>
            <CheckboxItem title={"PLC-to-PLC Ethernet switch required?"} item={mcp} index={mcpIndex} property={"plc_network_switch_required"}/>
            {
                mcp.plc_network_switch_required && 
                <HeadingItem label={`ETH - Configuration parameters`} size={18} margin={"20px"} open={false} children={<EthConfiguration mcp={mcp} index={index}/>}/>
            }
        </div>
    );
};
export default McpPanelItem;