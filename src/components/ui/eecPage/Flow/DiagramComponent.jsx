import React, { useState,  useEffect } from "react";
import FlowDiagram from "./FlowDiagram";
import { pdpStore } from "../Store/pdpStore";
import { lineConfiguration } from "../Store/lineStore";
import { lpdStore } from "../Store/lpdStore";
import { xpdpStore } from "../Store/xpdpStore";

const DiagramComponent = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [tree, setTree] = useState([]);
    const pdps = pdpStore((state) => state.pdps);
    const xpdps = xpdpStore((state) => state.xpdps);
    const lpds = lpdStore((state) => state.lpds);
    const position = { x: 0, y: 0 };
    useEffect(()=>{
        const fetchData = async () =>{
            setIsLoading(true);
            var tree = CreateTree(pdps, xpdps);
            setTree(tree);
            const {nodes: nodes, edges: edges} = CreateNodes(pdps, xpdps);
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

        console.log(nodes)
        console.log(edges)
        return {nodes:nodes, edges: edges};
    }

    const createDeviceNode = (item, layer, nodeWidth, nodeHeight)=>{
        var node = null;
        if(!item) return node;
        if (Object.keys(item).length === 0) return node;
        switch(item.data.type) {
            case "lpd":
                node = createLpdNode(item, layer, nodeWidth, nodeHeight);
                break;
            case "pdp":
                node = createPdpNode(item, layer, nodeWidth, nodeHeight);
                break;
            case "xpdp":
                node = createXpdpNode(item, layer, nodeWidth, nodeHeight);
                break;
            case "cb":
                node = createBranchCircuitNode(item, layer, nodeWidth, nodeHeight);
                break;
            case "psu":
                node = createPsuNode(item, layer, nodeWidth, nodeHeight);
                break;
            default:
              // code block
        }
        return node;
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
                var networkSwitchNode = createNetworkSwitchNode(item, layer, nodeWidth, nodeHeight);
                var source = parentNode.id;
                var target = networkSwitchNode.id;
                var edge = { id: `${source}=>${target}`, source: source, target: target};
                result.nodes.push(networkSwitchNode)
                result.edges.push(edge);
            default:
              // code block
        }
        return result
    }

    const createPdpNodes = (pdp, layer, nodeWidth, nodeHeight, nodes, edges)=>{
        var node = createDeviceNode(pdp, layer, nodeWidth, nodeHeight);
        nodes.push(node);
        layer = 2;
        const targetDeviceLayer = 3;
        Object.keys(pdp.branchCircuit).forEach(key => {
            pdp.branchCircuit[key].forEach(drop => {
                var branchCircuitNode = createDeviceNode(drop, layer, nodeWidth, nodeHeight);
                if(!branchCircuitNode) return;
                nodes.push(branchCircuitNode);
                var source = node.id;
                var target = branchCircuitNode.id;
                var edge = { id: `${source}=>${target}`, source: source, target: target};
                edges.push(edge);
                
                createTargetDeviceNode(drop, branchCircuitNode, targetDeviceLayer, nodeWidth, nodeHeight, nodes, edges)
            })
        });
    }

    const createTargetDeviceNode = (item, parentNode, layer, nodeWidth, nodeHeight, nodes, edges) => {
        if(!item) return;
        if (Object.keys(item).length === 0) return;
        if(!item.data.targetDevice) return;

        const targetDeviceId = item.data.targetDevice;
        var targetDevice = lineConfiguration.getDeviceById(targetDeviceId);
        if(!targetDevice) return;

        var device = createDeviceNodes(targetDevice,parentNode, layer, nodeWidth, nodeHeight);
        nodes.push(...device.nodes)
        edges.push(...device.edges);
    }

    const createLpdNodes = (lpd, parent, layer, nodeWidth, nodeHeight) => {
        var nodes = []
        var edges = []
        var lpdNode = createLpdNode(lpd, layer, nodeWidth, nodeHeight);
        nodes.push(lpdNode);

        var source = parent.id;
        var target = lpdNode.id;
        var edge = { id: `${source}=>${target}`, source: source, target: target};
        edges.push(edge);
        const psuLayer = layer + 1;
        const dropLayer = psuLayer + 1;
        lpd.psus.forEach(psu => {
            var psuNode = createPsuNode(psu, lpd, psuLayer, nodeWidth, nodeHeight)
            nodes.push(psuNode);

            var source = lpdNode.id;
            var target = psuNode.id;
            var edge = { id: `${source}=>${target}`, source: source, target: target};
            edges.push(edge);

            psu.pwrDrops.forEach(drop => {
                createTargetDeviceNode(drop, psuNode, dropLayer, nodeWidth, nodeHeight, nodes, edges)
            })
        })
        return {nodes:nodes, edges:edges}
    }
    
    const createPdpNode = (pdp, layer, nodeWidth, nodeHeight)=>{
        const index = pdp.getIndex();
        const key = `${pdp.line}+${pdp.location}+${index}`;
        const icon = pdp.UI.icon;
        const target = `${key}_${layer}`;
        const label = [key, ...pdp.getNodeData()];
        var node =   { id: target, data: { label: label, icon: icon }, type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
        return node;
    }

    const createXpdpNode = (pdp, layer, nodeWidth, nodeHeight)=>{
        const index = pdp.getIndex();
        const key = `${pdp.line}+${pdp.location}+${index}`;
        const icon = pdp.UI.icon;
        const target = `${key}_${layer}`;
        const label = [key, ...pdp.getNodeData()];
        var node =   { id: target, data: { label: label, icon: icon }, type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
        return node;
    }

    const createBranchCircuitNode = (branchCircuit, layer, nodeWidth, nodeHeight)=>{
        const pdp = branchCircuit.data.parent;
        const key = `${pdp.location}_${branchCircuit.UI.CB_DT}`;
        const icon = branchCircuit.UI.icon;
        const target = `${key}_${layer}`;
        const label = [key, ...branchCircuit.getNodeData()];
        var node =   { id: target, data: { label: label, icon: icon }, type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
        return node;
    }

    const createLpdNode = (lpd, layer, nodeWidth, nodeHeight)=>{
        const index = lpd.getIndex();
        const key = `lpd${index}`;
        const icon = lpd.UI.icon;
        const target = `${key}_${layer}`;
        const label = [key, ...lpd.getNodeData()]
        var node =   { id: target, data: { label: label, icon: icon}, type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
        return node;
    }

    const createPsuNode = (psu, lpd, layer, nodeWidth, nodeHeight)=>{
        const index = psu.getIndex();
        const key = `lpd${lpd.getIndex()}_psu${index}`;
        const icon = psu.UI.icon;
        const target = `${key}_${layer}`;
        const label = [key,...psu.getNodeData()];
        var node =   { id: target, data: { label: label, icon: icon, }, type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
        return node;
    }

    const createNetworkSwitchNode = (networkSwitch,layer, nodeWidth, nodeHeight)=>{
        const index = networkSwitch.getIndex();
        const key = `${networkSwitch.location}_${networkSwitch.switchDT}_${index}`;
        const icon = networkSwitch.UI.icon;
        const target = `${key}_${layer}`;
        const label = [key,...networkSwitch.getNodeData()];
        var node =   { id: target, data: { label: label, icon: icon, }, type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
        return node;
    }

    const CreateTree = (pdps, xpdps) => {
        var tree = pdps.concat(xpdps)
        return tree;
    }

    return (
    <>
       <FlowDiagram initialNodes={nodes} initialEdges={edges} treeData={tree} />
    </>
    )
}

export default DiagramComponent;