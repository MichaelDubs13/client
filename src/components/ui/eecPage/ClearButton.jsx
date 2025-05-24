import { ToastContainer, useToastContainerState,} from "@tesla/design-system-react";
import { iconDisabled } from '@tesla/design-system-icons';
import { Icon, IconButton } from '@tesla/design-system-react';
import { pdpStore } from "./Store/pdpStore";
import { xpdpStore } from "./Store/xpdpStore";
import { mcpStore } from "./Store/mcpStore";
import { lpdStore } from "./Store/lpdStore";
import { projectStore } from "./Store/projectStore";
import { networkSwitchStore } from "./Store/networkSwitchStore";
import { safetyGateStore } from "./Store/safetyGateStore";
import { hmiStore } from "./Store/hmiStore";
import { ioModuleStore } from "./Store/ioModuleStore";


const ClearButton = () => {
  const clearConfig =  projectStore((state) => state.clearConfig);
  const setPdps =  pdpStore((state) => state.setPdps);
  const setXpdps =  xpdpStore((state) => state.setXpdps);
  const setMcps =  mcpStore((state) => state.setMcps);
  const setLpds =  lpdStore((state) => state.setLpds);
  const setNetworkSwitches =  networkSwitchStore((state) => state.setNetworkSwitches);
  const setSafetyGates =  safetyGateStore((state) => state.setSafetyGates);
  const setHmis =  hmiStore((state) => state.setHmis);
  const setIOModuleGroups =  ioModuleStore((state) => state.setIOModuleGroups);
  const { toasts, addToast } = useToastContainerState();
  

  const handleClear = async (event) => {
      event.preventDefault();
      clearConfig();
      setPdps([]);
      setXpdps([]);
      setMcps([]);
      setLpds([]);
      setNetworkSwitches([]);
      setSafetyGates([]);
      setHmis([]);
      setIOModuleGroups([]);
    }
    

  return (
    <>
      <ToastContainer toasts={toasts} />
      <IconButton size="large" label="Clear Data"
          onClick={handleClear}>
            <Icon data={iconDisabled} size="xl"/>
        </IconButton>
    </>
  );
};

export default ClearButton;
