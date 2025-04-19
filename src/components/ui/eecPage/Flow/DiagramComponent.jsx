import React, { useState,  useEffect } from "react";
import FlowDiagram from "./FlowDiagram";
import { pdpStore } from "../Store/pdpStore";

const DiagramComponent = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [tree, setTree] = useState([]);
    const pdps = pdpStore((state) => state.pdps);
    const position = { x: 0, y: 0 };
    useEffect(()=>{
        const fetchData = async () =>{
            setIsLoading(true);
            var tree = CreateTree(pdps);
            setTree(tree);
            const {nodes: nodes, edges: edges} = CreateNodes(tree);
            setNodes(nodes);
            setEdges(edges);
            setIsLoading(false);
        }

        fetchData();
    }, []);


    const CreateNodes = (tree) => {
        // const nodeNum = 2;
        // const nodeStart_X = nodeNum * 200 / 2;
        var layer = 1;

        const {nodes: nodes, edges: edges} = CreateNodeLayer(tree, layer)
        return {nodes: nodes, edges: edges} ;
    }

    const CreateNodeLayer = (tree, layer, source) => {
        var nodes = [];
        var edges = [];
        var nodeWidth = 400;
        var nodeHeight = 22;
        var index = 0;
        tree.forEach(item => {
            //add node
            const key = `${item.line}+${item.location}+${index}`;
            const target = `${key}_${layer}`;
            var node =   { id: target, data: { label: key }, type:'customNode', width: nodeWidth, height: nodeHeight, position, }
            nodes.push(node);
            index++;
        })

        return {nodes:nodes, edges: edges};
    }

    const CreateTree = (pdps) => {
        var tree = pdps;
        
        return tree;
    }

    return (
    <>
       <FlowDiagram initialNodes={nodes} initialEdges={edges} treeData={tree} />
    </>
    )
}

export default DiagramComponent;