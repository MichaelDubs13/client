import ItemStore from "../store/eec/ItemStore";
import deviceStore from "../store/eec/deviceStore";
import lpdStore from "../store/eec/lpdStore";


const xml = {

    doc:null,
    prettifyXml: (sourceXml) => {
        var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
        var xsltDoc = new DOMParser().parseFromString([
            // describes how we want to modify the XML - indent everything
            '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
            '  <xsl:strip-space elements="*"/>',
            '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
            '    <xsl:value-of select="normalize-space(.)"/>',
            '  </xsl:template>',
            '  <xsl:template match="node()|@*">',
            '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
            '  </xsl:template>',
            '  <xsl:output indent="yes"/>',
            '</xsl:stylesheet>',
        ].join('\n'), 'application/xml');
    
        var xsltProcessor = new XSLTProcessor();    
        xsltProcessor.importStylesheet(xsltDoc);
        var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
        var resultXml = new XMLSerializer().serializeToString(resultDoc);
        return resultXml;
    },
    
    create: (pdps, mcp, lpds, data) => {
        xml.doc = document.implementation.createDocument("", "", null);

        var imxElem = xml.doc.createElement("imx");
        imxElem.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        imxElem.setAttribute("xmlns:xi", "http://www.w3.org/2001/XInclude");
        imxElem.setAttribute("version", "1.0");

        var projectElem = xml.doc.createElement("project");
        projectElem.setAttribute("name", "Proj-MasterConfiguration");
        projectElem.setAttribute("save", "true");

        var libraryElem = xml.doc.createElement("libraries");
        libraryElem.appendChild(xml.createAdd("String", "T_Ecad_Ui"))
        libraryElem.appendChild(xml.createAdd("String", "MasterConfiguration"))
        libraryElem.appendChild(xml.createAdd("String", "Config-Machine_Weld_PowerDistributionPanel"))
        libraryElem.appendChild(xml.createAdd("String", "Architecture"))
        libraryElem.appendChild(xml.createAdd("String", "Config-EnterNameHere"))

        //library
        projectElem.appendChild(libraryElem);

        //line
        var line_moElem = xml.createLineMo(ItemStore.lineGroupItems); 
        projectElem.appendChild(line_moElem);


        //Line headers
        var allDevicesParameter = xml.createParameter("All_Devices_DT_full")
        var valueElem = xml.doc.createElement("value");
        var arrayListElem = xml.doc.createElement("arrayList");
        valueElem.appendChild(arrayListElem);
        allDevicesParameter.appendChild(valueElem);
        line_moElem.appendChild(allDevicesParameter)

        var locationDesignationsParameter = xml.createParameter("set_LocationDesignations", "Set", '<parameter name=" set_All_DTs_per_LocationDesignation" type="Set" value="<mo name=" f_EndUserInstructions" typeClass="MasterConfiguration.Mechatronic._line_ManufacturingEquipmentLINE.f_End_User_Instructions.f_EndUserInstructions')
        var docuemtnTypeExpMoElem = xml.createMo("c_DocumentTypeEXP_pages", "Architecture.Mechatronic.Components.c_DocumentTypeEXP_pages");
        var titleRevisionStructureMoElem = xml.createMo("c_Title-TOC-Revision-Structure-Pages", "Architecture.Mechatronic.Components.c_Title-TOC-Revision-Structure-Pages");
        arrayListElem.appendChild(locationDesignationsParameter);
        arrayListElem.appendChild(docuemtnTypeExpMoElem);
        arrayListElem.appendChild(titleRevisionStructureMoElem);


        //PDP
        var M_W_PDP_moElem = xml.createPdpMoElem(pdps, data);
        arrayListElem.appendChild(M_W_PDP_moElem);

        //MCP
        var mainControlPanel_moElem = xml.createMcpMoElem(mcp);
        arrayListElem.appendChild(mainControlPanel_moElem);

        //24VDC
        var lpd_moElem = xml.create24vdcPowerDistributionMo(lpds);
        arrayListElem.appendChild(lpd_moElem);

        //post process
        const pi = xml.doc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
        xml.doc.insertBefore(pi, xml.doc.firstChild);

        imxElem.appendChild(projectElem);
        xml.doc.appendChild(imxElem);

        const docStr = new XMLSerializer().serializeToString(xml.doc);

        //const docStr = xml.prettifyXml(xml.doc);

        return docStr.replaceAll(">",">\n");
    },
    createMcpMoElem:(mcp)=>{
        var line_mainControlPanel_moElem = xml.createMo("fg_MainControlPanel", "MasterConfiguration.Mechatronic._line_ManufacturingEquipmentLINE.fg_MainControlPanel.fg_MainControlPanel");
        var numberofMCPInstancesParameter = xml.createParameter("NumberofMCP_Instances", "Integer", '0')
        var listOfPlcIDs = xml.createParameter("list_PLC_IDs")
        line_mainControlPanel_moElem.appendChild(numberofMCPInstancesParameter)
        line_mainControlPanel_moElem.appendChild(listOfPlcIDs)
        var valueElem = xml.doc.createElement("value");
        var arrayListElem = xml.doc.createElement("arrayList");
        line_mainControlPanel_moElem.appendChild(valueElem);
        valueElem.appendChild(arrayListElem);

        var mainControlPanel_moElem = xml.createMo("fg_MainControlPanel", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.fg_MainControlPanel");
        arrayListElem.appendChild(mainControlPanel_moElem);

        mcp.configurations.forEach(item => {
            var parameter = xml.createParameter(item.parameter, item.valueType, item.value);
            mainControlPanel_moElem.appendChild(parameter);
        });

        //list of MCP DTs
        var mcpDtParameter = xml.createParameter("list_MCP_DTs");
        var valueElem = xml.doc.createElement("value");
        var arrayListElem = xml.doc.createElement("arrayList");
        mcpDtParameter.appendChild(valueElem);
        valueElem.appendChild(arrayListElem);
        
        //list of MCP DTs full
        var mcpDtFullParameter = xml.createParameter("list_MCP_DTs_full");
        var valueElem = xml.doc.createElement("value");
        var arrayListElem = xml.doc.createElement("arrayList");
        mcpDtFullParameter.appendChild(valueElem);
        valueElem.appendChild(arrayListElem);

        //main sheet
        var mainsheet_moElem = xml.createMo("f_A_Main_Sheets", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_A_Main_Sheets.f_A_Main_Sheets");
        var c_EnclosureLayout_moElem = xml.createMo("c_EnclosureLayout", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_A_Main_Sheets.c_EnclosureLayout.c_EnclosureLayout");
        var c_EnclosureLabels_moElem = xml.createMo("c_EnclosureLabels", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_A_Main_Sheets.c_EnclosureLabels.c_EnclosureLabels");
        var c_EnclosureNameplate_moElem = xml.createMo("c_EnclosureNameplate", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_A_Main_Sheets.c_EnclosureLabels.c_EnclosureNameplate.c_EnclosureNameplate");
        var c_ISOLabel_moElem = xml.createMo("c_ISOLabel", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_A_Main_Sheets.c_EnclosureLabels.c_ISOLabel.c_ISOLabel");
        c_EnclosureLabels_moElem.appendChild(c_EnclosureNameplate_moElem);
        c_EnclosureLabels_moElem.appendChild(c_ISOLabel_moElem);
        var c_PowerAndHeatLoad_moElem = xml.createMo("c_PowerAndHeatLoad", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_A_Main_Sheets.c_PowerAndHeatLoad.c_PowerAndHeatLoad");
        mainsheet_moElem.appendChild(c_EnclosureLayout_moElem);
        mainsheet_moElem.appendChild(c_EnclosureLabels_moElem);
        mainsheet_moElem.appendChild(c_PowerAndHeatLoad_moElem);

        //network
        var f_B_Network_Interconnect_moElem = xml.createMo("f_B_Network_Interconnect", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.f_B_Network_Interconnect");
        var c_NetworkOverview_moElem = xml.createMo("c_NetworkOverview", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_NetworkOverview.c_NetworkOverview");
        var c_NetworkOverview_Interface_moElem = xml.createMo("c_NetworkOverview_Interface", "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_NetworkOverview.c_NetworkOverview_Interface.c_NetworkOverview_Interface");
        c_NetworkOverview_moElem.appendChild(c_NetworkOverview_Interface_moElem);
        f_B_Network_Interconnect_moElem.appendChild(c_NetworkOverview_moElem);
        xml.createNetworkDevices(f_B_Network_Interconnect_moElem);

        return line_mainControlPanel_moElem;
    },

    create24vdcPowerDistributionMo:(lpds)=>{
        var fg_24VDC_PowerDistribution_moElem = xml.createMo("fg_24VDC_PowerDistribution", "MasterConfiguration.Mechatronic._line_ManufacturingEquipmentLINE.fg_24VDC_PowerDistribution.fg_24VDC_PowerDistribution");
        var numOf24VPSUsParameter = xml.createParameter("i_NumberOfCascading_24VPSUs", "Integer", lpds.length);
        fg_24VDC_PowerDistribution_moElem.appendChild(numOf24VPSUsParameter);

        for (let i = 0; i < lpds.length; i++) {
                
            var fg_24VPowerDistribution_moElem = xml.createMo(`fg_24VPowerDistribution${i === 0 ? "": i+1}`, "Config24V-PowerDistribution.Mechatronic._fg_24VPowerDistribution.fg_24VPowerDistribution");
            var list_CascadingGroup_PSU_DTsParameter = xml.createParameter("list_CascadingGroup_PSU_DTs");
            fg_24VPowerDistribution_moElem.appendChild(list_CascadingGroup_PSU_DTsParameter);
            var valueElem = xml.doc.createElement("value");
            var arrayListElem = xml.doc.createElement("arrayList");
            list_CascadingGroup_PSU_DTsParameter.appendChild(valueElem);
            valueElem.appendChild(arrayListElem);

            lpds[i].items.forEach(configuration => {
                var parameter = xml.createParameter(configuration.parameter, configuration.valueType, configuration.value)
                arrayListElem.appendChild(parameter);
            })
            fg_24VDC_PowerDistribution_moElem.appendChild(fg_24VPowerDistribution_moElem);
        }

        return fg_24VDC_PowerDistribution_moElem;
    },

    createNetworkDevices:(parent)=>{
        //temp
        deviceStore.AddPLC();
        deviceStore.AddKED();
        deviceStore.AddLETH();
        deviceStore.devices.forEach(device => {
            var device_moElem = xml.createMo(`c_${device.name}`, `Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_${device.name}.c_${device.name}`)
            device.parameters.forEach(parameter => {
                var parameter = xml.createParameter(parameter.parameter, parameter.valueType, parameter.value)
                device_moElem.appendChild(parameter);
            })
            var interface_moElem = xml.createMo(`c_${device.name}_Interface`, `Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_${device.name}.c_${device.name}_Interface.c_${device.name}_Interface`)
            device_moElem.appendChild(interface_moElem);
            parent.appendChild(device_moElem);
        })
        var f_E_VDC_Interconnect_moElem = xml.createMo(`f_E_VDC_Interconnect`, `Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_E_VDC_Interconnect.f_E_VDC_Interconnect`)
        var f_K_Grounding_moElem = xml.createMo(`f_K_Grounding`, `Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_K_Grounding.f_K_Grounding`)
        parent.appendChild(f_E_VDC_Interconnect_moElem);
        parent.appendChild(f_K_Grounding_moElem);

    },

    createPdpMoElem:(pdps, data)=>{
        var M_W_PDP_moElem = xml.createMo("fg_M_W_PowerDistributionPanel", "MasterConfiguration.Mechatronic._line_ManufacturingEquipmentLINE.fg_M_W_PowerDistributionPanel.fg_M_W_PowerDistributionPanel");
        M_W_PDP_moElem.appendChild(xml.createParameter("NumberofPDP_Instances", "Integer", pdps.length));
        for (let i = 0; i < pdps.length; i++) {
            var pdp_moElem = xml.createPDPMo(i+1, pdps[i].items)
            M_W_PDP_moElem.appendChild(pdp_moElem);
            var supplyMoElem = xml.createSupplyMo();
            var powerDistributionMoElem = xml.createPowerDistributionMo(pdps[i], data.installationLocation);
            var kGroundMoElem = xml.createKGroundMo();
            var hotPowerPanelMoElem = xml.createHotPowerPanelMo();
            pdp_moElem.appendChild(supplyMoElem);
            pdp_moElem.appendChild(powerDistributionMoElem);
            pdp_moElem.appendChild(kGroundMoElem);
            pdp_moElem.appendChild(hotPowerPanelMoElem);
        }
        return M_W_PDP_moElem;
    },
    createBusbars:(parent, busbars)=>{
        //add PDP
        for (let i = 0; i < busbars.length; i++) {
            var busbarMoElem = xml.createBusbarMo(i+1, busbars[i])
            parent.appendChild(busbarMoElem);
        }
    },

    createAdd: (type, value)=>{
        var elem = xml.doc.createElement("add");
        elem.setAttribute("type", type);
        elem.setAttribute("value", value);
        return elem;
    },

    createMo: (name, typeClass)=>{
        var elem = xml.doc.createElement("mo");
        elem.setAttribute("name", name);
        elem.setAttribute("typeClass", typeClass);
        return elem;
    },

    createParameter: (name, type, value)=>{
        var elem = xml.doc.createElement("parameter");
        
        elem.setAttribute("name", name);
        if(type){
            elem.setAttribute("type", type);
        }
        if(value != null)
        {
            elem.setAttribute("value", value);            
        }
        return elem;
    },

    createLineMo:(recipe) => {
        var moElem = xml.createMo("ManufacturingEquipmentLINE", "MasterConfiguration.Mechatronic._line_ManufacturingEquipmentLINE.ManufacturingEquipmentLINE");

        recipe.forEach(item => {
            var parameter = xml.createParameter(item.parameter, item.valueType, item.value);
            moElem.appendChild(parameter);
        });
        return moElem;
    },

    createPDPMo: (index, recipe) => {
        var mo = xml.createMo(`fg_PowerDistributionPanel${index === 1 ? "": index}`, 
            "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel.fg_PowerDistributionPanel");

        recipe.forEach(item => {
            var parameter = xml.createParameter(item.parameter, item.valueType, item.value);
            mo.appendChild(parameter);
        });

        return mo;
    },

    createSupplyMo:() => {
        var moElem = xml.createMo("Supply", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply.Supply");
        var busplugMoElem = xml.createMo("BusPlug", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply._c_BusPlug.BusPlug");
        var overcurrentProtectionMoElem = xml.createMo("OvercurrentProtection", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply._c_OvercurrentProtection.OvercurrentProtection");
        var busBarSystemMoElem = xml.createMo("3xBusBarSystem", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply._c_3xBusBarSystem.3xBusBarSystem");
        
        moElem.appendChild(busplugMoElem);
        moElem.appendChild(overcurrentProtectionMoElem);
        moElem.appendChild(busBarSystemMoElem);

        var avtMoElem = xml.createMo("AVT", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply._c_3xBusBarSystem._c_AVT.AVT");
        var parameter = xml.createParameter("AVT_PE", "String", "AVTPE");
        avtMoElem.appendChild(parameter);

        var groupMoElem = xml.createMo("Ground", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply._c_3xBusBarSystem._c_Ground.Ground");
        var busbarMoElem = xml.createMo("4thBusbar", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply._c_3xBusBarSystem._c_4thBusbar.4thBusbar");

        busBarSystemMoElem.appendChild(avtMoElem);
        busBarSystemMoElem.appendChild(groupMoElem);
        moElem.appendChild(busbarMoElem);
        return moElem;
    },

    createKGroundMo:() => {
        var moElem = xml.createMo("K_Grounding", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_K_Grounding.K_Grounding");
        var pe1MoElem = xml.createMo("K_PE1_Busbar", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_K_Grounding._c_K_PEn_Busbar.K_PE1_Busbar");
        var pe2MoElem = xml.createMo("K_PE2_Busbar", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_K_Grounding._c_K_PEn_Busbar.K_PE2_Busbar");
        var pe3MoElem = xml.createMo("K_PE3_Busbar", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_K_Grounding._c_K_PEn_Busbar.K_PE3_Busbar");
        var pe4MoElem = xml.createMo("K_PE4_Busbar", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_K_Grounding._c_K_PEn_Busbar.K_PE4_Busbar");

        moElem.appendChild(pe1MoElem);
        moElem.appendChild(pe2MoElem);
        moElem.appendChild(pe3MoElem);
        moElem.appendChild(pe4MoElem);
        return moElem;
    },

    createBusbarMo:(number, busbar) => {
        var numberString = ""
        if(number > 1){
            numberString = number;
        }
        console.log(busbar)
        var moElem = xml.createMo(`BusBar${numberString}`, "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_BusBar.BusBar");
        busbar.items.forEach(item => {
            var parameter = xml.createParameter(item.parameter, item.valueType, item.value);
            moElem.appendChild(parameter);
        });
        
        var subBusBarMultiline2MoElem = xml.createMo("SubBusBar_Multiline2", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_BusBar._c_SubBusBar_MultiLine.SubBusBar_Multiline");
        var subBusBarMultiline3MoElem = xml.createMo("SubBusBar_Multiline3", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_BusBar._c_SubBusBar_MultiLine.SubBusBar_Multiline");
        
        moElem.appendChild(subBusBarMultiline2MoElem);
        moElem.appendChild(subBusBarMultiline3MoElem);
        return moElem;
    },

    createPowerDropMo:(pdp) => {
        const busbars = pdp.busbars;
        const pwrDrp10As = pdp.items.filter(i => i.parameter === "NumberofPowerDrops_10A")
        const numberOf10ADrops = pwrDrp10As[0].value;

        const pwrDrp20As = pdp.items.filter(i => i.parameter === "NumberofPowerDrops_20A")
        const numberOf20ADrops = pwrDrp20As[0].value;

        const pwrDrp30As = pdp.items.filter(i => i.parameter === "NumberofPowerDrops_30A")
        const numberOf30ADrops = pwrDrp30As[0].value;

        const pwrDrp40As = pdp.items.filter(i => i.parameter === "NumberofPowerDrops_40A")
        const numberOf40ADrops = pwrDrp40As[0].value;

        const pwrDrp60As = pdp.items.filter(i => i.parameter === "NumberofPowerDrops_60A")
        const numberOf60ADrops = pwrDrp60As[0].value;

        const pwrDrp70As = pdp.items.filter(i => i.parameter === "NumberofPowerDrops_70A")
        const numberOf70ADrops = pwrDrp70As[0].value;

        const pwrDrp100As = pdp.items.filter(i => i.parameter === "NumberofPowerDrops_100A")
        const numberOf100ADrops = pwrDrp100As[0].value;

        const pwrDrp250As = pdp.items.filter(i => i.parameter === "NumberofPowerDrops_250A")
        const numberOf250ADrops = pwrDrp250As[0].value;

        var moElem = xml.createMo(`PwrDrop`, "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_PwrDrop.PwrDrop");
        var parameter = xml.createParameter("NumberOfBusBars", "Integer", busbars.length);
        moElem.appendChild(parameter);
        xml.createBranchCircuit(moElem, numberOf10ADrops, [], 10);
        xml.createBranchCircuit(moElem, numberOf20ADrops, [], 20);
        xml.createBranchCircuit(moElem, numberOf30ADrops, [],30);
        xml.createBranchCircuit(moElem, numberOf40ADrops, [],40);
        xml.createBranchCircuit(moElem, numberOf60ADrops, [],60);
        xml.createBranchCircuit(moElem, numberOf70ADrops, [],70);
        xml.createBranchCircuit(moElem, numberOf100ADrops, [],100);
        xml.createBranchCircuit(moElem, numberOf250ADrops, [],250); 
        
        return moElem;
    },

    createBranchCircuit:(parent, numberOfDrops, pwrDrps, amp) => {
        for (let i = 0; i < numberOfDrops; i++) {
            var numberString = "";
            if(i > 0)
            {
                numberString = i +1;
            }
            var circuitMoElem = xml.createMo(`${amp}A_BranchCircuit${numberString}`, `Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_PwrDrop.${amp}A_BranchCircuit`);
            pwrDrps.forEach(item => {
                var parameter = xml.createParameter(item.parameter, item.valueType, item.value);
                circuitMoElem.appendChild(parameter);
            });
            
            
            parent.appendChild(circuitMoElem);
        }
    },

    createHotPowerPanelMo:() => {
        var moElem = xml.createMo("HotPowerPanel", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Opt_HotPower.HotPowerPanel");
        var hotPwrSupplyMoElem = xml.createMo("HotPwr_Supply", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Opt_HotPower._c_HotPwr_components.HotPwr_Supply");
        var hotPwrGroundMoElem = xml.createMo("HotPwr_Ground", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Opt_HotPower._c_HotPwr_components.HotPwr_Ground");
        var hotPwrEnclosureLayoutMoElem = xml.createMo("HotPwr_EnclosureLayout", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Opt_HotPower._c_HotPwr_components.HotPwr_EnclosureLayout");

        moElem.appendChild(hotPwrSupplyMoElem);
        moElem.appendChild(hotPwrGroundMoElem);
        moElem.appendChild(hotPwrEnclosureLayoutMoElem);
        return moElem;
    },
    createPowerDistributionMo:(pdp, location) => {
        const busbars = pdp.busbars;
        var moElem = xml.createMo("PowerDistribution", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution.PowerDistribution");
        var busBarSystemMoElem = xml.createMo("BusBarSystem", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem.BusBarSystem");
    
        var dtCounterParameter = xml.createParameter("DTCounter", "String", "00");
        var NumberOfBusBarsParameter = xml.createParameter("NumberOfBusBars", "Integer", busbars.length);
        
        busBarSystemMoElem.appendChild(dtCounterParameter);
        busBarSystemMoElem.appendChild(NumberOfBusBarsParameter);

        xml.createBusbars(busBarSystemMoElem, busbars);

        var powerDropsMo = xml.createPowerDropMo(pdp);
        busBarSystemMoElem.appendChild(powerDropsMo);

        var panelLayoutExteriorMoElem = xml.createMo("PanelLayout_Exterior", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._c_PanelLayout._c_Exterior.Exterior");
        var panelLayoutInteriorMoElem = xml.createMo("PanelLayout_Interior", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._c_PanelLayout._c_Interior.Interior");
        var locationParameter = xml.createParameter("PageLocationDesignation", "String", location);
        panelLayoutInteriorMoElem.appendChild(locationParameter);
        var panelLayoutIDMoElem = xml.createMo("PanelLayout_EnclosureNameplate_and_ID_tag", "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._c_PanelLayout._c_Exterior.EnclosureNameplate_and_ID_tag");

        busBarSystemMoElem.appendChild(panelLayoutExteriorMoElem);
        busBarSystemMoElem.appendChild(panelLayoutInteriorMoElem);
        busBarSystemMoElem.appendChild(panelLayoutIDMoElem);

        moElem.appendChild(busBarSystemMoElem);

        return moElem;
    },
   
}

export default xml;