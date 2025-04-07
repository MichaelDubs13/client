import Component from "../../Component";

export default class C_ETH_Interface extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_ETH.c_ETH_Interface";
        this._class = "c_ETH_Interface";
        this._name = "c_ETH_Interface";   
        this._mcp = mcp;        

        
    }

    get Parameters(){
        return [
            // {name: "ETH_Network_In_Location", value: this._mcp.eth_port1_target_location, type: "String"},
            // {name: "ETH_Network_Out_Location", value: this._mcp.eth_port2_target_location, type: "String"},
        ];
    }

    build(){
        
    }
}
