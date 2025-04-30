import InputTextItem from "../Util/InputTextItem";
import "../../Eec.css";
import DeviceSelection from "../Common/DeviceSelection";


const KedPortConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <DeviceSelection item={mcp} index={mcpIndex} 
                deviceTitle={"Port 4 - Target device (e.g., MIO01)"} deviceProperty={"ked_port4_target_dt"}
                stationTitle={"Port 4 - Target location (e.g., 00010)"} stationProperty={"ked_port4_target_location"}/>  
            <DeviceSelection item={mcp} index={mcpIndex} 
                deviceTitle={"Port 5 - Target device (e.g., MIO01)"} deviceProperty={"ked_port5_target_dt"}
                stationTitle={"Port 5 - Target location (e.g., 00010)"} stationProperty={"ked_port5_target_location"}/>  
        </div>
    );
};
export default KedPortConfiguration;