import Component from "../Component";
import f_MIO_Modules from "./f_MIO_Modules/f_MIO_Modules";
import f_SIO_Modules from "./f_SIO_Modules/f_SIO_Modules";

export default class IO_Module extends Component{
    constructor(parent, index, ioModule) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection";
        this._class = "f_IO_module_selection";
        this._name = `IO_Module_${index}`;
        this._ioModule = ioModule;
        this.getType();
        this.getSIOInfo();
        this.getMIOInfo();

    }

    getType(){
        this._isSIO=false;
        this._isMIO=false;
        if(this._ioModule.deviceTag.startsWith("SIO")){
            this._isSIO=true;
            this._isMIO=false;
        } else if (this._ioModule.deviceTag.startsWith("MIO")) {
            this._isSIO=false;
            this._isMIO=true;
        }  
    }

    getSIOInfo(){
        this._sioModManuName = "";
        this._sioModuleParts_Murr = "";
        if(this._isSIO){
            this._sioModManuName = this._ioModule.sioManufacturerName;
            this._sioModuleParts_Murr = this._ioModule.sioParts_Murr;
        }
    }
    getMIOInfo(){
        this._mioModManuName = "";
        this._mioModuleParts_Balluff = "";
        if(this._isMIO){
            this._mioModManuName = this._ioModule.mioManufacturerName;
            this._mioModuleParts_Balluff = this._ioModule.mioParts_Balluff;
        }
    }
    

    get Parameters(){
        return [
            {name: "s_frmUI_IOModLine", value: this._ioModule.line, type: "String"},
            {name: "s_frmUI_IOModLocation", value: this._ioModule.location, type: "String"},
            {name: "s_IOModuleDT", value: this._ioModule.deviceTag, type: "String"},
            {name: "b_frmUI_SafetyIO", value: this._isSIO, type: "Boolean"},            
            {name: "s_frmUI_SIOModManuName", value: this._sioModManuName, type: "String"},
            {name: "s_frmUI_SIOModuleParts_Murr", value: this._sioModuleParts_Murr, type: "String"},
            {name: "s_frmUI_MIOModManuName", value: this._mioModManuName, type: "String"},
            {name: "s_frmUI_MIOModuleParts_Balluff", value: this._mioModuleParts_Balluff, type: "String"},
            {name: "s_frmUI_IOModIPv4_IP_Address", value: this._ioModule.localIP, type: "String"},
            {name: "s_frmUI_OpMode", value: this._ioModule.opMode, type: "String"},
        ];
    }

    build(){
        if(this._isMIO){
            const mio = new f_MIO_Modules(this, this._ioModule);
            mio.build();
        }
        if(this._isSIO){
            const sio = new f_SIO_Modules(this, this._ioModule);
            sio.build();
        }
    }

    
}

