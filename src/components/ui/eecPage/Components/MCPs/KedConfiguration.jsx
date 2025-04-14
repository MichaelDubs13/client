import InputTextItem from "../Util/InputTextItem";
import {mcpStore} from "../../Store/mcpStore";
import HeadingItem from "../Util/HeadingItem";
import "../../Eec.css";
import KedPortConfiguration from "./KedPortConfiguration";


const KedConfiguration = ({mcp, index}) => {
    const setMcpValue = mcpStore((state) => state.setMcpValue);
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <InputTextItem title={"Plant IP Address (e.g., 10.x.x.x)"} placeHolder={mcp.ked_plant_ip} setModelValue={setMcpValue} index={mcpIndex} property={"ked_plant_ip"}/>
            <InputTextItem title={"PLC-to-PLC IP Address (e.g., 192.168.136.x)"} placeHolder={mcp.ked_plc_to_plc_ip} setModelValue={setMcpValue} index={mcpIndex} property={"ked_plc_to_plc_ip"}/>
            <InputTextItem title={"Local IP Address (e.g., 192.168..x)"} placeHolder={mcp.ked_local_ip} setModelValue={setMcpValue} index={mcpIndex} property={"ked_local_ip"}/>                                                    
            <InputTextItem title={"Secondary Local IP Address (e.g., 192.168.x.x)"} placeHolder={mcp.ked_local_ip_secondar} setModelValue={setMcpValue} index={mcpIndex} property={"ked_local_ip_secondar"} readOnly={true}/>                                                    
            <HeadingItem label={`KED - Port configuration parameters`} size={18} margin={"20px"} open={false} children={<KedPortConfiguration mcp={mcp} index={index}/>}/>
        </div>
    );
};
export default KedConfiguration;