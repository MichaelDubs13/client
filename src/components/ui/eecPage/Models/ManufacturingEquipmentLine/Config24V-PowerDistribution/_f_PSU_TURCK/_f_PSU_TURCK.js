import Component from "../../Component";
import _f_DC_Distribution from "../_f_DC_Distribution/_f_DC_Distribution";

export default class _f_PSU_TURCK extends Component{
    constructor(parent, index, psu) {
        super(parent);
        this.parent = parent;
        const number = index > 1 ? index : "";
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_PSU_TURCK";
        this._class = "_f_PSU_TURCK";
        this._name = `_f_PSU_TURCK${number}`;
        this._psu = psu;
    }
    get Parameters(){
        return [
            {name: "NumberOf24V_PowerDrops", value: this._psu.drops.length, type: "Integer"},
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
        const dcDistribution = new _f_DC_Distribution(this, this._psu);
        dcDistribution.build();
    }
}
