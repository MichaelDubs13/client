import Component from "../../../Component";
import c_PartNumber from "./c_Balluff/c_PartNumber";

export default class f_IOLink_Balluff_Slave1 extends Component{
    constructor(parent, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_IOLink_Modules.f_manufacturer";
        this._class = "f_IOLink_Balluff_Slave1";
        this._name = `f_IOLink_Balluff_Slave1`;
        this._port = port;
        this._partNumberOptions = ["BNI00CR","BNI00CN"]
    }
    get Parameters(){
        return [
           {name: "s_frmUI_IOLinkModuleParts_Balluff", value: this._port.pinTargetPartNumber, type: "String"},
        ];
    }
    build(){
        var isValidPartNumber = this._partNumberOptions.includes(this._port.pinTargetPartNumber.toString());
        if(isValidPartNumber){
            var partNumber = new c_PartNumber(this, this._port, this._partNumber)
            partNumber.build();
        }
    }
    
}

