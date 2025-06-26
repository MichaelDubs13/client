import Component from "../../../../Component";
import c_Murr_Port from "./c_Murr_Port/c_Murr_Port";

export default class c_SIO_Murr_PortMaster extends Component{
    constructor(parent, ioModule, partnumber) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules.f_manufacturer.c_Murr";
        this._class = "c_SIO_Murr_PortMaster";
        this._name = `c_SIO_Murr_PortMaster`;
        this._ioModule = ioModule;
        this._partnumber = partnumber;
    }
    get Parameters(){
        return [
            
        ];
    }
    build(){
        for(let i=0;i<this._ioModule.ports.length;i++){
            const port = new c_Murr_Port(this, i, this._ioModule, this._partnumber, this._ioModule.ports[i]);
            port.build();
        }   
    }
    
}

