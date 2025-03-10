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
        return [
            {name: "Local_IP", value: this._mcp.ked_local_ip, type: "String"},
            {name: "Local_Secondary_IP", value: this._mcp.ked_local_ip_secondary, type: "String"}, //changed from "undefined" to 'ked_local_ip_secondary'
            {name: "PLC_IP", value: this._mcp.ked_plc_plc_ip, type: "String"}, //changed from 'plc_local_x1_ip' to 'ked_plc_plc_ip'
            {name: "Plant_IP", value: this._mcp.ked_plant_ip, type: "String"},
            {name: "Port4_Target_Location", value: this._mcp.ked_port4_target_location, type: "String"}, // added in EEC eox v1.0.1
            {name: "Port4_Target_DT", value: this._mcp.ked_port4_target_dt, type: "String"}, // added in EEC eox v1.0.1
            {name: "Port5_Target_Location", value: this._mcp.ked_port5_target_location, type: "String"}, // added in EEC eox v1.0.1
            {name: "Port5_Target_DT", value: this._mcp.ked_port5_target_dt, type: "String"}, // added in EEC eox v1.0.1
        ];
    }

    build(){
        const ked_interface = new C_KED_Interface(this, this._mcp);
    }
}
