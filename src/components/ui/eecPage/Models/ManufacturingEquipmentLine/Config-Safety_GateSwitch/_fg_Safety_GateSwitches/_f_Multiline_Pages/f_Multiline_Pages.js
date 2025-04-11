import Component from "../../../Component";

export default class f_Multiline_Pages extends Component{
    constructor(parent, gate) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic._fg_Safety_GateSwitches._f_Multiline_Pages";
        this._class = "f_Multiline_Pages";
        this._name = `f_Multiline_Pages`;
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

