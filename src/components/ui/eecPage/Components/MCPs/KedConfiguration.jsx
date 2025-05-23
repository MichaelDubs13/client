import InputTextItem from "../Util/InputTextItem";
import HeadingItem from "../Util/HeadingItem";
import "../../Eec.css";
import KedPortConfiguration from "./KedPortConfiguration";
import { isValidIP } from "../Util/Validations";


const KedConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <InputTextItem title={"Plant IP Address (e.g., 10.x.x.x)"} item={mcp} index={mcpIndex} property={"ked_plant_ip"} validation={isValidIP}/>
            <InputTextItem title={"PLC-to-PLC IP Address (e.g., 192.168.136.x)"} item={mcp} index={mcpIndex} property={"ked_plc_to_plc_ip"} validation={isValidIP}/>
            <InputTextItem title={"Local IP Address (e.g., 192.168.1.x)"} item={mcp} index={mcpIndex} property={"ked_local_ip"} validation={isValidIP}/>                                                    
            <InputTextItem title={"Secondary Local IP Address (e.g., 192.168.x.x)"} item={mcp} index={mcpIndex} property={"ked_local_ip_secondar"} readOnly={true}/>                                                    
            
            {/* do not delete - need this later */}
            {/* <HeadingItem label={`KED - Port configuration parameters`} size={18} margin={"20px"} open={false} children={<KedPortConfiguration mcp={mcp} index={index}/>}/> */}
        </div>
    );
};
export default KedConfiguration;