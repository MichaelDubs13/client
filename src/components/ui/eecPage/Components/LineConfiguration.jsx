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
import { Chip, TabList} from "@tesla/design-system-react";
import { useState } from "react";
import { pdpStore } from "../Store/pdpStore";
import { xpdpStore } from "../Store/xpdpStore";
import { mcpStore } from "../Store/mcpStore";
import { lpdStore } from "../Store/lpdStore";
import IconTriggerHeading from "./Util/IconTriggerHeading";
import ManufacturingLineNameAndLocation from "./Project/ManufacturingLineNameAndLocation";
import OneLineComponents from "./Project/OneLineComponents";
import CustomerProperty from "./Project/CustomerProperty";
import TabLabel from "./Util/TabLabel";
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
    const tabs = [
        {
            id: 'tab-1',
            label: `Line Configurations`,
            style:{fontSize:"18px"}
          },
        {
          id: 'tab-2',
          label: `Project Property`,
          style:{fontSize:"18px"}
        },
        {
          id: 'tab-3',
          label: <TabLabel label="PDPs" count={pdps.length}/>,
          style:{fontSize:"18px"}
        },
        {
          id: 'tab-4',
          label: <TabLabel label="XPDPs" count={xpdps.length}/>,
          style:{fontSize:"18px"}
        },
        {
          id: 'tab-5',
          label: <TabLabel label="MCPs" count={mcps.length}/>,
          style:{fontSize:"18px"}
        },
        {
            id: 'tab-6',
            label: <TabLabel label="24VDC Power Distibution" count={lpds.length}/>,
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-7',
            label: <TabLabel label="Network Switches" count={networkSwitches.length}/>,
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-8',
            label: <TabLabel label="HMIs" count={hmis.length}/>,
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-9',
            label:  <TabLabel label="Safety Gate Switches" count={safetyGates.length}/>, 
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-10',
            label: <TabLabel label="IO Modules" count={ioModuleGroups.length}/>, 
            style:{fontSize:"18px"}
        },
      ];
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
    return (
        <>
            <IconTriggerHeading heading="One-Lines" children={<OneLineComponents/>}/>
            <IconTriggerHeading heading="Job History" children={<EecJobHistory/>}/>
            
            <div className="tds-layout tds-layout-2col-content_heavy tds-layout-main--right" style={{padding:'0px'}}>
                <aside className="tds-layout-item tds-layout-aside">
                    <div style={{ border: '1px', padding: '16px', width: '100%' }}>
                    <TabList
                        animated
                        onTabChange={(e) => setActiveTab(e.currentTarget.id)}
                        selected={activeTab}
                        tabs={tabs}
                        style={{overflow:'hidden', }}
                        
                        variant="vertical"
                        />
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