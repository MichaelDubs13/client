import InputTextItem from "../Util/InputTextItem";
import "../../Eec.css";


const KedPortConfiguration = ({mcp, index}) => {
    const mcpIndex = {mcpIndex:index}

    return ( 
         <div>
            <InputTextItem title={"Port 4 - Target location (e.g., 00010)"} item={mcp} index={mcpIndex} property={"ked_port4_target_location"}/>
            <InputTextItem title={"Port 4 - Target device (e.g., MIO01)"} item={mcp} index={mcpIndex} property={"ked_port4_target_dt"}/>
            <InputTextItem title={"Port 5 - Target location (e.g., 00010)"} item={mcp} index={mcpIndex} property={"ked_port5_target_location"}/>
            <InputTextItem title={"Port 5 - Target device (e.g., MIO01)"} item={mcp} index={mcpIndex} property={"ked_port5_target_dt"}/>
        </div>
    );
};
export default KedPortConfiguration;