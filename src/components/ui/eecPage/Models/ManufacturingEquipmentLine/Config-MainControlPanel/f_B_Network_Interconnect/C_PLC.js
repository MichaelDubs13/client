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
            {name: "Local_Secondary_IP", value: "Undefined", type: "String"},
            {name: "PLC_IP", value: this._mcp.plc_local_x1_ip, type: "String"},
            {name: "Plant_IP", value: this._mcp.plc_local_x3_ip, type: "String"},
            {name: "b_PLC_ETH", value: this._plc_eth , type: "Boolean"},
        ];
    }

    build(){
        const plc_interface = new C_PLC_Interface(this);
    }   
}
