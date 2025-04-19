import { Handle, Position } from '@xyflow/react';
import { Text, } from "@tesla/design-system-react";
const handleStyle = { left: 10 };
 
export default function CustomNode({ data }) {
  
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="auto-width-node">
        
            <img src={"/panel.png"} style={{transform: 'scale(1)', verticalAlign:'top'}}/>
            <Text>{data.label}</Text>
        
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}