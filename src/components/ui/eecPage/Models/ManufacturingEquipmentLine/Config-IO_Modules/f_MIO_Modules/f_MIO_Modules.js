import Component from "../../Component";

export default class f_MIO_Modules extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules";
        this._class = "f_MIO_Modules";
        this._name = `f_MIO_Modules`;
        this._io = io;
    }
    get Parameters(){
        return [
            {name: "i_NumberOfIOLinkSlaves", value: "Undefined", type: "Integer"},
        ];
    }
    build(){

    }
    
}

