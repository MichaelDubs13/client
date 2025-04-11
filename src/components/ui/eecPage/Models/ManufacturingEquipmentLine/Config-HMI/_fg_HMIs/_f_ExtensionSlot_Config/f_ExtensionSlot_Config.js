import Component from "../../../Component";

export default class f_ExtensionSlot_Config extends Component{
    constructor(parent, index, hmi) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-HMI.Mechatronic._fg_HMIs._f_ExtensionSlot_Config";
        this._class = "f_ExtensionSlot_Config";
        this._name = `f_ExtensionSlot_Config${index > 1 ? index : ""}`;
        this._hmi = hmi;
    }

    get Parameters(){
        return [
            {name: "frmUI_ButtonSelected", value: "SPARE", type: "String"},
        ];
    }
    build(){

    }
    
}

