import { Handle, Position } from '@xyflow/react';
import { Text, DataTable, TBody } from "@tesla/design-system-react";
const handleStyle = { left: 10 };
 
export default function CustomNode({ data }) {
  
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="auto-width-node">
            <img src={data.icon} style={{transform: 'scale(1)', verticalAlign:'top'}}/>
            <DataTable border={4}> 
                <TBody>
                { 
                    data.label?.map( (row, key) =>{
                    return(
                        <tr style={{height:'10px'}}>
                            <td>{row}</td>
                        </tr>
                        
                    )})
                }
                </TBody>
            </DataTable>
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