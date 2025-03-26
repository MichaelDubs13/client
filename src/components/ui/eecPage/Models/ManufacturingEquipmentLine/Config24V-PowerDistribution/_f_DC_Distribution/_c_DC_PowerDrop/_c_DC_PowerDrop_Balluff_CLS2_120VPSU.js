import Component from "../../../Component";
export default class _c_DC_PowerDrop_Balluff_CLS2_120VPSU extends Component{
    constructor(parent, index, pwrDistrbution) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_DC_Distribution._c_DC_PowerDrop";
        this._class = "_c_DC_PowerDrop_Balluff_CLS2_120VPSU";
        this._name = `_c_DC_PowerDrop_Balluff_CLS2_120VPSU${index+1}`;
        this._pwrDistrbution = pwrDistrbution;
        this._index = index;
    }
    get Parameters(){
        return [
            {name: "_s_DropLocation_", value: "", type: "String"},
            {name: "_s_DropName_", value: "", type: "String"},
            {name: "DC_PowerDrop_FLA", value: "", type: "Double"},
            {name: "DescriptionTargetDevice", value: "", type: "String"},
        ];
    }

    
    build(){
 
    }
}
