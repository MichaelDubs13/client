import { ToastContainer, useToastContainerState} from "@tesla/design-system-react";
import { iconDocument } from '@tesla/design-system-icons';
import Parser from "./Excel/Parser";
import { useRef, useState } from "react";
import { projectStore } from "./Store/projectStore";
import ActionIcon from "../util/ActionIcon";
import { lineConfiguration } from "./Store/lineStore";


const UploadButton = () => {
  const [eecFile, setEecFile] = useState(null);
  const [eecPath, setEecPath] = useState("");
  const setConfig =  projectStore((state) => state.setConfig);
  const { toasts, addToast } = useToastContainerState();
  const fileInput = useRef(null);

  const handleEecUpload = async (event) => {
      //event.preventDefault();
      if(event.target.files){
        var file = event.target.files[0];
        setEecPath(event.target.value);
        setEecFile(file);
        await parseExcel(event.target.files[0]);
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
    
    const parseExcel = async (file) =>{
      if(!file) return;
      var reader = new FileReader();
        reader.onload = function(event) {
          var data = event.target.result;
          const excelParser = new Parser(data);
          const {config,pdps, xpdps, mcps, lpds, switches, devices, groupedIOModules, hmis, gates} = excelParser.parse();
          
          lineConfiguration.setAllModels(pdps, xpdps, mcps, lpds, switches, hmis, gates, groupedIOModules);
          setConfig(config);
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
