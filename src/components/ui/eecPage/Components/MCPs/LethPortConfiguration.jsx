import InputTextItem from "../Util/InputTextItem";
import {mcpOptions} from "../../Store/mcpStore";
import DropdownItem from "../Util/DropdownItem";
import "../../Eec.css";



const LethPortConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}

    return ( 
        <div>
            <div>
                <h7>Port 2</h7>
                <InputTextItem title={"Target location (e.g., 00010)"} item={mcp} index={mcpIndex} property={"leth_port2_target_location"}/>
                <InputTextItem title={"Target device (e.g., LETH01)"} item={mcp} index={mcpIndex} property={"leth_port2_target_dt"}/>
                <InputTextItem title={"Target port ID (e.g., P1)"} item={mcp} index={mcpIndex} property={"leth_port2_target_port"}/>
                <DropdownItem title={"Target port ID (e.g., P1)"} item={mcp} property={"gb_Port2_CableLength"} options={mcpOptions.cableLengthOptions} index={mcpIndex}/>
            </div>  
            
            
            <div>
                <h7>Port 3</h7>
                <InputTextItem title={"Target location (e.g., 00010)"} item={mcp} index={mcpIndex} property={"leth_port3_target_location"}/>
                <InputTextItem title={"Target device (e.g., LETH01)"} item={mcp} index={mcpIndex} property={"leth_port3_target_dt"}/>
                <InputTextItem title={"Target port ID (e.g., P1)"} item={mcp} index={mcpIndex} property={"leth_port3_target_port"}/>
                <DropdownItem title={"Target port ID (e.g., P1)"} item={mcp} property={"gb_Port3_CableLength"} options={mcpOptions.cableLengthOptions} index={mcpIndex}/>
            </div>
            
            <div>
                <h7>Port 4</h7>
                <InputTextItem title={"Target location (e.g., 00010)"} item={mcp} index={mcpIndex} property={"leth_port4_target_location"}/>
                <InputTextItem title={"Target device (e.g., LETH01)"} item={mcp} index={mcpIndex} property={"leth_port4_target_dt"}/>
                <InputTextItem title={"Target port ID (e.g., P1)"} item={mcp} index={mcpIndex} property={"leth_port4_target_port"}/>
                <DropdownItem title={"Target port ID (e.g., P1)"} item={mcp} property={"gb_Port4_CableLength"} options={mcpOptions.cableLengthOptions} index={mcpIndex}/>
            </div>
            

        </div>
    );
};
export default LethPortConfiguration;