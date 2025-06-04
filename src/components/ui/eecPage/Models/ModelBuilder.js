import ManufacturingEquipmentLINE from "./ManufacturingEquipmentLine/ManufacturingEquipmentLINE";
import Fg_M_W_PowerDistributionPanel from "./ManufacturingEquipmentLine/Config-Machine_Weld_PowerDistributionPanel/_fg_PowerDistributionPanel/Fg_M_W_PowerDistributionPanel";
import ProjectConfiguration from "./ManufacturingEquipmentLine/ProjectConfiguration";
import Fg_MainControlPanel from "./ManufacturingEquipmentLine/Config-MainControlPanel/Fg_MainControlPanel";
import Fg_24VPowerDistribution from "./ManufacturingEquipmentLine/Config24V-PowerDistribution/Fg_24VPowerDistribution";
import Fg_NetworkSwitches_FieldInstallations from "./ManufacturingEquipmentLine/Config-Ethernet_Switch/Fg_NetworkSwitches_FieldInstallations";
import Fg_IO_Modules from "./ManufacturingEquipmentLine/Config-IO_Modules/Fg_IO_Modules";
import Fg_XPowerDistributionPanel_M from "./ManufacturingEquipmentLine/Config-XPDP/Fg_XPowerDistributionPanel_M";
import Fg_24VDC_PowerDistribution from "./ManufacturingEquipmentLine/Config24V-PowerDistribution/Fg_24VDC_PowerDistribution";
import Fg_HMIs from "./ManufacturingEquipmentLine/Config-HMI/_fg_HMIs/_f_HMI_Config/Fg_HMIs";
import Fg_Safety_GateSwitches from "./ManufacturingEquipmentLine/Config-Safety_GateSwitch/Fg_Safety_GateSwitches";

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
    
    buildContent : (customer, pdps, xpdps, mcps, lpds, switches,devices, groupedIOModules, hmis, gates) => {
        const manufacturingEquipmentLINE = new ManufacturingEquipmentLINE(customer);

        if(pdps && pdps.length > 0){
            const fg_M_W_PowerDistributionPanel = new Fg_M_W_PowerDistributionPanel(manufacturingEquipmentLINE, pdps);
            fg_M_W_PowerDistributionPanel.build();
        }
        
        if(xpdps && xpdps.length > 0){
            const fg_XPowerDistributionPanel_M = new Fg_XPowerDistributionPanel_M(manufacturingEquipmentLINE, xpdps)
            fg_XPowerDistributionPanel_M.build();
        }
        
        if(mcps && mcps.length >0){
            const fg_MainControlPanel = new Fg_MainControlPanel(manufacturingEquipmentLINE, mcps);
            fg_MainControlPanel.build();
        }
        
        if(lpds && lpds.length > 0){
            const fg_24VDCPowerDistribution = new Fg_24VDC_PowerDistribution(manufacturingEquipmentLINE, lpds);
            fg_24VDCPowerDistribution.build();
        }
       
        if(switches && switches.length >0){
            const fg_NetworkSwitches_FieldInstallations = new Fg_NetworkSwitches_FieldInstallations(manufacturingEquipmentLINE, switches);
            fg_NetworkSwitches_FieldInstallations.build();
        }
        
        if(groupedIOModules && groupedIOModules.length > 0){
            const fg_IO_Modules = new Fg_IO_Modules(manufacturingEquipmentLINE, groupedIOModules);
            fg_IO_Modules.build();
        }

        if(hmis && hmis.length > 0){
            const fg_hmis = new Fg_HMIs(manufacturingEquipmentLINE, hmis);
            fg_hmis.build();
        }

        if(gates && gates.length >0){
            const fg_Safety_GateSwitches = new Fg_Safety_GateSwitches(manufacturingEquipmentLINE, gates)
            fg_Safety_GateSwitches.build();
        }

        const node = manufacturingEquipmentLINE.create(ModelBuilder.doc);

        
        return node;
    },

    buildIMX:(config, customer, pdps,xpdps, mcps, lpds, switches,devices, groupedIOModules, hmis, gates)=>{
        ModelBuilder.doc = document.implementation.createDocument("", "", null);
        let imxElem = ModelBuilder.doc.createElement("imx");
        imxElem.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        imxElem.setAttribute("xmlns:xi", "http://www.w3.org/2001/XInclude");
        imxElem.setAttribute("version", "1.0");
        //ModelBuilder.buildDoc();
        ProjectConfiguration.set(config);

        var projectElem = ModelBuilder.doc.createElement("project");
        projectElem.setAttribute("name", `NewProject`);
        projectElem.setAttribute("save", "true");

        var libraryElem = ModelBuilder.doc.createElement("libraries");
        var addElem = ModelBuilder.doc.createElement("add");
        addElem.setAttribute("name", `String`);
        addElem.setAttribute("value", "MasterConfiguration");

        libraryElem.appendChild(addElem);
        projectElem.appendChild(libraryElem);

        const contentElem = ModelBuilder.buildContent(customer,pdps,xpdps, mcps, lpds, switches, devices, groupedIOModules, hmis, gates);
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