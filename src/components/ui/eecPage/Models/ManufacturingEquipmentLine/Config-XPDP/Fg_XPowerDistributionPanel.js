import ProjectConfiguration from "../ProjectConfiguration";
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
        this._xpdp = xpdp;
        this._instanceName = this._xpdp.name;
        this.amp = this._xpdp.amp;
        this.location = xpdp.location;
        this.xf_size = this._xpdp.xf_size;
        this.xf_cable_length = this._xpdp.xf_cable_length;
        this.numberOfPwrDrop8A = this._xpdp.numberOfPwrDrop8A ? this._xpdp.numberOfPwrDrop8A : 0;
        this.numberOfPwrDrop15A = this._xpdp.numberOfPwrDrop15A ? this._xpdp.numberOfPwrDrop15A : 0;
        this.numberOfPwrDrop20A1p = this._xpdp.numberOfPwrDrop20A1p ? this._xpdp.numberOfPwrDrop20A1p : 0;
        this.numberOfPwrDrop20A3p = this._xpdp.numberOfPwrDrop20A3p ? this._xpdp.numberOfPwrDrop20A3p : 0;

    }

    getNumberOfPowerDrops(){
        return  this._xpdp.numberOfPwrDrop8A + 
                this._xpdp.numberOfPwrDrop15A + 
                this._xpdp.numberOfPwrDrop20A1p +
                this._xpdp.numberOfPwrDrop20A3p
    }


    get Parameters(){
        return [
            {name: "i_NumberOfPowerDrops1ph_8A", value: this.numberOfPwrDrop8A , type: "Integer"},
            {name: "i_NumberOfPowerDrops1ph_15A", value: this.numberOfPwrDrop15A, type: "Integer"},
            {name: "i_NumberOfPowerDrops1ph_20A", value: this.numberOfPwrDrop20A1p, type: "Integer"},
            {name: "i_NumberOfPowerDrops3ph_20A", value:  this.numberOfPwrDrop20A3p, type: "Integer"},
            {name: "frmUI_EnclosureNameplateFLA", value: this.amp, type: "String"},
            {name: "frmUI_s_TransformerSize", value: this.xf_size, type: "String"},
            {name: "frmUI_s_XFMR_PhysicalLocation", value: this.location, type: "String"},
            {name: "s_XfmrToDS_CBL_Length", value: this.xf_cable_length, type: "String"},
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
