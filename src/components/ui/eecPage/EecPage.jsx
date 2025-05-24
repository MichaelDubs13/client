import LineConfiguration from "./Components/LineConfiguration";
import { Icon, Tooltip, TooltipWrapper, useTooltipState, FormItemFileUpload, Link} from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';
import ModalCreateEecForm from "./ModalCreateEecForm";
import DownloadButton from "../libraryPage/DownloadButton";
import LoadButton from "./LoadButton";
import SaveButton from "./SaveButton";
import UploadButton from "./UploadButton";
import HeadingItem from "./Components/Util/HeadingItem";
import { useState } from "react";
import ElectricalDiagram from "./Flow/ElectricalDiagram";
import NetworkDiagram from "./Flow/NetworkDiagram";
import ClearButton from "./ClearButton";
import GenerateButton from "./GenerateButton";


const EecPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [eplanPath, setEplanPath] = useState("");
    const [loadCount, setLoadCount]=useState(0);
    const {
      open: openTool,
      handlers: handlersTool,
      wrapperRef: wrapperRefTool,
    } = useTooltipState({ initialOpen: false });

    const handleButtonClick=async(event)=> {
      setSelectedFile(event.target.files[0])
      console.log(selectedFile.name);
      const formData = new FormData();
      formData.append("file", selectedFile);
      //eplanDataService.uploadFile(formData);
    }

    const handleLoad = () =>{
      var count = loadCount+1;
      setLoadCount(count)
    }

    return (
   
        <>
          <div style={{marginLeft:'50px'}}>
            <div>
              <p style={{fontSize:'18px', fontWeight:'bold'}}>Report any issues to <Link variant="vertical" href={`https://issues.teslamotors.com/browse/EPLAN-191`} rel="noopener noreferrer" target="_blank">EPLAN-191</Link></p>
            </div>
            {/* <h2>
                Tools
                <TooltipWrapper
                {...handlersTool}
                wrapperRef={wrapperRefTool}
                inline
                className="tds-text--regular tds-text--contrast-medium tds-density--dense"
                >
                <button>
                    <Icon size="large" data={iconInfo} inline align="text-middle" />
                </button>

                <Tooltip open={openTool} align="start">
                    <p>Step1: Fill out EEC template</p>
                    <p>Step2: Use "Create EEC" button to generate eplan</p>
                </Tooltip>
                </TooltipWrapper>
            </h2>
            <div style={{display: "flex", justifyContent: "left", gap: "15px"}}>
                <ModalCreateEecForm/>
                <FormItemFileUpload
                  id="UploadFileForm"
                  accept=".txt"
                  multiple = {false}
                  label="Select File"
                  placeholder="Upload File Handling Test"
                  value={eplanPath}
                  style={{ marginBottom: "5px"}}
                  onChange={handleButtonClick}/> 
            </div> */}
            <h2>
                Diagram
            </h2>
            <div>
                <HeadingItem label={`One-Line Eletrical Diagram`} 
                  size={18} margin={"20px"} open={false}
                  children={<ElectricalDiagram/>}/>
                <HeadingItem label={`One-Line Network Diagram`} 
                  size={18} margin={"20px"} open={false}
                  children={<NetworkDiagram/>}/>
            </div>
            <h2>
                Configurations  
            </h2>
            <div style={{display: "flex", justifyContent: "left", gap: "15px", alignContent:'center', alignItems:'center'}}>
              <GenerateButton/>
              <UploadButton/>
              <SaveButton/>
              <LoadButton onLoad={handleLoad}/>
              <ClearButton/>
            </div>

            <LineConfiguration loadCount={loadCount}/>
          </div>
        </>
    )
    
}

export default EecPage