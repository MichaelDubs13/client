import InputTextItem from "../Util/InputTextItem";
import {mcpStore} from "../../Store/mcpStore";
import HeadingItem from "../Util/HeadingItem";
import PlcPortConfiguration from './PlcPortConfiguration'
import "../../Eec.css";
import { isValidIP } from "../Util/Validations";


const PlcConfiguration = ({mcp, index}) => {
    const setMcpValue = mcpStore((state) => state.setMcpValue);
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <InputTextItem title={"Plant IP Address (e.g., 10.x.x.x)"} item={mcp} index={mcpIndex} property={"plc_plant_ip"} validation={isValidIP}/>
            <InputTextItem title={"PLC-to-PLC IP Address (e.g., 192.168.136.x)"} item={mcp} index={mcpIndex} property={"plc_to_plc_ip"} validation={isValidIP}/>
            <InputTextItem title={"Local IP Address (e.g., 192.168..x)"} item={mcp} index={mcpIndex} property={"plc_local_ip"} validation={isValidIP}/>
            <InputTextItem title={"Secondary Local IP Address (e.g., 192.168.x.x)"} item={mcp} index={mcpIndex} property={"plc_local_ip_secondary"} readOnly={true}/>
            <InputTextItem title={"PLC ID (used to identify all devices controlled by this PLC"} item={mcp} index={mcpIndex} property={"plc_id"}/>
            <HeadingItem label={`PLC01 - Port configuration parameters`} size={18} margin={"20px"} open={false} children={<PlcPortConfiguration mcp={mcp} index={index}/>}/>
        </div>
    );
};
export default PlcConfiguration;