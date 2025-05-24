import { ToastContainer, useToastContainerState,} from "@tesla/design-system-react";
import { pdpStore } from "./Store/pdpStore";
import { xpdpStore } from "./Store/xpdpStore";
import { mcpStore } from "./Store/mcpStore";
import { lpdStore } from "./Store/lpdStore";
import { projectStore } from "./Store/projectStore";
import { pdpModel } from "./Store/Models/PDPs/pdpModel";
import { xpdpModel } from "./Store/Models/XPDPs/xpdpModel";
import { mcpModel } from "./Store/Models/MCPs/mcpModel";
import { lpdModel } from "./Store/Models/LDPs/lpdModel";
import { safetyGateGroupModel } from "./Store/Models/SafetyGates/safetyGateGroupModel";
import { networkSwitchModel } from "./Store/Models/NetworkSwitches/networkSwitchModel";
import { hmiModel } from "./Store/Models/HMIs/hmiModel";
import { ioModuleGroupModel } from "./Store/Models/IoModules/ioModuleGroupModel";
import { safetyGateStore } from "./Store/safetyGateStore";
import { networkSwitchStore } from "./Store/networkSwitchStore";
import { hmiStore } from "./Store/hmiStore";
import { ioModuleStore } from "./Store/ioModuleStore";
import { iconShare } from '@tesla/design-system-icons';
import { Icon, IconButton } from '@tesla/design-system-react';
import { useRef } from "react";


const LoadButton = ({onLoad}) => {
  const setConfig =  projectStore((state) => state.setConfig)
  const { toasts, addToast } = useToastContainerState();
  const fileInput = useRef(null);

  const handleLoad = async (event) => {
      event.preventDefault();
      if(event.target.files){
        var file = event.target.files[0];
        const result = await load(file);
        addToast({
          title: 'EEC Data updated',
          dismissible: true,
          caption: 'EEC UI forms updated',
          variant: 'status',
          statusType: 'info',
        })
      }
    }
    
    const load = async (file) =>{
      var reader = new FileReader();
      reader.onload = (e) => {
        try {
          var data = e.target.result;
          const jsonObject = JSON.parse(data);
          setConfig(jsonObject.config);
          var pdps = pdpModel.recreate(jsonObject.pdps)
          var xpdps = xpdpModel.recreate(jsonObject.xpdps)
          var mcps = mcpModel.recreate(jsonObject.mcps)
          var lpds = lpdModel.recreate(jsonObject.lpds)
          var safetyGates = safetyGateGroupModel.recreate(jsonObject.safetyGates)
          var networkSwitches = networkSwitchModel.recreate(jsonObject.networkSwitches)
          var hmis = hmiModel.recreate(jsonObject.hmis)
          var ioModuleGroups = ioModuleGroupModel.recreate(jsonObject.ioModuleGroups)
          
          Object.assign(pdpStore.getState().pdps, pdps);
          Object.assign(xpdpStore.getState().xpdps, xpdps);
          Object.assign(mcpStore.getState().mcps, mcps);
          Object.assign(lpdStore.getState().lpds, lpds);
          Object.assign(safetyGateStore.getState().safetyGates, safetyGates);
          Object.assign(networkSwitchStore.getState().networkSwitches, networkSwitches);
          Object.assign(hmiStore.getState().hmis, hmis);
          Object.assign(ioModuleStore.getState().ioModuleGroups, ioModuleGroups);
          onLoad();
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Invalid JSON file");
        }
      };

      reader.readAsText(file);
  }

  const handleIconClick = () => {
    fileInput.current.click();
  }

  return (
    <>
      
      <input
          type="file"
          accept=".json"
          multiple = {false}
          ref={fileInput}
          style={{display:'none'}}
          onChange={handleLoad}/>
      <ToastContainer toasts={toasts} />
        <IconButton size="large" label="Load JSON"
          onClick={handleIconClick}>
            <Icon data={iconShare} size="xl"/>
        </IconButton>
    </>
  );
};

export default LoadButton;
