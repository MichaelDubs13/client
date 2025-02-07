import Component from "../Component";
import ProjectConfiguration from "../ProjectConfiguration";

export default class IO_Module extends Component{
    constructor(parent, index, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection";
        this._class = "f_IO_module_selection";
        this._name = `IO_Module_${index}`;
        this._io = io;
    }

    get Parameters(){
        return [
            {name: "s_frmUI_ModuleTitle", value: "", type: "String"},
            {name: "b_frmUI_SafetyIO", value: "", type: "Boolean"},
            {name: "s_frmUI_IOModManufName", value: "", type: "Boolean"},
            {name: "s_frmUI_IOModPartNo", value: "", type: "Boolean"},
            {name: "s_frmUI_IOModLocation", value: "", type: "String"},
            {name: "s_frmUI_IOModIPv4_IP_Address", value: "", type: "String"},
            {name: "s_frmUI_OpMode", value: "", type: "String"},
            {name: "s_frmUI_SIOModManuName", value: "", type: "String"},
            {name: "s_frmUI_SIOModuleParts_A_B", value: "", type: "String"},
            {name: "s_frmUI_SIOModuleParts_Beckhoff", value: "", type: "String"},
            {name: "s_frmUI_SIOModuleParts_Murr", value: "", type: "String"},
            {name: "s_frmUI_SIOModuleParts_Siemens", value: "", type: "String"},
            {name: "s_frmUI_MIOModManuName", value: "", type: "String"},
            {name: "s_frmUI_MIOModuleParts_Balluff", value: "", type: "String"},
            {name: "s_frmUI_MIOModuleParts_Beckhoff", value: "", type: "String"},
            {name: "s_frmUI_MIOModuleParts_P_F", value: "", type: "String"},
            {name: "s_frmUI_MIOModuleParts_Siemens", value: "", type: "String"},
            {name: "s_frmUI_MIOModuleParts_Turck", value: "", type: "String"},
            {name: "s_frmUI_DefaultPortTypeSelection", value: "", type: "String"},
            {name: "Location", value: "", type: "String"},
            {name: "Location_ReadOnly", value: "", type: "String"},
            {name: "DTCounter", value: this._index, type: "String"},
            {name: "i_frmUI_NumberOfMasterModules", value: "", type: "Integer"},
            {name: "b_frmUI_IOLinkModuleConfigurationsVisible", value: "", type: "Boolean"},
            {name: "b_frmUI_SafetyIOModuleConfigurationsVisible", value: "", type: "Boolean"},
            {name: "s_IOModuleTypeforDT", value: "", type: "String"},
            {name: "s_IOModuleDT", value: "", type: "String"},
            {name: "s_DeviceFullDT", value: "", type: "String"},
            {name: "s_PWR_SourceDeviceDT", value: "", type: "String"},
            {name: "s_PWR_TargetDeviceDT", value: "", type: "String"},
            {name: "s_COM_SourceDeviceDT", value: "", type: "String"},
            {name: "s_COM_TargetDeviceDT", value: "", type: "String"},
            {name: "s_frmUI_IOModNetworkSourceDT", value: "", type: "String"},
            {name: "s_frmUI_IOModNetworkSourceLocation", value: "", type: "String"},
            {name: "s_frmUI_IOModPSUSourceDT", value: "", type: "String"},
            {name: "s_frmUI_IOModPSUSourceLocation", value: "", type: "String"},
            {name: "s_frmUI_IOTypeSelection", value: "", type: "String"},
        ];
    }

    
}

