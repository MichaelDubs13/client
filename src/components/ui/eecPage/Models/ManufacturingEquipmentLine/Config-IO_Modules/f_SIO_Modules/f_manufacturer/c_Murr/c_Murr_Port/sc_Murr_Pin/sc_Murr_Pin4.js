import Component from "../../../../../../Component";

export default class sc_Murr_Pin4 extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules.f_manufacturer.c_Murr.c_Murr_Port.sc_Murr_Pin";
        this._class = "sc_Murr_Pin4";
        this._name = `sc_Murr_Pin4`;
        this._io = io;
    }
    get Parameters(){
        return [
            {name: "s_pin_description", value: this._io.target_device_function_text, type: "String"},
            {name: "s_TargetDeviceLocation", value: this._io.target_device_location, type: "String"},
            {name: "s_TargetDeviceDT", value: this._io.target_device_location_dt, type: "String"},
            {name: "s_TargetDevicePartNumber", value: this._io.partNumber, type: "String"},
        ];
    }
    build(){

    }
    
}

