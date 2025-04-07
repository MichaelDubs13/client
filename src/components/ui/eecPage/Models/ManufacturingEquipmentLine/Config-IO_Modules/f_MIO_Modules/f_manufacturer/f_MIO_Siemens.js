import Component from "../../Component";

export default class f_MIO_Siemens extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules.f_manufacturer";
        this._class = "f_MIO_Siemens";
        this._name = `f_MIO_Siemens`;
        this._io = io;
    }
    get Parameters(){
        return [

        ];
    }
    build(){

    }
    
}

