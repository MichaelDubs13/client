import InputTextItem from "../Util/InputTextItem";
import {mcpStore, mcpOptions} from "../../Store/mcpStore";
import DropdownItem from "../Util/DropdownItem";
import "../../Eec.css";



const LethPortConfiguration = ({mcp, index}) => {
    const setMcpValue = mcpStore((state) => state.setMcpValue);
    const mcpIndex = {mcpIndex:index}

    return ( 
        <div>
            <div>
                <h7>Port 2</h7>
                <InputTextItem title={"Target location (e.g., 00010)"} placeHolder={mcp.leth_port2_target_location} setModelValue={setMcpValue} index={mcpIndex} property={"leth_port2_target_location"}/>
                <InputTextItem title={"Target device (e.g., LETH01)"} placeHolder={mcp.leth_port2_target_dt} setModelValue={setMcpValue} index={mcpIndex} property={"leth_port2_target_dt"}/>
                <InputTextItem title={"Target port ID (e.g., P1)"} placeHolder={mcp.leth_port2_target_port} setModelValue={setMcpValue} index={mcpIndex} property={"leth_port2_target_port"}/>
                <DropdownItem title={"Target port ID (e.g., P1)"} placeHolder={mcp.gb_Port2_CableLength} options={mcpOptions.cableLengthOptions} setModelValue={setMcpValue} index={mcpIndex} property={"gb_Port2_CableLength"}/>
            </div>  
            
            
            <div>
                <h7>Port 3</h7>
                <InputTextItem title={"Target location (e.g., 00010)"} placeHolder={mcp.leth_port3_target_location} setModelValue={setMcpValue} index={mcpIndex} property={"leth_port3_target_location"}/>
                <InputTextItem title={"Target device (e.g., LETH01)"} placeHolder={mcp.leth_port3_target_dt} setModelValue={setMcpValue} index={mcpIndex} property={"leth_port3_target_dt"}/>
                <InputTextItem title={"Target port ID (e.g., P1)"} placeHolder={mcp.leth_port3_target_port} setModelValue={setMcpValue} index={mcpIndex} property={"leth_port3_target_port"}/>
                <DropdownItem title={"Target port ID (e.g., P1)"} placeHolder={mcp.gb_Port3_CableLength} options={mcpOptions.cableLengthOptions} setModelValue={setMcpValue} index={mcpIndex} property={"gb_Port3_CableLength"}/>
            </div>
            
            <div>
                <h7>Port 4</h7>
                <InputTextItem title={"Target location (e.g., 00010)"} placeHolder={mcp.leth_port4_target_location} setModelValue={setMcpValue} index={mcpIndex} property={"leth_port4_target_location"}/>
                <InputTextItem title={"Target device (e.g., LETH01)"} placeHolder={mcp.leth_port4_target_dt} setModelValue={setMcpValue} index={mcpIndex} property={"leth_port4_target_dt"}/>
                <InputTextItem title={"Target port ID (e.g., P1)"} placeHolder={mcp.leth_port4_target_port} setModelValue={setMcpValue} index={mcpIndex} property={"leth_port4_target_port"}/>
                <DropdownItem title={"Target port ID (e.g., P1)"} placeHolder={mcp.gb_Port4_CableLength} options={mcpOptions.cableLengthOptions} setModelValue={setMcpValue} index={mcpIndex} property={"gb_Port4_CableLength"}/>
            </div>
            

        </div>
    );
};
export default LethPortConfiguration;