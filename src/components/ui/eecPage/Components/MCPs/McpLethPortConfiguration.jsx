import {mcpStore} from "../../Store/mcpStore";
import McpLethPorts from "./McpLethPorts";
import "../../Eec.css";


const LethConfiguration = ({mcp, mcpIndex}) => {
    const setNumberOfLethPorts = mcpStore((state) => state.setNumberOfLethPorts);
    const mcpIndex = {mcpIndex:mcpIndex}
    const lethNumberOfPortOptions = [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
      ];
    const handleSetlethNumberOfPortsChange = (event)=>{
        const value = event.value;
        setNumberOfLethPorts(mcpIndex, value);
    }
    
    return ( 
         <div>
            <FormItem className="form-item">
                <FormLabel className="form-label" htmlFor="context">Enter the number of device connections required for this line (i.e., Total number of devices)</FormLabel>
                <FormInputDropdown
                id="context"
                options={lethNumberOfPortOptions}
                value={mcp.ports.length}
                onOptionSelect={handleSetlethNumberOfPortsChange}/>
            </FormItem>

            <div>
                <h7>----</h7>
            </div>
            {/* Need to insert the remaining 0-9 port inputs based on the number of ports selected in the previous question*/}
            {/* Render all LETH ports*/}
            {
                mcp.ports.map((port,index) => {
                    <McpLethPorts
                        mcpIndex={mcpIndex}
                        portIndex={index}
                        port={port}
                    />
                })
            }
        </div>
    );
};
export default LethConfiguration;