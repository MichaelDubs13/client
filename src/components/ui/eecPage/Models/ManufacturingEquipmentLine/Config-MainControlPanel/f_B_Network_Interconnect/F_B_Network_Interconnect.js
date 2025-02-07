import Component from "../../Component";
import C_KED from "./C_KED";
import C_LETH from "./C_LETH";
import C_NetworkOverview from "./C_NetworkOverview";
import C_PLC from "./C_PLC";

export default class F_B_Network_Interconnect extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect";
        this._class = "f_B_Network_Interconnect";
        this._name = "f_B_Network_Interconnect";   
        this._mcp = mcp;     
    }

    build(){
        const c_networkOverview = new C_NetworkOverview(this);
        c_networkOverview.build();

        const c_plc = new C_PLC(this, this._mcp);
        c_plc.build();

        const c_ked = new C_KED(this, this._mcp);
        c_ked.build();

        const c_leth = new C_LETH(this, this._mcp);
        c_leth.build();
    }
}
