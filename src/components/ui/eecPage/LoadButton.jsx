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
import { iconDownload } from '@tesla/design-system-icons';
import { useRef } from "react";
import ActionIcon from "../util/ActionIcon";


const LoadButton = ({onLoad}) => {
  const setConfig =  projectStore((state) => state.setConfig)
  const { toasts, addToast } = useToastContainerState();
  const fileInput = useRef(null);

  const handleLoad = async (event) => {
      //event.preventDefault();
      if(event.target.files){
        var file = event.target.files[0];
        const result = await load(file);
        event.target.value = null;
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
          if(jsonObject.pdps.length > 0){
            var pdps = pdpModel.recreate(jsonObject.pdps)
            Object.assign(pdpStore.getState().pdps, pdps);  
            pdpStore.getState().setPdps(pdps);
          }

          if(jsonObject.xpdps.length > 0){
            var xpdps = xpdpModel.recreate(jsonObject.xpdps)
            Object.assign(xpdpStore.getState().xpdps, xpdps);
            xpdpStore.getState().setXpdps(xpdps);
          }

          if(jsonObject.mcps.length > 0){
            var mcps = mcpModel.recreate(jsonObject.mcps)
            Object.assign(mcpStore.getState().mcps, mcps);
            mcpStore.getState().setMcps(mcps);
          }

          if(jsonObject.lpds.length > 0){
            var lpds = lpdModel.recreate(jsonObject.lpds)
            Object.assign(lpdStore.getState().lpds, lpds);
            lpdStore.getState().setLpds(lpds);
          }

          if(jsonObject.safetyGates.length > 0){
            var safetyGates = safetyGateGroupModel.recreate(jsonObject.safetyGates)
            Object.assign(safetyGateStore.getState().safetyGates, safetyGates);
            safetyGateStore.getState().setSafetyGates(safetyGates);
          }

          if(jsonObject.networkSwitches.length > 0){
            var networkSwitches = networkSwitchModel.recreate(jsonObject.networkSwitches)
            Object.assign(networkSwitchStore.getState().networkSwitches, networkSwitches);
            networkSwitchStore.getState().setNetworkSwitches(networkSwitches);
          }

          if(jsonObject.hmis.length > 0){
            var hmis = hmiModel.recreate(jsonObject.hmis)
            Object.assign(hmiStore.getState().hmis, hmis);
            hmiStore.getState().setHmis(hmis);
          }

          if(jsonObject.ioModuleGroups.length > 0){
            var ioModuleGroups = ioModuleGroupModel.recreate(jsonObject.ioModuleGroups)
            Object.assign(ioModuleStore.getState().ioModuleGroups, ioModuleGroups);
            ioModuleStore.getState().setIOModuleGroups(ioModuleGroups);
          }
          
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
       <ActionIcon label="Load JSON" icon={iconDownload} onClick={handleIconClick}/>
    </>
  );
};

export default LoadButton;
