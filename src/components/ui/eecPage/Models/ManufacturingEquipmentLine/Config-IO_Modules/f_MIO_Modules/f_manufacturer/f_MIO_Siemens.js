import Component from "../../../Component";
import c_PartNumber from "./c_Siemens/c_PartNumber";

export default class f_MIO_Siemens extends Component{
    constructor(parent, ioModule) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules.f_manufacturer";
        this._class = "f_MIO_Siemens";
        this._name = `f_MIO_Siemens`;
        this._ioModule = ioModule;
        this._partNumberOptions = ["6ES7141_4BF00_0AB0"]
    }
    get Parameters(){
        return [

        ];
    }
    build(){
        var isValidPartNumber = this._partNumberOptions.includes(this._ioModule.partNumber.toString());
        if(isValidPartNumber){
            var partNumber = new c_PartNumber(this, this._ioModule, this._ioModule.partNumber)
            partNumber.build();
        }
    }
    
}

