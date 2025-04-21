import { Button,} from "@tesla/design-system-react";
import LineConfiguration from "./Components/LineConfiguration";
import ModelBuilder from "./Models/ModelBuilder";
import { Icon, Tooltip, TooltipWrapper, useTooltipState } from '@tesla/design-system-react';
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
import DiagramComponent from "./Flow/DiagramComponent";
import HeadingItem from "./Components/Util/HeadingItem";


const EecPage = () => {
    const getConfig = projectStore((state) => state.getConfig);
    const pdps = pdpStore((state) => state.pdps);
    const xpdps = xpdpStore((state) => state.xpdps);
    const mcps = mcpStore((state) => state.mcps);
    const lpds = lpdStore((state) => state.lpds);
    const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
    const hmis = hmiStore((state) => state.hmis);
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
      var validatedHmis = hmiConfiguration.generateData(hmis);
      var devices = []
      var groupedIOModules = []
      var hmis = []
      var gates = []
      var imx = ModelBuilder.buildIMX(config, validatedPdps,validatedXpdps, validatedMcps, validatedLpds, validatedNetworkSwitches, devices, groupedIOModules, validatedHmis, gates);
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
                Diagram
            </h2>
            <div>
                <HeadingItem label={`One-Line Diagram`} 
                  size={18} margin={"20px"} open={false}
                  children={<DiagramComponent/>}/>
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
            
            <LineConfiguration/>
          </div>
        </>
    )
    
}

export default EecPage