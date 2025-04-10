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
        var targetIOModule = ioModuleGroup.find(module => module.local_switch_port > 0)
        this._source_network_port = 0;
        if(targetIOModule){
            this._source_network_port = targetIOModule.local_switch_port
        }
    }

    get Parameters(){
        return [
            {name: "s_frmUI_IOModNetworkSourcePort", value: this._source_network_port, type: "Integer"},
            {name: "s_frmUI_IOModNetworkSourceLocation", value: this._ioModule.local_network_source_location, type: "String"},
            {name: "s_frmUI_IOModNetworkSourceDT", value: this._ioModule.local_network_source_dt, type: "String"},
            {name: "s_frmUI_IOModPSUSourceLocation", value: this._ioModule.source24VDC_location, type: "String"},
            {name: "s_frmUI_IOModPSUSourceDT", value: this._ioModule.source24VDC_dt, type: "String"},
            {name: "s_frmUI_IOModLocation", value: this._ioModule.target_device_location, type: "String"},
        ];
    }
    build(){
        const f_AddDeleteMoveIOModule = new F_AddDeleteMoveIOModule(this, this._ioModuleGroup);
        f_AddDeleteMoveIOModule.build();
    }
    
}

