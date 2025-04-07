import Component from "../../Component";

export default class sc_IOLink_Pin2 extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_IOLink_Modules.f_manufacturer.c_Balluff.sc_BNI_port.sc_BNI_IOLink_pin";
        this._class = `sc_IOLink_Pin2`;
        this._name = `sc_IOLink_Pin2`;
        this._io = io;
    }
    get Parameters(){
        return [
           
        ];
    }
    build(){

    }
    
}

