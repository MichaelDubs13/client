import Component from "../Component";
import F_AddDeleteMoveIOModule from "./f_IO_module_selection/F_AddDeleteMoveIOModule";

export default class Fg_IOModule extends Component{
    constructor(parent, index, ioModuleGroup) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic";
        this._class = "fg_IOModule";
        this._name = `fg_IOModule${index > 1 ? index : ""}`;
        this._switch = parent._switch;
        this._ioModuleGroup = ioModuleGroup;
        this._ioModule = ioModuleGroup[0];
    }

    get Parameters(){
        return [
            {name: "s_frmUI_IOModNetworkSourcePort", value: this._ioModuleGroup.ethernetSourceDevicePort, type: "Integer"},
            {name: "s_frmUI_IOModNetworkSourceLocation", value: this._ioModuleGroup.ethernetSourceLocation, type: "String"},
            {name: "s_frmUI_IOModNetworkSourceDT", value: this._ioModuleGroup.ethernetSourceDT, type: "String"},
            {name: "s_frmUI_IOModPSUSourceLocation", value: this._ioModuleGroup.powerSourceLocation, type: "String"},
            {name: "s_frmUI_IOModPSUSourceDT", value: this._ioModuleGroup.powerSourceDT, type: "String"},
            {name: "s_frmUI_IOModLocation", value: this._ioModuleGroup.location, type: "String"},
            {name: "PLC_ID", value: this._ioModuleGroup.plcID, type: "String"},
        ];
    }
    build(){
        const f_AddDeleteMoveIOModule = new F_AddDeleteMoveIOModule(this, this._ioModuleGroup);
        f_AddDeleteMoveIOModule.build();
    }
    
}

