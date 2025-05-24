import "../../Eec.css";
import { useEffect, useState } from "react";
import DropdownItem from "../Util/DropdownItem";
import { lineConfiguration } from "../../Store/lineStore";


const EthPortConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}     
    const [portOptions , setPortOptions]=useState([]);
    useEffect(() => {
        var options = lineConfiguration.getMcpPortOptions();
        setPortOptions(options);
    }, [mcp.location, mcp.line]);

    return ( 

        <div>
            <h7>Port 1 (Ring topology - In)</h7>
            <DropdownItem title={"Target location (e.g., MCP01, MCP02)"} item={mcp} index={mcpIndex} property={"eth_port1_target_location"} options={portOptions}/>
            <DropdownItem title={"Target location (e.g., MCP01, MCP02)"} item={mcp} index={mcpIndex} property={"eth_port2_target_location"} options={portOptions}/>
        </div>  
    );
};
export default EthPortConfiguration;