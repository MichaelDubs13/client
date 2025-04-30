import {mcpStore} from "../../Store/mcpStore";
import McpLethPorts from "./McpLethPorts";
import SetItemsNumberDropdown from "../Common/SetItemsNumberDropdown";
import "../../Eec.css";

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
            {
                mcp.ports.map((port,portIndex) => {
                    console.log(mcp)
                    console.log(port)
                    return <McpLethPorts
                        mcpIndex={index}
                        portIndex={portIndex}
                        port={port}
                    />
                })
            }
        </div>
    );
};
export default LethPortConfiguration;