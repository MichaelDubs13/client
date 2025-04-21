import {Button, FormInputSearch, FormInputDropdown } from "@tesla/design-system-react";
import { useCallback, useState } from "react";
import {
  Background,
  useViewport,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "@xyflow/react";

import dagre from '@dagrejs/dagre';
import "@xyflow/react/dist/style.css";
import CustomNode from "./CustomNode";
import Tree from "./Tree";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const nodeTypes = {
  customNode: CustomNode,
};

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    //dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    dagreGraph.setNode(node.id, { width: node.width, height: node.height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - node.width / 2,
        y: nodeWithPosition.y - node.height / 2 + node.layer * 300,
      },
    };

    return newNode;
  });
  return { nodes: newNodes, edges };
};

const Flow = ({initialNodes, initialEdges, treeData}) => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes,initialEdges);
  const [query, setQuery] = useState("")
  const { setCenter, zoomIn, zoomOut } = useReactFlow();

  const handleSearchChange = async (event)=>{
    const searchValue = event.target.value;
    setQuery(searchValue);
  }

  const handlePanToCenter = () => {
    var targetNode = layoutedNodes[0]
    if(targetNode){
        setCenter(targetNode.position.x, targetNode.position.y+ 200, { duration: 800,});
    }
  }

  const startsWith = (array, searchValue)=>{
      const match = array.find(item => item.toLowerCase().startsWith(searchValue))
      if(match){
        return true;
      }
      return false;
  }
  const handleSearchKeyPress = async (event) => {
    if (event.key === 'Enter') {
        const searchValue = event.target.value.toLowerCase();
        var targetNode = layoutedNodes.find(node => startsWith(node.data.label, searchValue))
        if(targetNode){
            setCenter(targetNode.position.x, targetNode.position.y + 200, { duration: 800, });
        }
    }
  }  

  const handeNodeClick = async (event)=>{
    var targetNode = layoutedNodes.find(node => node.data.key.includes(event))
    if(targetNode){
        setCenter(targetNode.position.x, targetNode.position.y + 200, { duration: 800, });
    }
  }

  return (
    <div style={{ width: '75vw', height: '75vh' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={layoutedNodes}
                edges={layoutedEdges}
                fitView
                //style={{ backgroundColor: "#F7F9FB" }}
              >
              <Panel position="top-center">
                <Button variant="secondary" onClick={() => zoomIn({ duration: 800 })}>zoom in</Button>
                <Button variant="secondary" onClick={() => zoomOut({ duration: 800 })}>zoom out</Button>
                <Button variant="secondary" onClick={handlePanToCenter}>pan to center</Button>
                <FormInputSearch style={{height:"25px", width:"200px", fontSize:"15px"}} 
                  highlighted={true} value={query} onChange={handleSearchChange}
                  onKeyUp={handleSearchKeyPress}
                  placeholder="Search for node"/>
              </Panel>
              <Panel position="top-left">
                <Tree treeData={treeData} handleNodeClick={handeNodeClick}/>
              </Panel>
              <Background />
              {/* <MiniMap 
                position="top-left"
                maskColor="rgb(0,0,0, 0.1)"
                style={{
                  border: "1px solid black"
                }}
                pannable 
                zoomable /> */}
            </ReactFlow>
    </div>
  );
}

const FlowDiagram = ({initialNodes, initialEdges, treeData}) => {
  return (
    <ReactFlowProvider>
      <Flow initialNodes={initialNodes} initialEdges={initialEdges} treeData={treeData}/>
    </ReactFlowProvider>
  );
}

export default FlowDiagram;