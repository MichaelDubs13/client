import Component from "../../Component";
import C_ETH_Interface from "./C_ETH_Interface";

export default class C_ETH extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_ETH";
        this._class = "c_ETH";
        this._name = "c_ETH";   
        this._mcp = mcp;   

        
    }

    get Parameters(){
        return [
            {name: "Plant_IP", value: this._mcp.eth_plant_ip, type: "String"},
            {name: "PLC_IP", value: this._mcp.eth_plc_plc_ip, type: "String"},
            {name: "Local_IP", value: this._mcp.eth_local_ip, type: "String"},
            {name: "Local_Secondary_IP", value: this._mcp.eth_local_ip_secondary, type: "String"},
        ];
    }

    build(){
        const leth_interface = new C_ETH_Interface(this);
    }
}
