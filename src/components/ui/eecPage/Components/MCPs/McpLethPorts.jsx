import InputTextItem from "../Util/InputTextItem";
import "../../Eec.css";

const McpLethPorts = ({ 
    mcpIndex,
    portIndex,
    port,
}) => {
  const index = {mcpIndex:mcpIndex, portIndex:portIndex}
  const setPortValue = mcpStore((state) => state.setPortValue);
  return (
      <div className="com-drop-item">
        <div className="com-drop-header">
          <h7>Port {portIndex+5}</h7>
          <InputTextItem title={"Target device location (e.g., 00010)"} placeHolder={port.targetLocation} setModelValue={setPortValue} index={index} property={"targetLocation"}/>
          <InputTextItem title={"Target device tag (e.g., RBC01)"} placeHolder={port.targetDT} setModelValue={setPortValue} index={index} property={"targetDT"}/>
          <InputTextItem title={"Target device Port"} placeHolder={port.targetPort} setModelValue={setPortValue} index={index} property={"targetPort"}/>
          <InputTextItem title={"Target cable length"} placeHolder={port.targetCableLength} setModelValue={setPortValue} index={index} property={"targetCableLength"}/>
        </div>
      </div>
    );
  };
  
  export default McpLethPorts;