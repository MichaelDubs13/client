import Component from "../../Component";

export default class _f_DC_Distribution_CLS2_Balluff_120VPSU extends Component{
    constructor(parent, pwrDistrbution) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_DC_Distribution";
        this._class = "_f_DC_Distribution_CLS2_Balluff_120VPSU";
        this._name = "_f_DC_Distribution_CLS2_Balluff_120VPSU";
        this._pwrDistrbution = pwrDistrbution;
    }
    get Parameters(){
        return [
            // {name: "Drops_On_XD3", value: "", type: "Integer"},
            // {name: "Drops_On_XD4", value: "", type: "Integer"},
            // {name: "Drops_On_XD5", value: "", type: "Integer"},
        ];
    }

    
    build(){
 
    }
}
