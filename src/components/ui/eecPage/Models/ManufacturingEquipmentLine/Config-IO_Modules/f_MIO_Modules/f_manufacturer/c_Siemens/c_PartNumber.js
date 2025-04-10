import Component from "../../../../Component";

export default class c_PartNumber extends Component{
    constructor(parent, ioModule, partnumber) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules.f_manufacturer.c_Siemens";
        this._class = `c_${partnumber}`;
        this._name = `c_${partnumber}`;
        this._ioModule = ioModule;
        this._ioModule = ioModule;
        this._partnumber = partnumber;
    }
    get Parameters(){
        return [

        ];
    }
    build(){

    }
    
}

