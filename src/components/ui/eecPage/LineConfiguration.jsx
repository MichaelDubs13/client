import "./Eec.css";
import LpdConfiguration from "./LpdConfiguration";
import McpInstances from "./McpInstances";
import PdpConfiguration from "./PdpConfiguration";
import X_PdpConfiguration from "./X_PdpConfiguration";

const LineConfiguration = () => {
    return (
        <>
            <h2>Line Configuration Selections</h2>
            <PdpConfiguration/>
            <X_PdpConfiguration/>
            <McpInstances/>
            <LpdConfiguration/>
        </>
    )
}
    
export default LineConfiguration;