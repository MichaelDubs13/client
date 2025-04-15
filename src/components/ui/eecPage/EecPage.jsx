import { Button,} from "@tesla/design-system-react";
import LineConfiguration from "./Components/LineConfiguration";
import ModelBuilder from "./Models/ModelBuilder";
import { Icon, Tooltip, TooltipWrapper, useTooltipState } from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';
import ModalCreateEecForm from "./ModalCreateEecForm";
import DownloadButton from "../libraryPage/DownloadButton";
import ManufacturingLineConfiguration from "./Components/Project/ManufacturingLineConfiguration";
import { projectStore } from "./Store/projectStore";
import UploadToUIButton from "./UploadToUIButton";
import { xpdpConfiguration, xpdpStore } from "./Store/xpdpStore";
import { mcpConfiguration, mcpStore } from "./Store/mcpStore";
import { lpdConfiguration, lpdStore } from "./Store/lpdStore";
import {pdpStore, pdpConfiguration} from "./Store/pdpStore";
import LoadButton from "./LoadButton";
import SaveButton from "./SaveButton";



const EecPage = () => {
    const getConfig = projectStore((state) => state.getConfig);
    const pdps = pdpStore((state) => state.pdps);
    const xpdps = xpdpStore((state) => state.xpdps);
    const mcps = mcpStore((state) => state.mcps);
    const lpds = lpdStore((state) => state.lpds);
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
      var switches =[]
      var devices = []
      var groupedIOModules = []
      var hmis = []
      var gates = []
      var imx = ModelBuilder.buildIMX(config, validatedPdps,validatedXpdps, validatedMcps, validatedLpds, switches, devices, groupedIOModules, hmis, gates);
      downloadXML(imx, "generated_imx.imx");
    }


    const downloadXML = (doc) => {
      const fileData = doc;
      const blob = new Blob([fileData], { type: "text/xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "xmlDoc";
      link.href = url;
      link.click();
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
                <DownloadButton label="Download EEC Template" filePath="Templates/Eec_Template.xlsx"/>
            </div>
            <h2>
                Configurations  
            </h2>
            <div style={{display: "flex", justifyContent: "left", gap: "15px", alignContent:'center', alignItems:'center'}}>
              <UploadToUIButton/>
              <Button onClick={handleSumbit} style={{marginTop:'5px'}}>Generate</Button>
              <SaveButton/>
              <LoadButton/>
            </div>
            
            <LineConfiguration/>
          </div>
        </>
    )
    
}

export default EecPage