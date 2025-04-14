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
        const mcpName = mcp.mcp_name.split('.')
        this._location = mcpName[1];
        this._powerFeedLocation = ""
        this._powerFeed_DT_PSU = ""
        this._mcp_location = mcp.location;
        this._mcp_ipaddress = mcp.ups_ipAddress;
        if(mcp.psu_location_dt){
            var locationArray = mcp.psu_location_dt.split('-')
            if(locationArray.length > 2){
                this._powerFeedLocation = locationArray[1];
                this._powerFeed_DT_PSU = locationArray[2]
            }
        }

        this._powerFeedLocation = mcp.psu_location_dt;
        this._plc_eth = false;
    }

    get Parameters(){
        return [
            // {name: "PLC_ID", value: "", type: "String"},
            // {name: "Location", value: this._location, type: "String"},
            {name: "PowerFeed_Location_PSU", value: this._powerFeedLocation, type: "String"},
            {name: "PowerFeed_DT_PSU", value: this._powerFeed_DT_PSU, type: "String"},
            {name: "b_PLC_ETH", value: this._mcp.b_PLC_ETH, type: "Boolean"},
            // {name: "Pwr1_IntPt1_DT", value: "", type: "String"},
            // {name: "Pwr2_IntPt2_DT", value: "", type: "String"},
            {name: "MCP_Location", value: this._mcp_location, type: "String"},
            {name: "Local_IP_UPS", value: this._mcp_ipaddress, type: "String"},
            // {name: "list_MCP_DTs", value: [], type: "arrayList"},
            // {name: "list_MCP_DTs_full", value: [], type: "arrayList"},

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
