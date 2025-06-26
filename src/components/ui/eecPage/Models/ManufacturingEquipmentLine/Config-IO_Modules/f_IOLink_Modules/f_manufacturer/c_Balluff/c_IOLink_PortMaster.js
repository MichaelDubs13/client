import Component from "../../../../Component";
import c_IOLink_Port from "./sc_BNI_port/c_IOLink_Port";

export default class c_IOLink_PortMaster extends Component{
    constructor(parent, ioModule, partNumber) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_IOLink_Modules.f_manufacturer.c_Balluff";
        this._class = "c_IOLink_PortMaster";
        this._name = `c_IOLink_PortMaster`;
        this._ioModule = ioModule;
        this._partNumber = partNumber;
    }
    get Parameters(){
        return [
           
        ];
    }
    build(){
        for(let i=0;i<this._ioModule.ports.length;i++){
            const port = new c_IOLink_Port(this, i, this._ioModule, this._partnumber, this._ioModule.ports[i]);
            port.build();
        }   
    }
    
}

