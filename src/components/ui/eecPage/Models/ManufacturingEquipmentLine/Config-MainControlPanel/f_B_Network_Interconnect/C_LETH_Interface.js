import Component from "../../Component";
import C_Network_Drop from "./C_Network_Drop";


export default class C_LETH_Interface extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_LETH";
        this._class = "c_LETH_Interface";
        this._name = "c_LETH_Interface";   
        this._mcp = mcp;        
    }

    get Parameters(){
        return [
            {name: "NumberofDevices", value: this._mcp.ports.length-1, type: "Integer"},
        ];
    }

    build(){
        if(this._mcp.ports.length > 4){
            for(let i=1; i<this._mcp.ports.length;i++){
                const drop = this._mcp.ports[i];
                const networkDrop = new C_Network_Drop(this,i, drop);
                networkDrop.build();
            }
        }
    }   
}
