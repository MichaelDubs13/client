import f_MIO_Balluff from "./f_manufacturer/f_MIO_Balluff";
import f_MIO_Siemens from "./f_manufacturer/f_MIO_Siemens";
import Component from "../../Component";
import f_IOLink_Modules from "../f_IOLink_Modules/f_IOLink_Modules";

export default class f_MIO_Modules extends Component{
    constructor(parent, ioModule) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules";
        this._class = "f_MIO_Modules";
        this._name = `f_MIO_Modules`;
        this._ioModule = ioModule;
        this._ioLinkSlaveModules = ioModule.ports.filter(port => port.isIOLink);
    }

    get Parameters(){
        return [
            // {name: "i_NumberOfIOLinkSlaves", value: this._numberOfIOLinkSlaves, type: "Integer"},
        ];
    }
    build(){
        if(this._ioModule.mioManufacturerName === "Balluff"){
            const balluff = new f_MIO_Balluff(this, this._ioModule);
            balluff.build();
        } else if(this._ioModule.mioManufacturerName === "Siemens"){
            const siemens = new f_MIO_Siemens(this, this._ioModule);
            siemens.build();
        }
        for(let i=0;i<this._ioLinkSlaveModules.length;i++){
            const ioLinkSlaveModule = new f_IOLink_Modules(this, i+1, this._ioModule, this._ioLinkSlaveModules[i]);
            ioLinkSlaveModule.build();
        }  
    }
    
}

