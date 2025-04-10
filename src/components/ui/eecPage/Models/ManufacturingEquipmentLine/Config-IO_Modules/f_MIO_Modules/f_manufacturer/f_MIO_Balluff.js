import Component from "../../../Component";
import c_PartNumber from "./c_Balluff/c_PartNumber";

export default class f_MIO_Balluff extends Component{
    constructor(parent, ioModule) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules.f_manufacturer";
        this._class = "f_MIO_Balluff";
        this._name = `f_MIO_Balluff`;
        this._ioModule = ioModule;
        this._partNumberOptions = ["BNI00AZ","BNI00FW","BNI00HL","BNI005H","BNI0052"]
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

