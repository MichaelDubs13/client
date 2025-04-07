import Component from "../../Component";

export default class c_Murr_Port extends Component{
    constructor(parent, io, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules.f_manufacturer.c_Murr.c_Murr_Port";
        this._class = `c_Murr_Port${port}`;
        this._name = `c_Murr_Port${port}`;
        this._io = io;
    }
    get Parameters(){
        return [
            
        ];
    }
    build(){

    }
    
}

