import ProjectConfiguration from "../../ProjectConfiguration";
import Component from "../../Component";
import Supply from "./_f_Supply/Supply";
import K_Grounding from "./_f_K_Grounding/K_Grounding";
import PowerDistribution from "./_f_PowerDistribution/PowerDistribution";
import HotPowerPanel from "../_f_Opt_HotPower/HotPowerPanel";

export default class Fg_PowerDistributionPanel extends Component{
    constructor(parent,index, pdp) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel";
        this._class = "fg_PowerDistributionPanel";
        this._name = `fg_PowerDistributionPanel${index > 1 ? index : ""}`;
        this._pdp = pdp;
    }

    get Parameters(){
        return [
            {name: "Amperage", value: this._pdp.amp, type: "String"},
            {name: "Location", value: this._pdp.name, type: "String"},
            {name: "frmUI_EnclosureNameplateFLA", value: this._pdp.FLA, type: "String"},
            {name: "NumberofPowerDrops_10A", value: this._pdp.numberOf10APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_20A", value: this._pdp.numberOf20APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_30A", value: this._pdp.numberOf30APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_40A", value: this._pdp.numberOf40APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_60A", value: this._pdp.numberOf60APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_70A", value: this._pdp.numberOf70APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_100A", value: this._pdp.numberOf100APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_250A", value: this._pdp.numberOf250APwrDrps, type: "Integer"},
            {name: "EnclosureSize", value: this._pdp.enclosureSize, type: "String"},
            {name: "PwrMonitorEnable", value: this._pdp.PwrMonitorEnable, type: "Boolean"},
            {name: "Opt_SurgeProtectionDevice", value: this._pdp.Opt_SurgeProtectionDevice, type: "Boolean"},
            {name: "Opt_HotPwrEnable", value: this._pdp.Opt_HotPwrEnable, type: "Boolean"},
            {name: "HotPwrDrop1Type", value: "Spare", type: "String"}, //device or spare, only usable if hotPwrEnable is true
            {name: "HotPwrDrop2Type", value: "Spare", type: "String"},
            {name: "HotPwrDrop3Type", value: "Spare", type: "String"},
        ];
    }

 
    build(){
        const supply = new Supply(this);
        supply.build();
        const powerDistribution = new PowerDistribution(this, this._pdp);
        powerDistribution.build();
        const k_grounding = new K_Grounding(this);
        k_grounding.build();

        if(this._pdp.Opt_HotPwrEnable){
            const hotPower = new HotPowerPanel(this, this._pdp)
        }
    }
}
