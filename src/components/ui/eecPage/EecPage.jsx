import LineConfiguration from "./Components/LineConfiguration";
import { FormItemFileUpload, Link} from '@tesla/design-system-react';
import DownloadButton from "../libraryPage/DownloadButton";
import LoadButton from "./LoadButton";
import SaveButton from "./SaveButton";
import UploadButton from "./UploadButton";
import { useState } from "react";
import ClearButton from "./ClearButton";
import GenerateButton from "./GenerateButton";
import PrivateRoute from "../../auth/privateRoute";
import EecJobHistory from "./EecJobHistory";


const EecPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [eplanPath, setEplanPath] = useState("");
    const [loadCount, setLoadCount]=useState(0);

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
            <PrivateRoute message={"access Tools"}>
              <h2>
                  Tools  
              </h2>
              <div style={{display: "flex", justifyContent: "left", gap: "15px", alignContent:'center', alignItems:'center', marginBottom:'50px'}}>
                <GenerateButton/>
                <UploadButton/>
                <SaveButton/>
                <LoadButton onLoad={handleLoad}/>
                <ClearButton/>
              </div>
            </PrivateRoute>
            <LineConfiguration loadCount={loadCount}/>
          </div>
        </>
    )
    
}

export default EecPage