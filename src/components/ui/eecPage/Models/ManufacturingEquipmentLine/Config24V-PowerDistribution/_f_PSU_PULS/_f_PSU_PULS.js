import Component from "../../Component";
//import _f_DC_Distribution from "../_f_DC_Distribution/_f_DC_Distribution";
import _f_DC_Distribution_Puls from "../_f_DC_Distribution/_f_DC_Distribution_Puls";

export default class _f_PSU_PULS extends Component{
    constructor(parent, index, psu) {
        super(parent);
        this.parent = parent;
        const number = index > 1 ? index : "";
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_PSU_PULS";
        this._class = "_f_PSU_PULS";
        this._name = `_f_PSU_PULS${number}`;
        this._psu = psu;
        this._class2Drops = this._psu.drops.filter(drop => drop.outputPort === "Class 2");
        this._class2PortNeeded = this._class2Drops.length > 0;
    }
    get Parameters(){
        return [
            {name: "NumberOf24V_PowerDrops", value: this._psu.drops.length, type: "Integer"},
            {name: "NumberOf24V_Class2_PowerDrop", value: this._class2Drops.length, type: "Integer"},
            {name: "_b_Class2_Port_Needed", value: this._class2PortNeeded, type: "Boolean"},
            {name: "Line", value: this._psu.line, type: "String"},
            {name: "Location", value: this._psu.location, type: "String"},
            {name: "PSU_DT", value: this._psu.deviceTag, type: "String"},
            {name: "b_psuFeedback", value: this._psu.enablePsuFeedback, type: "Boolean"},
            {name: "psuFeedbackIOTargetLine", value: this._psu.psuFeedbackIOTargetLine, type: "String"},
            {name: "psuFeedbackIOTargetLocation", value: this._psu.psuFeedbackIOTargetLocation, type: "String"},
            {name: "psuFeedbackIOTargetDT", value: this._psu.psuFeedbackIOTargetDT, type: "String"},
            {name: "psuFeedbackIOTargetPort", value: this._psu.psuFeedbackIOTargetPort, type: "String"},
        ];
    }
    build(){
        const dcDistribution_Class2 = new _f_DC_Distribution_Puls(this, this._psu);
        dcDistribution_Class2.build();
    }
    /* build(){
        // Separate drops
        const standardDrops = this._psu.drops.filter(drop => drop.outputPort !== "Class 2");
        const class2Drops = this._psu.drops.filter(drop => drop.outputPort === "Class 2");

        // Only build if there are drops of that type
        if (standardDrops.length > 0) {
            const dcDistribution = new _f_DC_Distribution(this, { ...this._psu, drops: standardDrops });
        dcDistribution.build();
        }
        if (class2Drops.length > 0) {
            const dcDistribution_Class2 = new _f_DC_Distribution_Puls(this, { ...this._psu, drops: class2Drops });
            dcDistribution_Class2.build();
    }
    } */
}
