import ManufacturingEquipmentLINE from "./ManufacturingEquipmentLine/ManufacturingEquipmentLINE";
import Fg_M_W_PowerDistributionPanel from "./ManufacturingEquipmentLine/Config-Machine_Weld_PowerDistributionPanel/_fg_PowerDistributionPanel/Fg_M_W_PowerDistributionPanel";
import ProjectConfiguration from "./ManufacturingEquipmentLine/ProjectConfiguration";
import Fg_MainControlPanel from "./ManufacturingEquipmentLine/Config-MainControlPanel/Fg_MainControlPanel";
import Fg_24VPowerDistribution from "./ManufacturingEquipmentLine/Config24V-PowerDistribution/Fg_24VPowerDistribution";
import Fg_NetworkSwitches_FieldInstallations from "./ManufacturingEquipmentLine/Config-Ethernet_Switch/Fg_NetworkSwitches_FieldInstallations";
import Fg_IO_Modules from "./ManufacturingEquipmentLine/Config-IO_Modules/Fg_IO_Modules";

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
    
    buildContent : (pdps, mcps, psus, switches,devices, ios) => {
        const manufacturingEquipmentLINE = new ManufacturingEquipmentLINE();
        const fg_M_W_PowerDistributionPanel = new Fg_M_W_PowerDistributionPanel(manufacturingEquipmentLINE, pdps);
        fg_M_W_PowerDistributionPanel.build();

        const fg_MainControlPanel = new Fg_MainControlPanel(manufacturingEquipmentLINE, mcps);
        fg_MainControlPanel.build();

        const fg_24VPowerDistribution = new Fg_24VPowerDistribution(manufacturingEquipmentLINE, psus);
        fg_24VPowerDistribution.build();

        const fg_NetworkSwitches_FieldInstallations = new Fg_NetworkSwitches_FieldInstallations(manufacturingEquipmentLINE, switches);
        fg_NetworkSwitches_FieldInstallations.build();

        const fg_IO_Modules = new Fg_IO_Modules(manufacturingEquipmentLINE, ios);
        fg_IO_Modules.build();

        const node = manufacturingEquipmentLINE.create(ModelBuilder.doc);

        
        return node;
    },

    build:(config, pdps, mcps, psus, switches,devices, ios)=>{
        ModelBuilder.doc = document.implementation.createDocument("", "", null);
        let imxElem = ModelBuilder.doc.createElement("imx");
        imxElem.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        imxElem.setAttribute("xmlns:xi", "http://www.w3.org/2001/XInclude");
        imxElem.setAttribute("version", "1.0");
        //ModelBuilder.buildDoc();
        ProjectConfiguration.set(config);
        const contentElem = ModelBuilder.buildContent(pdps, mcps, psus, switches, devices, ios);
        //post process
        const pi = ModelBuilder.doc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
        ModelBuilder.doc.insertBefore(pi, ModelBuilder.doc.firstChild);
        
        imxElem.appendChild(contentElem);
        ModelBuilder.doc.appendChild(imxElem);

        let docStr = new XMLSerializer().serializeToString(ModelBuilder.doc);
        //docStr = docStr.replaceAll(">",">\n")
        //const docStr = xml.prettifyXml(xml.doc);
        return docStr;
    }
    
}

export default ModelBuilder