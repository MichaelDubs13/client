import f_MIO_Balluff from "./f_manufacturer/f_MIO_Balluff";
import f_MIO_Siemens from "./f_manufacturer/f_MIO_Siemens";
import Component from "../../Component";

export default class f_MIO_Modules extends Component{
    constructor(parent, ioModule) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules";
        this._class = "f_MIO_Modules";
        this._name = `f_MIO_Modules`;
        this._ioModule = ioModule;
    }

    get Parameters(){
        return [
            {name: "i_NumberOfIOLinkSlaves", value: "Undefined", type: "Integer"},
        ];
    }
    build(){
        if(this._ioModule.mfg === "Balluff"){
            const balluff = new f_MIO_Balluff(this, this._ioModule);
            balluff.build();
        } else if(this._ioModule.mfg === "Siemens"){
            const siemens = new f_MIO_Siemens(this, this._ioModule);
            siemens.build();
        }
    }
    
}

