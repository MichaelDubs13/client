import Component from "../Component";
import Fg_MainControlPanelComponent from "./Fg_MainControlPanelComponent";
import F_A_Main_Sheets from "./f_A_Main_Sheets/F_A_Main_Sheets";
import F_B_Network_Interconnect from "./f_B_Network_Interconnect/F_B_Network_Interconnect";
import F_E_VDC_Interconnect from "./f_E_VDC_Interconnect/F_E_VDC_Interconnect";
import F_K_Grounding from "./f_K_Grounding/F_K_Grounding";


export default class Fg_MainControlPanel extends Component{
    constructor(parent, mcps) {
        super(parent);
        this.parent = parent;
        this._class = "fg_MainControlPanel.fg_MainControlPanel";
        this._name = "fg_MainControlPanel";
        this._mcps = mcps;
    }

    get Parameters(){
        return [{name: "NumberofMCP_Instances", value: this._mcps.length, type: "Integer"},
            {name: "list_PLC_IDs", value: "", type: "List"},
        ];
    }

    build(){

        this._mcps.forEach(mcp => {
            const fg_mainPanel = new Fg_MainControlPanelComponent(this, mcp);
            fg_mainPanel.build();
    
            const f_a_mainSheets = new F_A_Main_Sheets(this);
            f_a_mainSheets.build();
    
            const f_B_Network_Interconnect = new F_B_Network_Interconnect(this, mcp);
            f_B_Network_Interconnect.build();
    
            const f_E_VDC_Interconnect = new F_E_VDC_Interconnect(this);
            f_E_VDC_Interconnect.build();
    
            const f_K_Grounding = new F_K_Grounding(this);
            f_K_Grounding.build();
        })
    }
}
