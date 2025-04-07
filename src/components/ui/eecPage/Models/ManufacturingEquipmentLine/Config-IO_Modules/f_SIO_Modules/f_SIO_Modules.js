import Component from "../../Component";

export default class f_SIO_Modules extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules";
        this._class = "f_SIO_Modules";
        this._name = `f_SIO_Modules`;
        this._io = io;
    }
    get Parameters(){
        return [
            
        ];
    }
    build(){

    }
    
}

