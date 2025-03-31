import Component from "../../Component";
import C_Network_Drop from "./C_Network_Drop";


export default class C_LETH_Interface extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_LETH.c_LETH_Interface";
        this._class = "c_LETH_Interface";
        this._name = "c_LETH_Interface";   
        this._mcp = mcp;        
        this._local_network_direct = mcp.local_network_direct;
        
    }

    get Parameters(){
        return [
            // {name: "Device_Location", value: "undefined", type: "String"}, //need to set the parameter for the value, typical for all 4 rows
            // {name: "Device_DT", value: "undefined", type: "String"},
            // {name: "Device_TargetPort", value: "undefined", type: "String"},
            // {name: "Cable_Length_Selection", value: "undefined", type: "String"},
            {name: "NumberofDevices", value: this._local_network_direct.length, type: "Integer"},
        ];
    }

    build(){
         for(let i=0; i<this._local_network_direct.length;i++){
            const device = this._local_network_direct[i];
            const networkDrop = new C_Network_Drop(this,i+1, device);
            networkDrop.build();
        }
    }   
}
