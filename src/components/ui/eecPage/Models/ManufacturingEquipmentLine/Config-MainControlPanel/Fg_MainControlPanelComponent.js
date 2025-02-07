import ProjectConfiguration from "../ProjectConfiguration";
import Component from "../Component";


export default class Fg_MainControlPanelComponent extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel";
        this._class = "fg_MainControlPanel";
        this._name = "fg_MainControlPanel";
        this._mcp = mcp;
        const mcpName = mcp.mcp_name.split('.')
        this._location = mcpName[1];
        this._mcp_location = mcp.location;
        this._powerFeedLocation = mcp.psu_location_dt;
        this._plc_eth = false;
    }

    get Parameters(){
        return [{name: "PLC_ID", value: "", type: "String"},
            {name: "Location", value: this._location, type: "String"},
            {name: "PowerFeed_Location_PSU", value: this._powerFeedLocation, type: "String"},
            {name: "b_PLC_ETH", value: this._plc_eth, type: "Boolean"},
            {name: "Pwr1_IntPt1_DT", value: "", type: "String"},
            {name: "Pwr2_IntPt2_DT", value: "", type: "String"},
            {name: "MCP_Location", value: this._mcp_location, type: "String"},
            {name: "Local_IP_UPS", value: "", type: "String"},
            {name: "list_MCP_DTs", value: "", type: "List"},
        ];
    }
    build(){
    }
}
