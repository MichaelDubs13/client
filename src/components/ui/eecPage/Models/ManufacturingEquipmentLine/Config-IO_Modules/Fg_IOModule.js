import Component from "../Component";
import ProjectConfiguration from "../ProjectConfiguration";
import F_AddDeleteMoveIOModule from "./F_AddDeleteMoveIOModule";

export default class Fg_IOModule extends Component{
    constructor(parent, io) {
        super(parent);
        console.log(io);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic";
        this._class = "fg_IOModule";
        this._name = `fg_IOModule`;
        this._location = parent._location;
        this._switch = parent._switch;
        this._switchTitle = `switch${parent._index}`;
        this._io = io;
        const psu = io.device.psu_location_dt.split('-');
        this._psu_location = psu[0];
        this._psu_source = psu[1];
        const networkSwitch = io.device.local_switch_dt.split('-');
        this._switch_location = networkSwitch[0];
        this._switch_source = networkSwitch[1];
    }

    get Parameters(){
        return [
            {name: "s_frmUI_IOModNetworkSourcePort", value: "", type: "String"},
            {name: "PLC_ID", value: "", type: "String"},
            {name: "s_frmUI_InstallationSite", value: ProjectConfiguration.line, type: "Boolean"},
            {name: "s_frmUI_FunctionalAssignment", value: ProjectConfiguration.plant, type: "Boolean"},
            {name: "s_frmUI_FunctionalDesignation", value: ProjectConfiguration.shop, type: "String"},
            {name: "s_frmUI_IOModNetworkSourceLocation", value:  this._switch_location, type: "String"},
            {name: "s_frmUI_IOModNetworkSourceDT", value: this._switch_source, type: "String"},
            {name: "s_frmUI_IOModPSUSourceLocation", value: this._psu_location, type: "String"},
            {name: "s_frmUI_IOModPSUSourceDT", value: this._psu_source , type: "String"},
            {name: "s_frmUI_IOModLocation", value: this._io.device.target_device_dt, type: "String"},
        ];
    }
    build(){
        const f_AddDeleteMoveIOModule = new F_AddDeleteMoveIOModule(this, this._io);
        f_AddDeleteMoveIOModule.build();
    }
    
}

