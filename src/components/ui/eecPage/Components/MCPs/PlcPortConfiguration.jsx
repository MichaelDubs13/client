import InputTextItem from "../Util/InputTextItem";
import {mcpStore} from "../../Store/mcpStore";
import "../../Eec.css";


const PlcPortConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <InputTextItem title={"Port X1:P2R - Target location (i.e., Station number) (e.g., 00010)"} item={mcp} index={mcpIndex} property={"plc_portx1p2r_target_location"} readOnly={true}/>
            <InputTextItem title={"Port X1:P2R - Target device (e.g., MIO01)"} item={mcp} index={mcpIndex} property={"plc_portx1p2r_target_dt"} readOnly={true}/>                                                        
        </div>
    );
};
export default PlcPortConfiguration;