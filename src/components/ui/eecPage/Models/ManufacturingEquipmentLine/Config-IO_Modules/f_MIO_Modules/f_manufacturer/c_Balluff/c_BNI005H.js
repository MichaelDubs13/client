import Component from "../../Component";

export default class c_BNI005H extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules.f_manufacturer.c_Balluff";
        this._class = "c_BNI005H";
        this._name = `c_BNI005H`;
        this._io = io;
    }
    get Parameters(){
        return [

        ];
    }
    build(){

    }
    
}

