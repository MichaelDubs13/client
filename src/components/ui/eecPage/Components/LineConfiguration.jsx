import "../Eec.css";
import McpConfigurations from "./MCPs/McpConfigurations";
import PdpConfigurations from "./PDPs/PdpConfigurations";
import XpdpConfigurations from "./XPDPs/XpdpConfigurations";
import LpdConfigurations from "./LPDs/LpdConfigurations";
import NetworkSwitchConfigurations from "./NetworkSwitches/NetworkSwitchConfigurations";
import { networkSwitchStore } from "../Store/networkSwitchStore";
import HmiInstances from "./HMIs/HmiInstances";
import { hmiStore } from "../Store/hmiStore";
import SafetyGateLocationCount from "./SafetyGateSwitches/SafetyGateLocationCount";
import { safetyGateStore } from "../Store/safetyGateStore";
import IO_ModuleCascadingCollection from "./IO_Modules/IO_ModuleCascadingCollection";
import { ioModuleStore } from "../Store/ioModuleStore";
import { Chip, FormInputCheckbox, FormItem, FormLabel, SideNav_v9} from "@tesla/design-system-react";
import { useState } from "react";
import { pdpStore } from "../Store/pdpStore";
import { xpdpStore } from "../Store/xpdpStore";
import { mcpStore } from "../Store/mcpStore";
import { lpdStore } from "../Store/lpdStore";
import IconTriggerHeading from "./Util/IconTriggerHeading";
import ManufacturingLineNameAndLocation from "./Project/ManufacturingLineNameAndLocation";
import OneLineComponents from "./Project/OneLineComponents";
import CustomerProperty from "./Project/CustomerProperty";
import EecJobHistory from "../EecJobHistory";
import { settingStore } from "../Store/settingStore";

/**
 * loadCount is used to force refresh after load JSON(maybe theres a better way to do this)
 * @param {*} param0 
 * @returns 
 */
const LineConfiguration = ({loadCount}) => {
    // this is the data being used in the UI for the line configuration
    const [activeTab, setActiveTab] = useState('tab-line');
    const pdps = pdpStore((state) => state.pdps);
    const xpdps = xpdpStore((state) => state.xpdps);
    const mcps = mcpStore((state) => state.mcps);
    const lpds = lpdStore((state) => state.lpds);
    const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
    const hmis = hmiStore((state) => state.hmis);
    const safetyGates = safetyGateStore((state) => state.safetyGates);
    const ioModuleGroups = ioModuleStore((state) => state.ioModuleGroups);
    const setSelectedValue = settingStore((state) => state.setSelectedValue);
    const options = settingStore((state)=>state.options);
    const setOptionsValue = settingStore((state)=>state.setOptionsValue);

      const renderSwitch = (param) => {
        if(param.startsWith('line')){
            return <ManufacturingLineNameAndLocation/>
        } else if(param.startsWith('customer')){
            return <CustomerProperty/>
        }else if(param.startsWith('pdp')){
            return <PdpConfigurations/>
        }else if(param.startsWith('xpdp')){
            return <XpdpConfigurations/>
        }else if(param.startsWith('mcp')){
            return <McpConfigurations/>
        }else if(param.startsWith('lpd')){
            return <LpdConfigurations/>
        }else if(param.startsWith('networkSwitch')){
            return <NetworkSwitchConfigurations/>
        }else if(param.startsWith('hmi')){
            return <HmiInstances/>
        }else if(param.startsWith('safetyGate')){
            return <SafetyGateLocationCount/>
        }else if(param.startsWith('ioModule')){
            return <IO_ModuleCascadingCollection/>
        }
        
        return <ManufacturingLineNameAndLocation/>
      }

    const getCircuitBreakers = (pdp, id) => {
        var items = []
        Object.keys(pdp.branchCircuit).forEach(key => {
            var childItems = getChildItems(pdp.branchCircuit[key],id);
            items.push(...childItems);
        })
        return items;
    }

    const getChildItems = (array,id) => {
        var items = []
        array.forEach(element => {
            var children = getChildren(element, id);
            const itemId = `${id}${element.data.id}`;
             var item = {
                id:itemId,
                leadingText: element.getFullName(),
                trailing: children ? <Chip text={`${children.length}`} /> : null,
                items: children,
                highlighted: activeTab===itemId,
                onClick:() => {
                    setSelectedValue(element, "element")
                }
            }
            items.push(item);
        })
        return items;
    }

    const getChildren = (element, id) => {
        if(element.data.type === 'pdp' || element.data.type === 'xpdp'){
            return getCircuitBreakers(element,id);
        } else if(element.data.type === 'ioModuleGroup') {
            return getChildItems(element.ioModules, id);
        }else if(element.data.type === 'lpd') {
            return getChildItems(element.psus, id);
        }else if(element.data.type === 'networkSwitch') {
            return getChildItems(element.ports, id);
        }else if(element.data.type === 'safetyGate') {
            return getChildItems(element.safetyGateSwitches, id);
        }else if(element.data.type === 'mcp') {
            return getChildItems(element.ports, id);
        }else if(element.data.type === 'psu') {
            return getChildItems(element.drops, id);
        }
        return null;
    }

      const getItems = (array,id) => {
        var items = []
        array.forEach((element)=> {
            var children = getChildren(element, id);
            const itemId = `${id}${element.data.id}`;
            const item = {
                id:itemId,
                leadingText: `${element.getFullName()}`,
                trailing: children ? <Chip text={`${children.length}`} /> : null,
                items: children,
                expanded: element.UI.expanded,
                highlighted: activeTab===itemId,
                onClick: () => {
                    element.setExpanded(!element.UI.expanded);
                    setSelectedValue(element, "element")
                },
            }


            items.push(item)
        })

        return items;
      }

      const items = [
        {
            id:'line',
            leadingText: 'Line Configurations',
            highlighted: activeTab==='line',
        },
        {
            id:'customer',
            leadingText: 'Project Property',
            highlighted: activeTab==='customer',
        },
        {
            id:'pdp',
            leadingText: "PDPs",
            trailing: <Chip text={`${pdps.length}`} />,
            items: getItems(pdps, 'pdp'),
            highlighted: activeTab==='pdp',
        },
        {
            id:'xpdp',
            leadingText: "XPDPs",
            trailing: <Chip text={`${xpdps.length}`} />,
            items: getItems(xpdps, 'xpdp'),
            highlighted: activeTab==='xpdp',
        },
        {
            id:'mcp',
            leadingText: "MCPs",
            trailing: <Chip text={`${mcps.length}`} />,
            items: getItems(mcps, 'mcp'),
            highlighted: activeTab==='mcp',
        },
        {
            id:'lpd',
            leadingText: "24V Power Dist.",
            trailing: <Chip text={`${lpds.length}`} />,
            items: getItems(lpds, 'lpd'),
            highlighted: activeTab==='lpd',
        },
        {
            id:'networkSwitch',
            leadingText: "Network Switches",
            trailing: <Chip text={`${networkSwitches.length}`} />,
            items: getItems(networkSwitches, 'networkSwitch'),
            highlighted: activeTab==='networkSwitch',
        },
        {
            id:'hmi',
            leadingText: "HMIs",
            trailing: <Chip text={`${hmis.length}`} />,
            items: getItems(hmis, 'hmi'),
            highlighted: activeTab==='hmi',
        },
        {
            id:'safetyGate',
            leadingText: "Safety Gate Switches",
            trailing: <Chip text={`${safetyGates.length}`} />,
            items: getItems(safetyGates, 'safetyGate'),
            highlighted: activeTab==='safetyGate',
        },
        {
            id:'ioModule',
            leadingText: "IO Modules",
            trailing: <Chip text={`${ioModuleGroups.length}`} />,
            items: getItems(ioModuleGroups, 'ioModule'),
            highlighted: activeTab==='ioModule',
        },
      ]

    const handleItemSelect = (id) => {
        setActiveTab(id);
    }

    const handleDisplaySelectedOnlyClick = () =>{
        setOptionsValue(!options.displayOnlySelected, "displayOnlySelected")
    }

    return (
        <>
            <IconTriggerHeading heading="Job History" children={<EecJobHistory/>} defaultState={true}/>
            <IconTriggerHeading heading="One-Lines" children={<OneLineComponents/>}/>
            
            <div className="tds-layout tds-layout-2col-content_heavy tds-layout-main--right" style={{padding:'0px'}}>
                <aside className="tds-layout-item tds-layout-aside">
                    <div style={{ border: '1px', padding: '16px', width: '100%' }}>
                        <SideNav_v9 variant="internal" items={items} sticky={true} onItemSelect={handleItemSelect} style={{width:'300px'}}/>
                    </div>
                </aside>
                <main className="tds-layout-item tds-layout-main">
                    <FormItem style={{display:'flex'}}>
                        <FormLabel style={{marginRight:'10px'}} htmlFor="context">Display Selected Tab Only</FormLabel>
                        <FormInputCheckbox id="context" type="checkbox" 
                        checked={options.displayOnlySelected} 
                        onChange={handleDisplaySelectedOnlyClick}/>
                    </FormItem>
                    <div style={{ marginLeft:'50px', width: '100%' }}>
                    {
                        renderSwitch(activeTab)
                    }
                    </div>
                </main>
            </div>

        </>
    )
}
    
export default LineConfiguration;