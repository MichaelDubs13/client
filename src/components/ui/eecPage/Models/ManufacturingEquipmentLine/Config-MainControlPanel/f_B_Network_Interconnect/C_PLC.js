import Component from "../../Component";
import C_PLC_Interface from "./C_PLC_Interface";

export default class C_PLC extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_PLC";
        this._class = "c_PLC";
        this._name = "c_PLC";   
        this._mcp = mcp;     
        this._plc_eth = false;
    }

    get Parameters(){
        return [
            {name: "Local_IP", value: this._mcp.plc_local_x1_ip, type: "String"},
            {name: "Local_Secondary_IP", value: this._mcp.plc_local_ip_secondary, type: "String"},
            {name: "PLC_IP", value: this._mcp.plc_plc_ip, type: "String"}, // changed from 'plc_local_x1_ip' to 'plc_plc_ip' the port number for PLC to PLC communication
            {name: "Plant_IP", value: this._mcp.plc_local_x3_ip, type: "String"},
            {name: "b_PLC_ETH", value: this._plc_eth , type: "Boolean"},
            {name: "PLC_ID", value: this._mcp.plc_id, type: "String"}, // added from EEC eox v1.0.1
            {name: "PortX1P2R_Target_Location", value: this._mcp.plc_portx1p2r_target_location, type: "String"}, // added from EEC eox v1.0.1
            {name: "PortX1P2R_Target_DT", value: this._mcp.plc_portx1p2r_target_dt, type: "String"}, // added from EEC eox v1.0.1
        ];
    }

    build(){
        const plc_interface = new C_PLC_Interface(this);
    }   
}
