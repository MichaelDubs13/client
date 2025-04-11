import Component from "../../../Component";

export default class c_Euchner extends Component{
    constructor(parent, gate) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic._fg_Safety_GateSwitches._f_Safety_GateSwitch_Config._c_Euchner";
        this._class = "c_Euchner";
        this._name = `c_Euchner`;
        this._gate = gate;
    }

    get Parameters(){
        return [
            //{name: "s_frmUI_IOModNetworkSourcePort", value: this._source_network_port, type: "Integer"},
        ];
    }
    build(){

    }
    
}

