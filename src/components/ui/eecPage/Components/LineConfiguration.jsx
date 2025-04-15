import "../Eec.css";
import McpConfigurations from "./MCPs/McpConfigurations";
import PdpConfigurations from "./PDPs/PdpConfigurations";
import XpdpConfigurations from "./XPDPs/XpdpConfigurations";
import HeadingItem from "./Util/HeadingItem";
import LpdConfigurations from "./LPDs/LpdConfigurations";
import { Heading } from "@tesla/design-system-react";
import { TabList} from "@tesla/design-system-react";
import { useState } from "react";
import { pdpStore } from "../Store/pdpStore";
import { xpdpStore } from "../Store/xpdpStore";
import { mcpStore } from "../Store/mcpStore";
import { lpdStore } from "../Store/lpdStore";
import ManufacturingLineConfiguration from "./Project/ManufacturingLineConfiguration";

const LineConfiguration = () => {
    const [activeTab, setActiveTab] = useState('tab-1');
    const pdps = pdpStore((state) => state.pdps);
    const xpdps = xpdpStore((state) => state.xpdps);
    const mcps = mcpStore((state) => state.mcps);
    const lpds = lpdStore((state) => state.lpds);
    const tabs = [
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
            default:
                return <PdpConfigurations/>
        }
      }
    return (
        <>
            {/* <Heading is="h2" style={{marginBottom:'20px'}}>Configurations</Heading> */}
            <ManufacturingLineConfiguration/>
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