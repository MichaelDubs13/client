import TreeNode from "./TreeNode";

const Tree = ({ treeData, handleNodeClick }) => {

    return (
  
      <ul>
        {
            treeData.map((item, i)=>{
                return <TreeNode label={item.location} children={item} handleNodeClick={handleNodeClick} />
            })
        }
  
      </ul>
  
    );
  
}

export default Tree;