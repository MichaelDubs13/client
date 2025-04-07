import Component from "../../Component";

export default class c_Port extends Component{
    constructor(parent, io, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules.f_manufacturer.c_Balluff.sc_BNI_port";
        this._class = `c_Port${port}`;
        this._name = `c_Port${port}`;
        this._io = io;
    }
    get Parameters(){
        return [

        ];
    }
    build(){

    }
    
}

