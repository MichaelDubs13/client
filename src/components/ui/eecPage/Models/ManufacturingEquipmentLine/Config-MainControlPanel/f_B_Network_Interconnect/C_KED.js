import Component from "../../Component";
import C_KED_Interface from "./C_KED_Interface";

export default class C_KED extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_KED";
        this._class = "c_KED";
        this._name = "c_KED";   
        this._mcp = mcp;     
    }

    get Parameters(){
        return [{name: "Local_IP", value: this._mcp.ked_local_ip, type: "String"},
            {name: "Local_Secondary_IP", value: "", type: "String"},
            {name: "PLC_IP", value: "", type: "String"},
            {name: "Plant_IP", value: this._mcp.ked_plant_ip, type: "String"},
        ];
    }

    build(){
        const ked_interface = new C_KED_Interface(this);
    }
}
