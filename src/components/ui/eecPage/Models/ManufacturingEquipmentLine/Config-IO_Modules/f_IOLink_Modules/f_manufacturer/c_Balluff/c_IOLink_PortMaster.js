import Component from "../../Component";

export default class c_IOLink_PortMaster extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_IOLink_Modules.f_manufacturer.c_Balluff";
        this._class = "c_IOLink_PortMaster";
        this._name = `c_IOLink_PortMaster`;
        this._io = io;
    }
    get Parameters(){
        return [
           
        ];
    }
    build(){

    }
    
}

