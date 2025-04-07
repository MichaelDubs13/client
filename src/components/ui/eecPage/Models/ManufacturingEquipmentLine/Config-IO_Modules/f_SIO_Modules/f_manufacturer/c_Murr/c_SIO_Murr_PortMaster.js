import Component from "../../Component";

export default class c_SIO_Murr_PortMaster extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules.f_manufacturer.c_Murr";
        this._class = "c_SIO_Murr_PortMaster";
        this._name = `c_SIO_Murr_PortMaster`;
        this._io = io;
    }
    get Parameters(){
        return [
            
        ];
    }
    build(){

    }
    
}

