import InputTextItem from "../Util/InputTextItem";
import HeadingItem from "../Util/HeadingItem";
import EthPortConfiguration from "./EthPortConfiguration";
import "../../Eec.css";


const EthConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <InputTextItem title={"Plant IP Address (e.g., 10.x.x.x)"} item={mcp} index={mcpIndex} property={"eth_plant_ip"}/>
            <InputTextItem title={"PLC-to-PLC IP Address (e.g., 192.168.136.x)"} item={mcp} index={mcpIndex} property={"eth_plc_to_plc_ip"}/>
            <InputTextItem title={"Local IP Address (e.g., 192.168..x)"} item={mcp} index={mcpIndex} property={"eth_local_ip"}/>                                                    
            <InputTextItem title={"Secondary Local IP Address (e.g., 192.168.x.x)"} item={mcp} index={mcpIndex} property={"eth_local_ip_secondary"} readOnly={true}/>                                                    
            <HeadingItem label={`ETH - Port configuration parameters`} size={18} margin={"20px"} open={false} children={<EthPortConfiguration mcp={mcp} index={index}/>}/>
        </div>
    );
};
export default EthConfiguration;