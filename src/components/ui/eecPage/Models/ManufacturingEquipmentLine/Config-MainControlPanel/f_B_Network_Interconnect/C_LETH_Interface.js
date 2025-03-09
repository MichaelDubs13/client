import Component from "../../Component";

export default class C_LETH_Interface extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_LETH.c_LETH_Interface";
        this._class = "c_LETH_Interface";
        this._name = "c_LETH_Interface";   
        this._mcp = mcp;        

        
    }

    get Parameters(){
        return [
            {name: "Device_Location", value: "undefined", type: "String"}, //need to set the parameter for the value, typical for all 4 rows
            {name: "Device_DT", value: "undefined", type: "String"},
            {name: "Device_TargetPort", value: "undefined", type: "String"},
            {name: "Cable_Length_Selection", value: "undefined", type: "String"},
        ];
    }

    build(){
        
    }
}
