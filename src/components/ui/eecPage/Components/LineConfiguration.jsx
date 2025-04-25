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
import { TabList} from "@tesla/design-system-react";
import { useState } from "react";
import { pdpStore } from "../Store/pdpStore";
import { xpdpStore } from "../Store/xpdpStore";
import { mcpStore } from "../Store/mcpStore";
import { lpdStore } from "../Store/lpdStore";
import ManufacturingLineConfiguration from "./Project/ManufacturingLineConfiguration";
import CustomerConfiguration from "./Project/CustomerConfiguration";

const LineConfiguration = () => {
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
        // this defines the tabs for the line configuration
        {
          id: 'tab-1',
          label: `PDPs(${pdps.length})`,
          style:{fontSize:"18px"}
        },
        {
          id: 'tab-2',
          label: `XPDPs(${xpdps.length})`,
          style:{fontSize:"18px"}
        },
        {
          id: 'tab-3',
          label: `MCPs(${mcps.length})`,
          style:{fontSize:"18px"}
        },
        {
            id: 'tab-4',
            label: `24VDC Power Distibution(${lpds.length})`,
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-5',
            label: `Network Switch(${networkSwitches.length})`,
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-6',
            label: `HMI(${hmis.length})`,
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-7',
            label: `Safety Gate Switch(${safetyGates.length})`,
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-8',
            label: `IO Module(${ioModuleGroups.length})`,
            style:{fontSize:"18px"}
        },
      ];
      const renderSwitch = (param) => {
        switch(param) {
            case 'tab-1':
                return <PdpConfigurations/>
            case 'tab-2':
                return <XpdpConfigurations/>
            case 'tab-3':
                return <McpConfigurations/>
            case 'tab-4':
                return <LpdConfigurations/>
            case 'tab-5':
                return <NetworkSwitchConfigurations/>
            case 'tab-6':
                return <HmiInstances/>
            case 'tab-7':
                return <SafetyGateLocationCount/>
            case 'tab-8':
                return <IO_ModuleCascadingCollection/>
            default:
                return <PdpConfigurations/>
        }
      }
    return (
        <>
            <ManufacturingLineConfiguration/>
            <CustomerConfiguration/>
            <TabList
                animated
                onTabChange={(e) => setActiveTab(e.currentTarget.id)}
                selected={activeTab}
                tabs={tabs}
                style={{overflow:'hidden', }}
                variant="underline"
                />
            {
                renderSwitch(activeTab)
            }

        </>
    )
}
    
export default LineConfiguration;