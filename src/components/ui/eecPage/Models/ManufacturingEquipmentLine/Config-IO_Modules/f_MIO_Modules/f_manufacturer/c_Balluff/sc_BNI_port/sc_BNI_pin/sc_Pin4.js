import Component from "../../Component";

export default class sc_Pin4 extends Component{
    constructor(parent, io, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules.f_manufacturer.c_Balluff.sc_BNI_port.sc_BNI_pin";
        this._class = `sc_Pin4`;
        this._name = `sc_Pin4`;
        this._io = io;
    }
    get Parameters(){
        return [

        ];
    }
    build(){

    }
    
}

