import Component from "../../Component";
import _f_DC_Distribution_CLS2_Balluff_120VPSU from "../_f_DC_Distribution/_f_DC_Distribution_CLS2_Balluff_120VPSU"; 

export default class _f_PSU_Balluff_CLS2_BAE0133 extends Component{
    constructor(parent, index, psu) {
        super(parent);
        this.parent = parent;
        const number = index > 1 ? index : "";
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_PSU_Balluff";
        this._class = "_f_PSU_Balluff_CLS2_BAE0133";
        this._name = `_f_PSU_Balluff_CLS2_BAE0133${number}`;
        this._psu = psu;
    }
    get Parameters(){
        return [
            {name: "NumberOf24V_PowerDrops", value: this._psu.drops.length, type: "Integer"},
            {name: "Line", value: this._psu.line, type: "String"},
            {name: "Location", value: this._psu.location, type: "String"},
            {name: "PSU_DT", value: this._psu.deviceTag, type: "String"},
        ];
    }
    build(){
        const dcDistribution = new _f_DC_Distribution_CLS2_Balluff_120VPSU(this, this._psu);
        dcDistribution.build();
    }
}
