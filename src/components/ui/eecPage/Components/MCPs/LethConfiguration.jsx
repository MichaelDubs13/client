import InputTextItem from "../Util/InputTextItem";
import {mcpStore} from "../../Store/mcpStore";
import HeadingItem from "../Util/HeadingItem";
import LethPortConfiguration from "./LethPortConfiguration";
import "../../Eec.css";


const LethConfiguration = ({mcp, index}) => {
    const setMcpValue = mcpStore((state) => state.setMcpValue);
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <InputTextItem title={"Plant IP Address (e.g., 10.x.x.x)"} item={mcp} index={mcpIndex} property={"leth_plant_ip"}/>
            <InputTextItem title={"PLC-to-PLC IP Address (e.g., 192.168.136.x)"} item={mcp} index={mcpIndex} property={"leth_plc_to_plc_ip"}/>            
            <InputTextItem title={"Local IP Address (e.g., 192.168..x)"} item={mcp} index={mcpIndex} property={"leth_local_ip"}/>            
            <InputTextItem title={"Secondary Local IP Address (e.g., 192.168.x.x)"} item={mcp} index={mcpIndex} property={"leth_local_ip_secondary"}/> 
            <HeadingItem label={`LETH - Port configuration parameters`} size={18} margin={"20px"} open={false} children={<LethPortConfiguration mcp={mcp} index={index}/>}/>           
        </div>
    );
};
export default LethConfiguration;