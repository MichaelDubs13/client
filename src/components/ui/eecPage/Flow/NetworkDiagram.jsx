import React, { useState,  useEffect } from "react";
import FlowDiagram from "./FlowDiagram";
import * as NodeCreator from "./NodeCreator";
import { mcpStore } from "../Store/mcpStore";
import { networkSwitchStore } from "../Store/networkSwitchStore";
import { lineConfiguration } from "../Store/lineStore";

const NetworkDiagram = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [tree, setTree] = useState([]);
    const mcps = mcpStore((state) => state.mcps);
    const networkSwitches = networkSwitchStore((state)=>state.networkSwitches);

    useEffect(()=>{
        const fetchData = async () =>{
            setIsLoading(true);
            const {nodes: nodes, edges: edges} = CreateNodes(networkSwitches);
            var tree = CreateTree(nodes);
            setTree(tree);
            setNodes(nodes);
            setEdges(edges);
            setIsLoading(false);
        }

        fetchData();
    }, []);


    const CreateNodes = (networkSwitches) => {
        var nodes = [];
        var edges = [];
        var nodeWidth = 400;
        var nodeHeight = 22;
        var layer = 1;
        networkSwitches.forEach(networkSwitch => {
            createMcpNodes(networkSwitch, layer, nodeWidth, nodeHeight, nodes, edges)
        })

        console.log(nodes)
        console.log(edges)
        return {nodes:nodes, edges: edges};
    }
   
    const createMcpNodes = (networkSwitch, layer, nodeWidth, nodeHeight, nodes, edges)=>{
        var networkSwitchNode = NodeCreator.createDeviceNode(networkSwitch, layer, nodeWidth, nodeHeight);
        nodes.push(networkSwitchNode);
        const targetDeviceLayer = layer + 1;
        networkSwitch.ports.forEach(port => {
            createTargetDeviceNode(port, networkSwitchNode, targetDeviceLayer, nodeWidth, nodeHeight, nodes, edges)
        })
       
    }
    const createTargetDeviceNode = (item, parentNode, layer, nodeWidth, nodeHeight, nodes, edges) => {
            if(!item) return;
            if (Object.keys(item).length === 0) return;
            const targetDeviceId = item.data.ethernetTarget;
            if(targetDeviceId){
                var targetDevice = lineConfiguration.getDeviceById(targetDeviceId);
                if(targetDevice){                
                    // var device = createDeviceNodes(targetDevice,parentNode, layer, nodeWidth, nodeHeight);
                    // nodes.push(...device.nodes)
                    // edges.push(...device.edges);
                }
            }  else {
                if(item.line && item.targetDT && item.targetLocation)
                {
                    var deviceNode = NodeCreator.createNetworkDeviceNode(item, layer, nodeWidth, nodeHeight);
                    nodes.push(deviceNode);
                    var edge = NodeCreator.createEdge(parentNode, deviceNode);
                    edges.push(edge);
                }
            }
        }

    const CreateTree = (nodes) => {
        var tree = nodes.filter(node => node.data.type === 'networkSwitch');
        return tree;
    }

    return (
    <>
       <FlowDiagram initialNodes={nodes} initialEdges={edges} treeData={tree} />
    </>
    )
}

export default NetworkDiagram;