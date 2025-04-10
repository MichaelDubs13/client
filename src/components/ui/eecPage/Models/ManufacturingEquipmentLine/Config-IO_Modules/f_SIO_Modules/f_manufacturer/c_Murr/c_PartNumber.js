import Component from "../../../../Component";
import c_SIO_Murr_PortMaster from "./c_SIO_Murr_PortMaster";

export default class c_PartNumber extends Component{
    constructor(parent, ioModule, partnumber) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules.f_manufacturer.c_Murr";
        this._class = `c_${partnumber}`;
        this._name = `c_${partnumber}`;
        this._ioModule = ioModule;
        this._partnumber = partnumber;
    }
    get Parameters(){
        return [
            
        ];
    }
    build(){
        const portMaster = new c_SIO_Murr_PortMaster(this, this._ioModule, this._partnumber);
        portMaster.build();
    }
    
}

