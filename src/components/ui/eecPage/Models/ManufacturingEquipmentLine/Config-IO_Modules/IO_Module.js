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

    }

    getType(){
        this._isSIO=false;
        this._isMIO=false;
        if(this._ioModule.device_dt.startsWith("SIO")){
            this._isSIO=true;
            this._isMIO=false;
        } else if (this._ioModule.device_dt.startsWith("MIO")) {
            this._isSIO=false;
            this._isMIO=true;
        }  
    }

    getSIOInfo(){
        this._sioModManuName = "";
        this._sioModuleParts_Murr = "";
        if(this._isSIO){
            this._sioModManuName = this._ioModule.mfg;
            this._sioModuleParts_Murr = this._ioModule.partNumber;
        }
    }
    

    get Parameters(){
        return [
            {name: "s_frmUI_IOModLocation", value: this._ioModule.target_device_location, type: "String"},
            {name: "s_IOModuleDT", value: this._ioModule.device_dt, type: "String"},
            {name: "b_frmUI_SafetyIO", value: this._isSIO, type: "Boolean"},
            {name: "s_frmUI_SIOModManuName", value: this._sioModManuName, type: "String"},
            {name: "s_frmUI_SIOModuleParts_Murr", value: this._sioModuleParts_Murr, type: "String"},
            {name: "s_frmUI_IOModIPv4_IP_Address", value: this._ioModule.localip, type: "String"},
            {name: "s_frmUI_OpMode", value: this._ioModule.opmode, type: "String"},
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

