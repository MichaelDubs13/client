import { pdpStore } from "./Store/pdpStore";
import { xpdpStore } from "./Store/xpdpStore";
import { mcpStore } from "./Store/mcpStore";
import { lpdStore } from "./Store/lpdStore";
import { projectStore } from "./Store/projectStore";
import { networkSwitchStore } from "./Store/networkSwitchStore";
import { hmiStore } from "./Store/hmiStore";
import { safetyGateStore } from "./Store/safetyGateStore";
import { ioModuleStore } from "./Store/ioModuleStore";
import { Icon, IconButton } from '@tesla/design-system-react';
import { iconZip } from '@tesla/design-system-icons';
import ActionIcon from "../util/ActionIcon";


const SaveButton = () => {
  const getConfig =  projectStore((state) => state.getConfig);
  const pdps = pdpStore((state) => state.pdps);
  const xpdps = xpdpStore((state) => state.xpdps);
  const mcps = mcpStore((state) => state.mcps);
  const lpds = lpdStore((state) => state.lpds);
  const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
  const hmis = hmiStore((state) => state.hmis);
  const safetyGates = safetyGateStore((state) => state.safetyGates);
  const ioModuleGroups = ioModuleStore((state) => state.ioModuleGroups);
  

  const getCircularReplacer=() =>{
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}


  const saveObjectAsJson = (obj) => {
    const json = JSON.stringify(obj, getCircularReplacer(), 2);
    const blob = new Blob([json], { type: 'application/json' }); 
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "EEC_Lithium";
    link.href = url;
    link.click();
  };


  const handleSave = ()=>{
    const objectToBeSaved = {
      pdps:pdps,
      xpdps:xpdps,
      mcps:mcps,
      lpds:lpds,
      networkSwitches:networkSwitches,
      hmis:hmis,
      safetyGates:safetyGates,
      ioModuleGroups:ioModuleGroups,
      config:getConfig(),
    }

    saveObjectAsJson(objectToBeSaved);
  }

  return (
    <>
        <ActionIcon label="Save JSON" icon={iconZip} onClick={handleSave}/>
    </>
  );
};

export default SaveButton;
