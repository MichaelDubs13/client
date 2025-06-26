import Component from "../../../../../Component";
import sc_IOLink_Pin4 from "./sc_BNI_IOLink_pin/sc_IOLink_Pin4";

export default class c_IOLink_Port extends Component{
    constructor(parent, index, ioModule, partnumber, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_IOLink_Modules.f_manufacturer.c_Balluff.sc_BNI_port";
        this._class = `c_IOLink_Port${index}`;
        this._name = `c_IOLink_Port${index}`;
        this._ioModule = ioModule;
        this._partnumber = partnumber;
        this._port = port;
    }
    get Parameters(){
        return [
           {name: "b_isPortIOLink", value: false, type: "Boolean"},
        ];
    }
    build(){
        const pin4 = new sc_IOLink_Pin4(this,this._port);
        pin4.build()
    }
    
}

