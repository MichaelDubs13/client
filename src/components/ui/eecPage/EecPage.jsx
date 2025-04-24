import { Button,} from "@tesla/design-system-react";
import LineConfiguration from "./Components/LineConfiguration";
import ModelBuilder from "./Models/ModelBuilder";
import { Icon, Tooltip, TooltipWrapper, useTooltipState, FormItemFileUpload} from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';
import ModalCreateEecForm from "./ModalCreateEecForm";
import DownloadButton from "../libraryPage/DownloadButton";
import { projectStore } from "./Store/projectStore";
import { xpdpConfiguration, xpdpStore } from "./Store/xpdpStore";
import { mcpConfiguration, mcpStore } from "./Store/mcpStore";
import { lpdConfiguration, lpdStore } from "./Store/lpdStore";
import {pdpStore, pdpConfiguration} from "./Store/pdpStore";
import LoadButton from "./LoadButton";
import SaveButton from "./SaveButton";
import UploadButton from "./UploadButton";
import { networkSwitchConfiguration, networkSwitchStore } from "./Store/networkSwitchStore";
import { hmiConfiguration, hmiStore } from "./Store/hmiStore";
import { safetyGateConfiguration, safetyGateStore } from "./Store/safetyGateStore";
import HeadingItem from "./Components/Util/HeadingItem";
import { useState } from "react";
import ElectricalDiagram from "./Flow/ElectricalDiagram";
import NetworkDiagram from "./Flow/NetworkDiagram";



const EecPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [eplanPath, setEplanPath] = useState("");
    const getConfig = projectStore((state) => state.getConfig);
    const pdps = pdpStore((state) => state.pdps);
    const xpdps = xpdpStore((state) => state.xpdps);
    const mcps = mcpStore((state) => state.mcps);
    const lpds = lpdStore((state) => state.lpds);
    const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
    const hmis = hmiStore((state) => state.hmis);
    const safetyGates = safetyGateStore((state) => state.safetyGates);
    const {
      open: openTool,
      handlers: handlersTool,
      wrapperRef: wrapperRefTool,
    } = useTooltipState({ initialOpen: false });

    const handleSumbit = (event) => {
      event.preventDefault();
      const config = getConfig();
      const validatedPdps =pdpConfiguration.generateData(pdps);
      const validatedXpdps =xpdpConfiguration.generateData(xpdps);
      const validatedMcps =mcpConfiguration.generateData(mcps);
      const validatedLpds = lpdConfiguration.generateData(lpds);
      const validatedNetworkSwitches = networkSwitchConfiguration.generateData(networkSwitches);
      const validatedHmis = hmiConfiguration.generateData(hmis);
      const validatedSafetyGates = safetyGateConfiguration.generateData(safetyGates);
      var devices = []
      var groupedIOModules = []
      var imx = ModelBuilder.buildIMX(config, validatedPdps,validatedXpdps, validatedMcps, validatedLpds, validatedNetworkSwitches, devices, groupedIOModules, validatedHmis, validatedSafetyGates);
      downloadXML(imx, "generated_imx.imx");
    }


    const downloadXML = (doc) => {
      const fileData = doc;
      const blob = new Blob([fileData], { type: "text/xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "xmlDoc.imx";
      link.href = url;
      link.click();
    }
    const handleButtonClick=async(event)=> {
      setSelectedFile(event.target.files[0])
      console.log(selectedFile.name);
      const formData = new FormData();
      formData.append("file", selectedFile);
      //eplanDataService.uploadFile(formData);
    }
    return (
   
        <>
          <div style={{marginLeft:'50px'}}>
            <h2>
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
                <DownloadButton label="Download EEC Template" filePath="Templates\Eec_Template.xlsm"/>
                <FormItemFileUpload
                  id="UploadFileForm"
                  accept=".txt"
                  multiple = {false}
                  label="Select File"
                  placeholder="Upload File Handling Test"
                  value={eplanPath}
                  style={{ marginBottom: "5px"}}
                  onChange={handleButtonClick}/>
            </div>
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
              <UploadButton/>
              <Button onClick={handleSumbit} style={{marginTop:'5px'}}>Generate</Button>
              <SaveButton/>
              <LoadButton/>
            </div>

            {/* <Grid/> */}
            <LineConfiguration/>
          </div>
        </>
    )
    
}

export default EecPage