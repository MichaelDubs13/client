import "../../Eec.css";
import { useEffect } from "react";
import { lineStore } from "../../Store/lineStore";
import DropdownItem from "../Util/DropdownItem";


const EthPortConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}
    const getMcpPortOptions = lineStore((state) => state.getMcpPortOptions)        
    const mcpPorts = lineStore((state) => state.mcpPorts)        
    useEffect(() => {
        getMcpPortOptions();
    }, [mcp.location, mcp.line]);

    return ( 

        <div>
            <h7>Port 1 (Ring topology - In)</h7>
            <DropdownItem title={"Target location (e.g., ++LINE+MCP02-XPF-ETH01:P2)"} item={mcp} index={mcpIndex} property={"eth_port1_target_location"} options={mcpPorts}/>
            <DropdownItem title={"Target location (e.g., ++LINE+MCP02-XPF-ETH01:P1)"} item={mcp} index={mcpIndex} property={"eth_port2_target_location"} options={mcpPorts}/>
        </div>  
    );
};
export default EthPortConfiguration;