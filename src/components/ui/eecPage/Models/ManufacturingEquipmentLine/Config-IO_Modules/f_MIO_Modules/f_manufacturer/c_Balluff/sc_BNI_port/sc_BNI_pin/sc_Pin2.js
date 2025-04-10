import Component from "../../../../../../Component";

export default class sc_Pin2 extends Component{
    constructor(parent, io, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules.f_manufacturer.c_Balluff.sc_BNI_port.sc_BNI_pin";
        this._class = `sc_Pin2`;
        this._name = `sc_Pin2`;
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

