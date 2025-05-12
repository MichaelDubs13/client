import ProjectConfiguration from "../ProjectConfiguration";
import Component from "../Component";
import F_A_Main_Sheets from "./f_A_Main_Sheets/F_A_Main_Sheets";
import F_B_Network_Interconnect from "./f_B_Network_Interconnect/F_B_Network_Interconnect";
import F_E_VDC_Interconnect from "./f_E_VDC_Interconnect/F_E_VDC_Interconnect";
import F_K_Grounding from "./f_K_Grounding/F_K_Grounding";


export default class Fg_MainControlPanelComponent extends Component{
    constructor(parent,index, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel";
        this._class = "fg_MainControlPanel";
        this._name = `fg_MainControlPanel${index > 1 ? index : ""}`;
        this._mcp = mcp;
    }

    get Parameters(){
        return [
            // {name: "PLC_ID", value: "", type: "String"},
            // {name: "Location", value: this._location, type: "String"},
            {name: "s_Line", value: this._mcp.line, type: "String"},
            {name: "PowerFeed_Location_PSU", value: this._mcp.psu_location, type: "String"},
            {name: "PowerFeed_DT_PSU", value: this._mcp.psu_location_dt, type: "String"},
            {name: "b_PLC_ETH", value: this._mcp.b_PLC_ETH, type: "Boolean"},
            // {name: "Pwr1_IntPt1_DT", value: "", type: "String"},
            // {name: "Pwr2_IntPt2_DT", value: "", type: "String"},
            {name: "MCP_Location", value: this._mcp.mcpMountingLocation, type: "String"},
            {name: "Local_IP_UPS", value: this._mcp.ups_ip, type: "String"},
        ];
    }
    build(){
        
        const f_a_mainSheets = new F_A_Main_Sheets(this);
        f_a_mainSheets.build();

        const f_B_Network_Interconnect = new F_B_Network_Interconnect(this, this._mcp);
        f_B_Network_Interconnect.build();

        const f_E_VDC_Interconnect = new F_E_VDC_Interconnect(this);
        f_E_VDC_Interconnect.build();

        const f_K_Grounding = new F_K_Grounding(this);
        f_K_Grounding.build();
    }
}
