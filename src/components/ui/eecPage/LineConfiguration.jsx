import "./Eec.css";
import LpdInstances from "./LpdInstances";
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
            <LpdInstances/>
        </>
    )
}
    
export default LineConfiguration;