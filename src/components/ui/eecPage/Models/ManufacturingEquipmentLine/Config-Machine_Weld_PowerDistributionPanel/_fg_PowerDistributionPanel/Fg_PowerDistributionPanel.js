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
        this._hotPwrDrop1Type = "Spare"
        this._hotPwrDrop2Type = "Spare"
        this._hotPwrDrop3Type = "Spare"
        this._isHotPwrDrp1Spare = true;
        this._isHotPwrDrp2Spare = true;
        this._isHotPwrDrp3Spare = true;
        this._hotPwrDr1_Target_Location = ""
        this._hotPwrDr1_Target_DT = ""
        this._hotPwrDr1_Target_Description = ""
        this._hotPwrDr2_Target_Location = ""
        this._hotPwrDr2_Target_DT = ""
        this._hotPwrDr2_Target_Description = ""
        this._hotPwrDr3_Target_Location = ""
        this._hotPwrDr3_Target_DT = ""
        this._hotPwrDr3_Target_Description = ""

        //only available via UI
        if(this._pdp.Opt_HotPwrEnable){
            if(this._pdp.hotPowerDrops.length > 0){
                this._hotPwrDrop1Type = this._pdp.hotPowerDrops[0].hotPwrDropType;
                if(this._hotPwrDrop1Type === "Device"){
                    this._hotPwrDr1_Target_Location = this._pdp.hotPowerDrops[0].HotPwrDrp_Target_Location;
                    this._hotPwrDr1_Target_DT = this._pdp.hotPowerDrops[0].HotPwrDrp_Target_DT;
                    this._hotPwrDr1_Target_Description = this._pdp.hotPowerDrops[0].HotPwrDrp_Target_Desc;
                    this._isHotPwrDrp1Spare = false;
                }
            }
            if(this._pdp.hotPowerDrops.length > 1){
                this._hotPwrDrop2Type = this._pdp.hotPowerDrops[1].hotPwrDropType;
                if(this._hotPwrDrop2Type === "Device"){
                    this._hotPwrDr2_Target_Location = this._pdp.hotPowerDrops[1].HotPwrDrp_Target_Location;
                    this._hotPwrDr2_Target_DT = this._pdp.hotPowerDrops[1].HotPwrDrp_Target_DT;
                    this._hotPwrDr2_Target_Description = this._pdp.hotPowerDrops[1].HotPwrDrp_Target_Desc;
                    this._isHotPwrDrp2Spare = false;
                }
            }
            if(this._pdp.hotPowerDrops.length > 2){
                this._hotPwrDrop3Type = this._pdp.hotPowerDrops[2].hotPwrDropType;
                if(this._hotPwrDrop3Type === "Device"){
                    this._hotPwrDr3_Target_Location = this._pdp.hotPowerDrops[2].HotPwrDrp_Target_Location;
                    this._hotPwrDr3_Target_DT = this._pdp.hotPowerDrops[2].HotPwrDrp_Target_DT;
                    this._hotPwrDr3_Target_Description = this._pdp.hotPowerDrops[2].HotPwrDrp_Target_Desc;
                    this._isHotPwrDrp3Spare = false;
                }
            }
        }
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
            {name: "HotPwrDrop1Type", value: this._hotPwrDrop1Type, type: "String"}, //device or spare, only usable if hotPwrEnable is true
            {name: "HotPwrDrop2Type", value: this._hotPwrDrop2Type, type: "String"},
            {name: "HotPwrDrop3Type", value: this._hotPwrDrop3Type, type: "String"},
            {name: "frmUI_HotPwrDrp1_Spare", value: this._isHotPwrDrp1Spare, type: "Boolean"},
            {name: "frmUI_HotPwrDrp2_Spare", value: this._isHotPwrDrp2Spare, type: "Boolean"},
            {name: "frmUI_HotPwrDrp3_Spare", value: this._isHotPwrDrp3Spare, type: "Boolean"},
            {name: "HotPwrDr1_Target_Location", value: this._hotPwrDr1_Target_Location, type: "String"},
            {name: "HotPwrDr1_Target_DT", value: this._hotPwrDr1_Target_DT, type: "String"},
            {name: "HotPwrDr1_Target_Desc", value: this._hotPwrDr1_Target_Description, type: "String"},
            {name: "HotPwrDr2_Target_Location", value:  this._hotPwrDr2_Target_Location, type: "String"},
            {name: "HotPwrDr2_Target_DT", value: this._hotPwrDr2_Target_DT, type: "String"},
            {name: "HotPwrDr2_Target_Desc", value: this._hotPwrDr2_Target_Description, type: "String"},
            {name: "HotPwrDr3_Target_Location", value:  this._hotPwrDr3_Target_Location, type: "String"},
            {name: "HotPwrDr3_Target_DT", value: this._hotPwrDr3_Target_DT, type: "String"},
            {name: "HotPwrDr3_Target_Desc", value: this._hotPwrDr3_Target_Description, type: "String"},
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
