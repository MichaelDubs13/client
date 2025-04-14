import InputTextItem from "../Util/InputTextItem";
import {mcpStore} from "../../Store/mcpStore";
import "../../Eec.css";


const EthPortConfiguration = ({mcp, index}) => {
    const setMcpValue = mcpStore((state) => state.setMcpValue);
    const mcpIndex = {mcpIndex:index}

    return ( 

        <div>
            <h7>Port 1 (Ring topology - In)</h7>
            <InputTextItem title={"Target location (e.g., MCP01, MCP02)"} placeHolder={mcp.eth_port1_target_location} setModelValue={setMcpValue} index={mcpIndex} property={"eth_port1_target_location"}/>
            <InputTextItem title={"Target location (e.g., MCP01, MCP02)"} placeHolder={mcp.eth_port2_target_location} setModelValue={setMcpValue} index={mcpIndex} property={"eth_port2_target_location"}/>
        </div>  
    );
};
export default EthPortConfiguration;