import Component from "../../Component";
import _f_DC_Distribution_CLS2_Balluff_120VPSU from "../_f_DC_Distribution/_f_DC_Distribution_CLS2_Balluff_120VPSU"; 

export default class _f_PSU_Balluff_CLS2_BAE0133 extends Component{
    constructor(parent, index, psu) {
        super(parent);
        this.parent = parent;
        this._index = index;
        const number = index > 1 ? index : "";
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_PSU_Balluff";
        this._class = "_f_PSU_Balluff_CLS2_BAE0133";
        this._name = `_f_PSU_Balluff_CLS2_BAE0133${number}`;
        this._psu = psu;

        const psuLocationDt = psu.psuLocationDt.split("-");
        this._location = psuLocationDt[0]
    }
    get Parameters(){
        return [
            {name: "NumberOf24V_PowerDrops", value: this._psu.numberOfDrops, type: "Integer"},
        ];
    }
    build(){
        const dcDistribution = new _f_DC_Distribution_CLS2_Balluff_120VPSU(this, this._psu);
        dcDistribution.build();
    }
}
