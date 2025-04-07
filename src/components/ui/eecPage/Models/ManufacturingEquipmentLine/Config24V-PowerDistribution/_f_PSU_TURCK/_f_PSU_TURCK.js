import Component from "../../Component";
import _f_DC_Distribution from "../_f_DC_Distribution/_f_DC_Distribution";

export default class _f_PSU_TURCK extends Component{
    constructor(parent, index, psu) {
        super(parent);
        this.parent = parent;
        this._index = index;
        const number = index > 1 ? index : "";
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_PSU_TURCK";
        this._class = "_f_PSU_TURCK";
        this._name = `_f_PSU_TURCK${number}`;
        this._psu = psu;
    }
    get Parameters(){
        return [
            {name: "NumberOf24V_PowerDrops", value: this._psu.numberOfDrops, type: "Integer"},
        ];
    }
    build(){
        const dcDistribution = new _f_DC_Distribution(this, this._psu);
        dcDistribution.build();
    }
}
