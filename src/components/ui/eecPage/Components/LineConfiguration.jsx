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
import { Chip, Icon, SideNav_v9, TabList} from "@tesla/design-system-react";
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

/**
 * loadCount is used to force refresh after load JSON(maybe theres a better way to do this)
 * @param {*} param0 
 * @returns 
 */
const LineConfiguration = ({loadCount}) => {
    // this is the data being used in the UI for the line configuration
    const [activeTab, setActiveTab] = useState('tab-1');
    const pdps = pdpStore((state) => state.pdps);
    const xpdps = xpdpStore((state) => state.xpdps);
    const mcps = mcpStore((state) => state.mcps);
    const lpds = lpdStore((state) => state.lpds);
    const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
    const hmis = hmiStore((state) => state.hmis);
    const safetyGates = safetyGateStore((state) => state.safetyGates);
    const ioModuleGroups = ioModuleStore((state) => state.ioModuleGroups);
   
      const renderSwitch = (param) => {
        switch(param) {
            case 'tab-1':
                return <ManufacturingLineNameAndLocation/>
            case 'tab-2':
                return <CustomerProperty/>
            case 'tab-3':
                return <PdpConfigurations/>
            case 'tab-4':
                return <XpdpConfigurations/>
            case 'tab-5':
                return <McpConfigurations/>
            case 'tab-6':
                return <LpdConfigurations/>
            case 'tab-7':
                return <NetworkSwitchConfigurations/>
            case 'tab-8':
                return <HmiInstances/>
            case 'tab-9':
                return <SafetyGateLocationCount/>
            case 'tab-10':
                return <IO_ModuleCascadingCollection/>
            default:
                return <PdpConfigurations/>
        }
      }

      const getCircuitBreakers = (pdp) => {
        var items = []
        Object.keys(pdp.branchCircuit).forEach(key => {
            pdp.branchCircuit[key].forEach(cb => {
                var item = {
                    leadingText: cb.getFullName(),
                }
                items.push(item);
            })
        })
        return items;
      }

      const getItems = (array,id) => {
        var items = []
        array.forEach((element)=> {
            var children = (element.data.type === 'pdp' || element.data.type === 'xpdp') ? getCircuitBreakers(element) : null;
            const item = {
                id:id,
                leadingText: `${element.getFullName()}`,
                trailing: children ? <Chip text={`${children.length}`} /> : null,
                items: children,
            }
            items.push(item)
        })

        return items;
      }

      const items = [
        {
            id:'tab-1',
            leadingText: 'Line Configurations',
            highlighted: activeTab==='tab-1',
        },
        {
            id:'tab-2',
            leadingText: 'Project Property',
            highlighted: activeTab==='tab-2',
        },
        {
            id:'tab-3',
            leadingText: "PDPs",
            trailing: <Chip text={`${pdps.length}`} />,
            items: getItems(pdps, 'tab-3'),
            highlighted: activeTab==='tab-3',
        },
        {
            id:'tab-4',
            leadingText: "XPDPs",
            trailing: <Chip text={`${xpdps.length}`} />,
            items: getItems(xpdps, 'tab-4'),
            highlighted: activeTab==='tab-4',
        },
        {
            id:'tab-5',
            leadingText: "MCPs",
            trailing: <Chip text={`${mcps.length}`} />,
            items: getItems(mcps, 'tab-5'),
            highlighted: activeTab==='tab-5',
        },
        {
            id:'tab-6',
            leadingText: "24V Power Dist.",
            trailing: <Chip text={`${lpds.length}`} />,
            items: getItems(lpds, 'tab-6'),
            highlighted: activeTab==='tab-6',
        },
        {
            id:'tab-7',
            leadingText: "Network Switches",
            trailing: <Chip text={`${networkSwitches.length}`} />,
            items: getItems(networkSwitches, 'tab-7'),
            highlighted: activeTab==='tab-7',
        },
        {
            id:'tab-8',
            leadingText: "HMIs",
            trailing: <Chip text={`${hmis.length}`} />,
            items: getItems(hmis, 'tab-8'),
            highlighted: activeTab==='tab-8',
        },
        {
            id:'tab-9',
            leadingText: "Safety Gate Switches",
            trailing: <Chip text={`${safetyGates.length}`} />,
            items: getItems(safetyGates, 'tab-9'),
            highlighted: activeTab==='tab-9',
        },
        {
            id:'tab-10',
            leadingText: "IO Modules",
            trailing: <Chip text={`${ioModuleGroups.length}`} />,
            items: getItems(ioModuleGroups, 'tab-10'),
            highlighted: activeTab==='tab-10',
        },
      ]

    const handleItemSelect = (id) => {
        setActiveTab(id);
    }
    return (
        <>
            
            <IconTriggerHeading heading="One-Lines" children={<OneLineComponents/>}/>
            <IconTriggerHeading heading="Job History" children={<EecJobHistory/>}/>
            
            <div className="tds-layout tds-layout-2col-content_heavy tds-layout-main--right" style={{padding:'0px'}}>
                <aside className="tds-layout-item tds-layout-aside">
                    <div style={{ border: '1px', padding: '16px', width: '100%' }}>
                    {/* <TabList
                        animated
                        onTabChange={(e) => setActiveTab(e.currentTarget.id)}
                        selected={activeTab}
                        tabs={tabs}
                        style={{overflow:'hidden', }}
                        
                        variant="vertical"
                        /> */}
                        <SideNav_v9 variant="internal" items={items} sticky={true} onItemSelect={handleItemSelect}/>
                    </div>
                </aside>
                <main className="tds-layout-item tds-layout-main">
                    <div style={{ marginLeft:'150px', width: '100%' }}>
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