import {mcpStore} from "../../Store/mcpStore";
import McpLethPorts from "./McpLethPorts";
import SetItemsNumberDropdown from "../Common/SetItemsNumberDropdown";
import "../../Eec.css";
import { FormItem, FormLabel } from "@tesla/design-system-react";

const LethPortConfiguration = ({mcp, index}) => {
    const setNumberOfLethPorts = mcpStore((state) => state.setNumberOfLethPorts);
    const lethNumberOfPortOptions = [
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
      ];
   
    return ( 
         <div>
            <SetItemsNumberDropdown title={`Enter the number of device connections required for this line (i.e., Total number of devices)`} 
                    items={mcp.ports} addItems={setNumberOfLethPorts} index={index} options={lethNumberOfPortOptions}/>   
            <div style={{marginBottom:'30px'}}>
                <h7>Port 1</h7>
                <FormItem style={{display:'flex', marginLeft:'30px'}}>
                    <FormLabel>Interface port:</FormLabel>
                    <FormLabel>Internal (RJ45)</FormLabel>
                </FormItem>
                <FormItem style={{display:'flex', marginLeft:'30px'}}>
                    <FormLabel>Target:</FormLabel>
                    <FormLabel>++{mcp.line}+{mcp.location}-KED01:P6</FormLabel>
                </FormItem>
            </div>
            {
                mcp.ports.slice(1).map((port,portIndex) => {
                    return <McpLethPorts
                        mcpIndex={index}
                        portIndex={portIndex+1}
                        port={port}
                    />
                })
            }
        </div>
    );
};
export default LethPortConfiguration;