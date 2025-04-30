import Component from "../Component";
import F_Supply from "./_f_Supply/F_Supply";
import F_K_Grounding from "./_f_K_Grounding/F_K_Grounding";
import F_PowerDistribution from "./_f_PowerDistribution/F_PowerDistribution";

export default class Fg_XPowerDistributionPanel extends Component{
    constructor(parent,index, xpdp) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP";
        this._class = "fg_XPowerDistributionPanel";
        this._name = `fg_XPowerDistributionPanel${index > 1 ? index : ""}`;
        this._xpdp = xpdp        
    }

    get Parameters(){
        return [
            {name: "i_NumberOfPowerDrops1ph_8A", value: this._xpdp.branchCircuit["8A 1ph"].length, type: "Integer"},
            {name: "i_NumberOfPowerDrops1ph_15A", value: this._xpdp.branchCircuit["15A 1ph"].length, type: "Integer"},
            {name: "i_NumberOfPowerDrops1ph_20A", value: this._xpdp.branchCircuit["20A 1ph"].length, type: "Integer"},
            {name: "i_NumberOfPowerDrops3ph_20A", value:  this._xpdp.branchCircuit["20A 3ph"].length, type: "Integer"},
            {name: "frmUI_EnclosureNameplateFLA", value: this._xpdp.amp, type: "String"},
            {name: "frmUI_s_TransformerSize", value: this._xpdp.xf_size, type: "String"},
            {name: "frmUI_s_XFMR_PhysicalLocation", value: this._xpdp.location, type: "String"},
            {name: "s_XfmrToDS_CBL_Length", value: this._xpdp.xf_cable_length, type: "String"},
        ];
    }

    build(){
        const f_supply = new F_Supply(this);
        f_supply.build();
        const f_PowerDistribution = new F_PowerDistribution(this, this._xpdp);
        f_PowerDistribution.build();
        const f_k_Grounding = new F_K_Grounding(this);
        f_k_Grounding.build();
    }
}
