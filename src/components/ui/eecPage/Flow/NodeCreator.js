export const createEdge = (sourceNode, targetNode) => {
    var source = sourceNode.id;
    var target = targetNode.id;
    sourceNode.children = [...sourceNode.children, targetNode];
    var edge = { id: `${source}=>${target}`, source: source, target: target};
    return edge;
}
export const createDeviceNode = (item, layer, nodeWidth, nodeHeight)=>{
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
            case "mcp":
                node = createMcpNode(item, layer, nodeWidth, nodeHeight);
                break;
            case "cb":
                node = createBranchCircuitNode(item, layer, nodeWidth, nodeHeight);
                break;
            case "psu":
                node = createPsuNode(item, layer, nodeWidth, nodeHeight);
                break;
            case "networkSwitch":
                node = createNetworkSwitchNode(item, layer, nodeWidth, nodeHeight);
                break;
            default:
              // code block
        }
        return node;
    }
export const createMcpNode = (mcp, layer, nodeWidth, nodeHeight)=>{
    const index = mcp.getIndex();
    const key = `${mcp.line}+${mcp.location}+${index}`;
    const icon = mcp.UI.icon;
    const target = `${key}_${layer}`;
    const label = [key, ...mcp.getNodeData()];
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon, key:key, type:'pdp'}, children:[], 
        type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}
export const createPdpNode = (pdp, layer, nodeWidth, nodeHeight)=>{
    const index = pdp.getIndex();
    const key = `${pdp.line}+${pdp.location}+${index}`;
    const icon = pdp.UI.icon;
    const target = `${key}_${layer}`;
    const label = [key, ...pdp.getNodeData()];
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon, key:key, type:'pdp'}, children:[], 
        type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}

export const createXpdpNode = (pdp, layer, nodeWidth, nodeHeight)=>{
    const index = pdp.getIndex();
    const key = `${pdp.line}+${pdp.location}+${index}`;
    const icon = pdp.UI.icon;
    const target = `${key}_${layer}`;
    const label = [key, ...pdp.getNodeData()];
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon, key:key, type:'xpdp' },children:[], 
        type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}

export const createBranchCircuitNode = (branchCircuit, layer, nodeWidth, nodeHeight)=>{
    const pdp = branchCircuit.data.parent;
    const key = `${pdp.location}_${branchCircuit.UI.CB_DT}`;
    const icon = branchCircuit.UI.icon;
    const target = `${key}_${layer}`;
    const label = [key, ...branchCircuit.getNodeData()];
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon, key:key, type:'branchCircuit'}, children:[], 
        type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}

export const createLpdNode = (lpd, layer, nodeWidth, nodeHeight)=>{
    const index = lpd.getIndex();
    const key = `lpd${index}`;
    const icon = lpd.UI.icon;
    const target = `${key}_${layer}`;
    const label = [key, ...lpd.getNodeData()]
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon, key:key, type:'lpd'},children:[], 
        type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}

export const createPsuNode = (psu, lpd, layer, nodeWidth, nodeHeight)=>{
    const index = psu.getIndex();
    const key = `lpd${lpd.getIndex()}_psu${index}`;
    const icon = psu.UI.icon;
    const target = `${key}_${layer}`;
    const label = [key,...psu.getNodeData()];
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon,key:key, type:'psu'}, children:[],
        type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}

export const createNetworkSwitchNode = (networkSwitch,layer, nodeWidth, nodeHeight)=>{
    const index = networkSwitch.getIndex();
    const key = `${networkSwitch.location}_${networkSwitch.switchDT}_${index}`;
    const icon = networkSwitch.UI.icon;
    const target = `${key}_${layer}`;
    const label = [key,...networkSwitch.getNodeData()];
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon, key:key, type:'networkSwitch'},
        children:[], type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}

export const createUnknownHighVoltageDeviceNode = (drop, layer, nodeWidth, nodeHeight)=>{
    const key = `${drop.line}+${drop.StrBox_DT}+${drop.TargetDevice_DT}`;
    const icon = "/unknownHighVoltageDevice.png";
    const target = `${key}_${layer}`;
    const label = [key, ...drop.getNodeData()];
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon, key:key, type:'unknownHighVoltageDevice'},
        children:[], type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}

export const createUnknownLowVoltageDeviceNode = (drop, layer, nodeWidth, nodeHeight)=>{
    const key = `${drop.line}+${drop.location}+${drop.deviceTag}`;
    const icon = "/unknownLowVoltageDevice.png";
    const target = `${key}_${layer}`;
    const label = [key, ...drop.getNodeData()];
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon, key:key, type:'unknownHighVoltageDevice'},children:[], 
        type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}

export const createNetworkDeviceNode = (drop, layer, nodeWidth, nodeHeight)=>{
    const key = `${drop.line}+${drop.targetLocation}+${drop.targetDT}`;
    const icon = "/unknownLowVoltageDevice.png";
    const target = `${key}_${layer}`;
    const label = [key, ...drop.getNodeData()];
    const position = { x: 0, y: 0 };
    var node =   { id: target, data: { label: label, icon: icon, key:key, type:'unknownHighVoltageDevice'},children:[], 
        type:'customNode', width: nodeWidth, height: nodeHeight, position, layer:layer}
    return node;
}