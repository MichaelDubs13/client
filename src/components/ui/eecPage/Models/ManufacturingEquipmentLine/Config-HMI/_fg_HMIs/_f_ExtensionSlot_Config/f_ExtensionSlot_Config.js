import Component from "../../../Component";

export default class f_ExtensionSlot_Config extends Component{
    constructor(parent, device) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic._fg_HMIs._f_ExtensionSlot_Config";
        this._class = "f_ExtensionSlot_Config";
        this._name = `f_ExtensionSlot_Config`;
        this._device = device;
    }

    get Parameters(){
        return [
            //{name: "s_frmUI_IOModNetworkSourcePort", value: this._source_network_port, type: "Integer"},
        ];
    }
    build(){

    }
    
}

