import Component from "../../../../../../Component";

export default class sc_Murr_Pin4 extends Component{
    constructor(parent, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules.f_manufacturer.c_Murr.c_Murr_Port.sc_Murr_Pin";
        this._class = "sc_Murr_Pin4";
        this._name = `sc_Murr_Pin4`;
        this._port = port;
    }
    get Parameters(){
        return [
            {name: "s_pin_type_selected", value: this._port.pinType, type: "String"},
            {name: "s_pin_description", value: this._port.pinDescription, type: "String"},
            {name: "s_pin_PLCaddress", value: this._port.pinAddress, type: "String"},
            {name: "s_TargetDevicePartNumber", value: this._port.pinTargetPartNumber, type: "String"},
            {name: "s_TargetDeviceLine", value: this._port.pinTargetLine, type: "String"},
            {name: "s_TargetDeviceLocation", value: this._port.pinTargetLocation, type: "String"},
            {name: "s_TargetDeviceDT", value: this._port.pinTargetDT, type: "String"},
        ];
    }
    build(){

    }
    
}

