import Component from "../../../Component";
import K_PE_Busbar from "./K_PE_Busbar";
export default class K_Grounding extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_K_Grounding";
        this._class = "K_Grounding";
        this._name = "K_Grounding";
    }

    build(){
        const k_pe1_busbar = new K_PE_Busbar(this, 1);
        const k_pe2_busbar = new K_PE_Busbar(this, 2);
        const k_pe3_busbar = new K_PE_Busbar(this, 3);
    }
}