import ManufacturingEquipmentLINE from "./ManufacturingEquipmentLine/ManufacturingEquipmentLINE";
import Fg_M_W_PowerDistributionPanel from "./ManufacturingEquipmentLine/Config-Machine_Weld_PowerDistributionPanel/_fg_PowerDistributionPanel/Fg_M_W_PowerDistributionPanel";
import ProjectConfiguration from "./ManufacturingEquipmentLine/ProjectConfiguration";
import Fg_MainControlPanel from "./ManufacturingEquipmentLine/Config-MainControlPanel/Fg_MainControlPanel";
import Fg_24VPowerDistribution from "./ManufacturingEquipmentLine/Config24V-PowerDistribution/Fg_24VPowerDistribution";
import Fg_NetworkSwitches_FieldInstallations from "./ManufacturingEquipmentLine/Config-Ethernet_Switch/Fg_NetworkSwitches_FieldInstallations";
import Fg_IO_Modules from "./ManufacturingEquipmentLine/Config-IO_Modules/Fg_IO_Modules";
import Fg_XPowerDistributionPanel_M from "./ManufacturingEquipmentLine/Config-XPDP/Fg_XPowerDistributionPanel_M";
import Fg_24VDC_PowerDistribution from "./ManufacturingEquipmentLine/Config24V-PowerDistribution/Fg_24VDC_PowerDistribution";

const ModelBuilder = {
    doc : null,
    buildDoc:() => {
        ModelBuilder.doc = document.implementation.createDocument("", "", null);

        var imxElem = ModelBuilder.doc.createElement("imx");
        imxElem.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        imxElem.setAttribute("xmlns:xi", "http://www.w3.org/2001/XInclude");
        imxElem.setAttribute("version", "1.0");
        return ModelBuilder.doc;
    },
    
    buildContent : (pdps, xpdps, mcps, psus, switches,devices, ios) => {
        const manufacturingEquipmentLINE = new ManufacturingEquipmentLINE();

        if(pdps.length > 0){
            const fg_M_W_PowerDistributionPanel = new Fg_M_W_PowerDistributionPanel(manufacturingEquipmentLINE, pdps);
            fg_M_W_PowerDistributionPanel.build();
        }
        
        if(xpdps.length > 0){
            const fg_XPowerDistributionPanel_M = new Fg_XPowerDistributionPanel_M(manufacturingEquipmentLINE, xpdps)
            fg_XPowerDistributionPanel_M.build();
        }
        
        if(mcps.length >0){
            const fg_MainControlPanel = new Fg_MainControlPanel(manufacturingEquipmentLINE, mcps);
            fg_MainControlPanel.build();
        }
        
        if(Object.keys(psus).length > 0){
            const fg_24VDCPowerDistribution = new Fg_24VDC_PowerDistribution(manufacturingEquipmentLINE, psus);
            fg_24VDCPowerDistribution.build();
        }
       
        if(switches.length >0){
            const fg_NetworkSwitches_FieldInstallations = new Fg_NetworkSwitches_FieldInstallations(manufacturingEquipmentLINE, switches);
            fg_NetworkSwitches_FieldInstallations.build();
        }
        

        // const fg_IO_Modules = new Fg_IO_Modules(manufacturingEquipmentLINE, ios);
        // fg_IO_Modules.build();

        const node = manufacturingEquipmentLINE.create(ModelBuilder.doc);

        
        return node;
    },

    buildIMX:(config, pdps,xpdps, mcps, psus, switches,devices, ios)=>{
        ModelBuilder.doc = document.implementation.createDocument("", "", null);
        let imxElem = ModelBuilder.doc.createElement("imx");
        imxElem.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        imxElem.setAttribute("xmlns:xi", "http://www.w3.org/2001/XInclude");
        imxElem.setAttribute("version", "1.0");
        //ModelBuilder.buildDoc();
        ProjectConfiguration.set(config);

        var projectElem = ModelBuilder.doc.createElement("project");
        projectElem.setAttribute("name", `${config.plant}_${config.shop}_${config.line}`);
        projectElem.setAttribute("save", "true");

        var libraryElem = ModelBuilder.doc.createElement("libraries");
        var addElem = ModelBuilder.doc.createElement("add");
        addElem.setAttribute("name", `String`);
        addElem.setAttribute("value", "MasterConfiguration");

        libraryElem.appendChild(addElem);
        projectElem.appendChild(libraryElem);

        const contentElem = ModelBuilder.buildContent(pdps,xpdps, mcps, psus, switches, devices, ios);
        //post process
        const pi = ModelBuilder.doc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
        ModelBuilder.doc.insertBefore(pi, ModelBuilder.doc.firstChild);
        
        // libraryElem.appendChild(addElem);
        // projectElem.appendChild(libraryElem);
        projectElem.appendChild(contentElem);
        imxElem.appendChild(projectElem);

        ModelBuilder.doc.appendChild(imxElem);

        let docStr = new XMLSerializer().serializeToString(ModelBuilder.doc);
        //docStr = docStr.replaceAll(">",">\n")
        //const docStr = xml.prettifyXml(xml.doc);
        return docStr;
    },

    buildTemplate(config){
        ModelBuilder.doc = document.implementation.createDocument("", "", null);
        let imxElem = ModelBuilder.doc.createElement("imx");
        imxElem.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        imxElem.setAttribute("xmlns:xi", "http://www.w3.org/2001/XInclude");
        imxElem.setAttribute("version", "1.0");
        //ModelBuilder.buildDoc();
        ProjectConfiguration.set(config);

        var projectElem = ModelBuilder.doc.createElement("project");
        projectElem.setAttribute("name", `${config.plant}_${config.shop}_${config.line}`);
        projectElem.setAttribute("save", "true");

        var libraryElem = ModelBuilder.doc.createElement("libraries");
        var addElem = ModelBuilder.doc.createElement("add");
        addElem.setAttribute("name", `String`);
        addElem.setAttribute("value", "MasterConfiguration");

        libraryElem.appendChild(addElem);
        projectElem.appendChild(libraryElem);

        const manufacturingEquipmentLINE = new ManufacturingEquipmentLINE();
        const contentElem = manufacturingEquipmentLINE.createWithoutParameter(ModelBuilder.doc);
        var importFragmentElem = ModelBuilder.doc.createElement("importFragment");
        contentElem.appendChild(importFragmentElem);
        const pi = ModelBuilder.doc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
        ModelBuilder.doc.insertBefore(pi, ModelBuilder.doc.firstChild);
        projectElem.appendChild(contentElem);
        imxElem.appendChild(projectElem);

        ModelBuilder.doc.appendChild(imxElem);

        let docStr = new XMLSerializer().serializeToString(ModelBuilder.doc);
    
        return docStr;
    }
    
}

export default ModelBuilder