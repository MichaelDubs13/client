import { Button, Card} from "@tesla/design-system-react";
import ListSection from "./ListSection";
import LineConfiguration from "./LineConfiguration";
import pdpStore from "../../../store/eec/pdpStore";
import dataStore from "../../../store/eec/dataStore";
import xml from "../../../services/xml.service";
import mcpStore from "../../../store/eec/mcpStore";
import lpdStore from "../../../store/eec/lpdStore";
import { useEffect } from "react";
import ModelBuilder from "./Models/ModelBuilder";
import { Icon, Tooltip, TooltipWrapper, useTooltipState } from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';
import ModalCreateEecForm from "./ModalCreateEecForm";
import DownloadButton from "../libraryPage/DownloadButton";
import M_W_PdpConfiguration from "./M_W_PdpConfiguration";


const EecPage = () => {
    const sections = dataStore.sections;
    const pdps = pdpStore((state) => state.pdps);
    const lpds = lpdStore((state)=> state.lpds);
    const {
      open: openTool,
      handlers: handlersTool,
      wrapperRef: wrapperRefTool,
  } = useTooltipState({ initialOpen: false });

    useEffect(() => {
      //ModelBuilder.build();
    }, []);
    
    const handleSumbit = (event) => {
      event.preventDefault();
      var doc = xml.create(pdps, mcpStore,lpds, {});
      downloadXML(doc)
    }

    function downloadXML(doc) {
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
            
            {sections.map((section, index) => (
                <ListSection section={section}/>
            ))}
            <LineConfiguration/>
            <Button onClick={handleSumbit} style={{marginTop:"20px"}}>Generate</Button>
            {/* <M_W_PdpConfiguration></M_W_PdpConfiguration> */}
        </>
    )
    
}

export default EecPage