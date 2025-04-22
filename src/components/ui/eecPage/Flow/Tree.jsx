import TreeNode from "./TreeNode";

const Tree = ({ treeData, handleNodeClick }) => {

    return (
  
      <ul>
        {
            treeData.map((item, i)=>{
                return <TreeNode label={item.data.key} children={item.children} handleNodeClick={handleNodeClick} />
            })
        }
  
      </ul>
  
    );
  
}

export default Tree;