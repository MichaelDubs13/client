import Component from "../../Component";

export default class C_KED_Interface extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_KED.c_KED_Interface";
        this._class = "c_KED_Interface";
        this._name = "c_KED_Interface";       
        this._mcp = mcp; 
        
    }

    get Parameters(){
        return [
            // {name: "Port4_Target_Location", value: this._mcp.ked_port4_target_location, type: "String"}, // added in EEC eox v1.0.1
            // {name: "Port4_Target_DT", value: this._mcp.ked_port4_target_dt, type: "String"}, // added in EEC eox v1.0.1
            // {name: "Port5_Target_Location", value: this._mcp.ked_port5_target_location, type: "String"}, // added in EEC eox v1.0.1
            // {name: "Port5_Target_DT", value: this._mcp.ked_port5_target_dt, type: "String"}, // added in EEC eox v1.0.1
        ];
    }

    build(){
        
    }
}
