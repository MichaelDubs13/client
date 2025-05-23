import { ToastContainer, useToastContainerState} from "@tesla/design-system-react";
import { iconDocument } from '@tesla/design-system-icons';
import { Icon, IconButton } from '@tesla/design-system-react';
import Parser from "./Excel/Parser";
import { useRef, useState } from "react";
import { pdpStore } from "./Store/pdpStore";
import { xpdpStore } from "./Store/xpdpStore";
import { mcpStore } from "./Store/mcpStore";
import { lpdStore } from "./Store/lpdStore";
import { projectStore } from "./Store/projectStore";
import { networkSwitchStore } from "./Store/networkSwitchStore";
import { hmiStore } from "./Store/hmiStore";
import { safetyGateStore } from "./Store/safetyGateStore";
import ActionIcon from "../util/ActionIcon";


const UploadButton = () => {
  const [eecFile, setEecFile] = useState(null);
  const [eecPath, setEecPath] = useState("");
  const setConfig =  projectStore((state) => state.setConfig);
  const setPdps =  pdpStore((state) => state.setPdps);
  const setXpdps =  xpdpStore((state) => state.setXpdps);
  const setMcps =  mcpStore((state) => state.setMcps);
  const setLpds =  lpdStore((state) => state.setLpds);
  const setHmis = hmiStore((state)=>state.setHmis);
  const setSafetyGates = safetyGateStore((state)=>state.setSafetyGates)
  const setNetworkSwitches = networkSwitchStore((state)=>state.setNetworkSwitches)
  const { toasts, addToast } = useToastContainerState();
  const fileInput = useRef(null);

  const handleEecUpload = async (event) => {
      event.preventDefault();
      if(event.target.files){
        var file = event.target.files[0];
        setEecPath(event.target.value);
        setEecFile(file);
        await parseExcel(event.target.files[0]);
        addToast({
          title: 'EEC Data updated',
          dismissible: true,
          caption: 'EEC UI forms updated',
          variant: 'status',
          statusType: 'info',
        })
      }
    }
    
    const parseExcel = async (file) =>{
      if(!file) return;
      var reader = new FileReader();
        reader.onload = function(event) {
          var data = event.target.result;
          const excelParser = new Parser(data);
          const {config,pdps, xpdps, mcps, lpds, switches, devices, groupedIOModules, hmis, gates} = excelParser.parse();
          setConfig(config);
          setPdps(pdps);
          setXpdps(xpdps);
          setMcps(mcps);
          setLpds(lpds);
          setNetworkSwitches(switches);
          setHmis(hmis);
          setSafetyGates(gates);
        }
        reader.readAsBinaryString(file)
  }
  const handleIconClick = () => {
    fileInput.current.click();
  }
  return (
    <>
      
      <input
          type="file"
          accept=".xlsx, .xlsm"
          multiple = {false}
          label="Upload EEC configuration"
          value={eecPath}
          ref={fileInput}
          style={{display:'none'}}
          onChange={handleEecUpload}/>
      <ToastContainer toasts={toasts} />
      <ActionIcon label="Upload EEC configuration" icon={iconDocument} onClick={handleIconClick}/>
    </>
  );
};

export default UploadButton;
