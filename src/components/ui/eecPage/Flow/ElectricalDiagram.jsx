import React, { useState,  useEffect } from "react";
import FlowDiagram from "./FlowDiagram";
import { pdpStore } from "../Store/pdpStore";
import * as NodeCreator from "./NodeCreator";
import { xpdpStore } from "../Store/xpdpStore";
import { lineConfiguration } from "../Store/lineStore";

const ElectricalDiagram = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [tree, setTree] = useState([]);
    const pdps = pdpStore((state) => state.pdps);
    const xpdps = xpdpStore((state) => state.xpdps);

    useEffect(()=>{
        const fetchData = async () =>{
            setIsLoading(true);
            const {nodes: nodes, edges: edges} = CreateNodes(pdps, xpdps);
            var tree = CreateTree(nodes);
            setTree(tree);
            setNodes(nodes);
            setEdges(edges);
            setIsLoading(false);
        }

        fetchData();
    }, []);


    const CreateNodes = (pdps, xpdps) => {
        var nodes = [];
        var edges = [];
        var nodeWidth = 400;
        var nodeHeight = 22;
        var layer = 1;
        pdps.forEach(pdp => {
            createPdpNodes(pdp, layer, nodeWidth, nodeHeight, nodes, edges)
        })

        xpdps.forEach(pdp => {
            createPdpNodes(pdp, layer, nodeWidth, nodeHeight, nodes, edges)
        })
        console.log(pdps)
        console.log(nodes)
        console.log(edges)
        return {nodes:nodes, edges: edges};
    }
   
    const createPdpNodes = (pdp, layer, nodeWidth, nodeHeight, nodes, edges)=>{
        var pdpNode = NodeCreator.createDeviceNode(pdp, layer, nodeWidth, nodeHeight);
        nodes.push(pdpNode);
        layer = 2;
        const targetDeviceLayer = 3;
        Object.keys(pdp.branchCircuit).forEach(key => {
            pdp.branchCircuit[key].forEach(drop => {
                var branchCircuitNode = NodeCreator.createDeviceNode(drop, layer, nodeWidth, nodeHeight);
                if(!branchCircuitNode) return;
                nodes.push(branchCircuitNode);
                var edge = NodeCreator.createEdge(pdpNode, branchCircuitNode);
                edges.push(edge);
                
                createTargetDeviceNode(drop, branchCircuitNode, targetDeviceLayer, nodeWidth, nodeHeight, nodes, edges)
            })
        });
    }
    
    const createTargetDeviceNode = (item, parentNode, layer, nodeWidth, nodeHeight, nodes, edges) => {
        if(!item) return;
        if (Object.keys(item).length === 0) return;
        const targetDeviceId = item.data.targetDevice;
        if(targetDeviceId){
            var targetDevice = lineConfiguration.getDeviceById(targetDeviceId);
            if(targetDevice){                
                var device = createDeviceNodes(targetDevice,parentNode, layer, nodeWidth, nodeHeight);
                nodes.push(...device.nodes)
                edges.push(...device.edges);
            }
        }  else {
            if(item.line && item.StrBox_DT && item.TargetDevice_DT)
            {
                var deviceNode = NodeCreator.createUnknownHighVoltageDeviceNode(item, layer, nodeWidth, nodeHeight);
                nodes.push(deviceNode);
                var edge = NodeCreator.createEdge(parentNode, deviceNode);
                edges.push(edge);
            } else if(item.line && item.location && item.deviceTag){
                var deviceNode = NodeCreator.createUnknownLowVoltageDeviceNode(item, layer, nodeWidth, nodeHeight);
                nodes.push(deviceNode);
                var edge = NodeCreator.createEdge(parentNode, deviceNode);
                edges.push(edge);
            }
        }
    }
    
    const createLpdNodes = (lpd, parent, layer, nodeWidth, nodeHeight) => {
        var nodes = []
        var edges = []
        var lpdNode = NodeCreator.createLpdNode(lpd, layer, nodeWidth, nodeHeight);
        nodes.push(lpdNode);
        var edge = NodeCreator.createEdge(parent, lpdNode);
        edges.push(edge);
        const psuLayer = layer + 1;
        const dropLayer = psuLayer + 1;
        lpd.psus.forEach(psu => {
            var psuNode = NodeCreator.createPsuNode(psu, lpd, psuLayer, nodeWidth, nodeHeight)
            nodes.push(psuNode);
            var edge = NodeCreator.createEdge(lpdNode, psuNode);
            edges.push(edge);
    
            psu.pwrDrops.forEach(drop => {
                createTargetDeviceNode(drop, psuNode, dropLayer, nodeWidth, nodeHeight, nodes, edges)
            })
        })
        return {nodes:nodes, edges:edges}
    }

    const createDeviceNodes = (item, parentNode, layer, nodeWidth, nodeHeight)=>{
        var result = {nodes:[], edges:[]}
        if(!item) return result
        if (Object.keys(item).length === 0) return {nodes:nodes, edges:edges}
        switch(item.data.type) {
            case "lpd":
                var lpd = createLpdNodes(item, parentNode, layer, nodeWidth, nodeHeight);
                result.nodes.push(...lpd.nodes)
                result.edges.push(...lpd.edges)
                break;
            case "networkSwitch":
                var networkSwitchNode = NodeCreator.createNetworkSwitchNode(item, layer, nodeWidth, nodeHeight);
                var edge = NodeCreator.createEdge(parentNode, networkSwitchNode);
                result.nodes.push(networkSwitchNode)
                result.edges.push(edge);
            default:
              // code block
        }
        return result
    }

    const CreateTree = (nodes) => {
        var tree = nodes.filter(node => node.data.type === 'pdp');
        return tree;
    }

    return (
    <>
       <FlowDiagram initialNodes={nodes} initialEdges={edges} treeData={tree} />
    </>
    )
}

export default ElectricalDiagram;