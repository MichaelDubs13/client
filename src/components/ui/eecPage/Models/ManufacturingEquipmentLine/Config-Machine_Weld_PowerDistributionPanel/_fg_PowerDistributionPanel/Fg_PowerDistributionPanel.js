import ProjectConfiguration from "../../ProjectConfiguration";
import Component from "../../Component";
import Supply from "./_f_Supply/Supply";
import K_Grounding from "./_f_K_Grounding/K_Grounding";
import PowerDistribution from "./_f_PowerDistribution/PowerDistribution";

export default class Fg_PowerDistributionPanel extends Component{
    constructor(parent,index, pdp) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel";
        this._class = "fg_PowerDistributionPanel";
        this._name = `fg_PowerDistributionPanel${index > 1 ? index : ""}`;
        this._pdp = pdp;
        this.numberOf10APwrDrps = this._pdp.numberOf10APwrDrps ? this._pdp.numberOf10APwrDrps : 0;
        this.numberOf20APwrDrps = this._pdp.numberOf20APwrDrps ? this._pdp.numberOf20APwrDrps : 0;
        this.numberOf30APwrDrps = this._pdp.numberOf30APwrDrps ? this._pdp.numberOf30APwrDrps : 0;
        this.numberOf40APwrDrps = this._pdp.numberOf40APwrDrps ? this._pdp.numberOf40APwrDrps : 0;
        this.numberOf60APwrDrps = this._pdp.numberOf60APwrDrps ? this._pdp.numberOf60APwrDrps : 0;
        this.numberOf70APwrDrps = this._pdp.numberOf70APwrDrps ? this._pdp.numberOf70APwrDrps : 0;
        this.numberOf100APwrDrps = this._pdp.numberOf100APwrDrps ? this._pdp.numberOf100APwrDrps : 0;
        this.numberOf250APwrDrps = this._pdp.numberOf250APwrDrps ? this._pdp.numberOf250APwrDrps : 0;
    }

    getNumberOfPowerDrops(){
        return this._pdp.numberOf10APwrDrps + 
                    this._pdp.numberOf20APwrDrps + 
                    this._pdp.numberOf30APwrDrps +
                    this._pdp.numberOf40APwrDrps +
                    this._pdp.numberOf60APwrDrps +
                    this._pdp.numberOf70APwrDrps +
                    this._pdp.numberOf100APwrDrps +
                    this._pdp.numberOf250APwrDrps;
    }

    get Parameters(){
        return [{name: "frmUI_PDPInstanceName", value: "", type: "String"},
            {name: "InstallationLocation", value: ProjectConfiguration.installation_location, type: "String"},
            {name: "Amperage", value: this._pdp.amp, type: "String"},
            {name: "Plant", value: ProjectConfiguration.plant, type: "String"},
            {name: "Shop", value: ProjectConfiguration.shop, type: "String"},
            {name: "Line", value: ProjectConfiguration.line, type: "String"},
            {name: "Location", value: this._pdp.location, type: "String"},
            {name: "NumberOfPowerDrops", value: this.getNumberOfPowerDrops(), type: "Integer"},
            {name: "NumberofPowerDrops_10A", value: this.numberOf10APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_20A", value: this.numberOf20APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_30A", value: this.numberOf30APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_40A", value: this.numberOf40APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_60A", value: this.numberOf60APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_70A", value: this.numberOf70APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_100A", value: this.numberOf100APwrDrps, type: "Integer"},
            {name: "NumberofPowerDrops_250A", value: this.numberOf250APwrDrps, type: "Integer"},
            {name: "TotalBusbarWidth", value: "", type: "String"},
            {name: "EnclosureSize", value: "", type: "String"},
            {name: "frmUI_BusbarLength", value: "", type: "Integer"},
            {name: "frmUI_OptPwrMonitorLength", value: "", type: "Integer"},
            {name: "frmUI_OptSPDLength", value: "", type: "Integer"},
            {name: "frmUI_OptHotPwrLength", value: "", type: "Integer"},
            {name: "frmUI_BusbarLengthExceeded", value: "", type: "Boolean"},
            {name: "NumberOfBusBars", value: "", type: "Integer"},
            {name: "PwrMonitorEnable", value: "", type: "Boolean"},
            {name: "HotPwrDrop1Type", value: "", type: "String"},
            {name: "HotPwrDrop2Type", value: "", type: "String"},
            {name: "HotPwrDrop3Type", value: "", type: "String"},
            {name: "frmUI_HotPwrDrp1_Spare", value: "", type: "Boolean"},
            {name: "frmUI_HotPwrDrp2_Spare", value: "", type: "Boolean"},
            {name: "frmUI_HotPwrDrp3_Spare", value: "", type: "Boolean"},
            {name: "frmUI_InstLoc_EU", value: "", type: "Boolean"},
        ];
    }

    build(){
        const supply = new Supply(this);
        supply.build();
        const powerDistribution = new PowerDistribution(this, this._pdp);
        powerDistribution.build();
        const k_grounding = new K_Grounding(this);
        k_grounding.build();
    }
}
