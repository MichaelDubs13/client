import Tree from "./Tree";
import { useState } from "react";
import { Icon, Text } from '@tesla/design-system-react';
import { iconDirections } from '@tesla/design-system-icons';

const TreeNode = ({ label, children, handleNodeClick})=> {
    const [showChildren, setShowChildren] = useState(false);
    const style = Object.keys(children).length === 0 ? { color: 'grey', fontSize:'20px' } :{ color: 'black', fontSize:'20px' };
  
  
    const handleClick = () => {
        setShowChildren(!showChildren);
    };

    const handleIconClick = () =>{
        handleNodeClick(label);
    }

    return (

    <>

        <div onClick={handleClick} style={{ marginBottom: "10px",display:"flex" }}>
            <Text style={style}>{label}</Text>
            <Icon size="medium" data={iconDirections} onClick={handleIconClick} style={{marginLeft:"10px"}}/>
        </div>

        <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>

        {showChildren && <Tree treeData={children} handleNodeClick={handleNodeClick}/>}

        </ul>

    </>

    );
}

export default TreeNode;
