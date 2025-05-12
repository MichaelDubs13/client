import InputTextItem from "../Util/InputTextItem";
import "../../Eec.css";
import DeviceSelection from "../Common/DeviceSelection";


const KedPortConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <DeviceSelection item={mcp} index={mcpIndex} 
                deviceProperty={"ked_port4_target_dt"}
                stationProperty={"ked_port4_target_location"}
                type="networkTarget"/>  
            <DeviceSelection item={mcp} index={mcpIndex} 
                deviceProperty={"ked_port5_target_dt"}
                stationProperty={"ked_port5_target_location"}
                type="networkTarget"/>  
        </div>
    );
};
export default KedPortConfiguration;