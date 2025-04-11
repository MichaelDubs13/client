import Component from "../../../../Component";

export default class c_Siemens extends Component{
    constructor(parent, hmi) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic._fg_HMIs._f_HMI_Config._c_Siemens";
        this._class = "c_Siemens";
        this._name = `c_Siemens`;
        this._hmi = hmi;
    }

    get Parameters(){
        return [
            //{name: "s_frmUI_IOModNetworkSourcePort", value: this._source_network_port, type: "Integer"},
        ];
    }
    build(){

    }
    
}

