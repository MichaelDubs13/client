import "./Eec.css";
import LpdConfiguration from "./LpdConfiguration";
import McpConfiguration from "./McpConfiguration";
import PdpConfiguration from "./PdpConfiguration";

const LineConfiguration = () => {
    return (
        <>
            <h2>Line Configuration Selections</h2>
            <PdpConfiguration/>
            <McpConfiguration/>
            <LpdConfiguration/>
        </>
    )
}
    
export default LineConfiguration;