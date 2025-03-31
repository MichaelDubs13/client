import Component from "../../Component";


export default class _f_Sub_DC_Distribution_CLS2_Balluff_120VPSU extends Component{
    constructor(parent, psu) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_DC_Distribution";
        this._class = "_f_Sub_DC_Distribution_CLS2_Balluff_120VPSU";
        this._name = "_f_Sub_DC_Distribution_CLS2_Balluff_120VPSU";
        this._psu = psu;
    }
    get Parameters(){
        return [
            // {name: "PortUsed", value: "", type: "String"},
            // {name: "Summation_Drops_XD3_XD4_XD5", value: "", type: "Double"},
        ];
    }

    
    build(){

    }
}
