import Component from "../../../Component";
export default class K_PE_Busbar extends Component{
    constructor(parent, index) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_K_Grounding._c_K_PEn_Busbar";
        this._class = `K_PE${index}_Busbar`;
        this._name = `K_PE${index}_Busbar`;
    }
}