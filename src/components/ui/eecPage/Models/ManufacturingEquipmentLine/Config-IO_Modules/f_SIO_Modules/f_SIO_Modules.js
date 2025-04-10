import Component from "../../Component";
import f_MIO_Murr from "./f_manufacturer/f_MIO_Murr";

export default class f_SIO_Modules extends Component{
    constructor(parent, ioModule) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules";
        this._class = "f_SIO_Modules";
        this._name = `f_SIO_Modules`;
        this._ioModule = ioModule;
    }
    get Parameters(){
        return [
            
        ];
    }
    build(){
        if(this._ioModule.mfg === "Murr"){
            const balluff = new f_MIO_Murr(this, this._ioModule);
            balluff.build();
        }
    }
    
}

