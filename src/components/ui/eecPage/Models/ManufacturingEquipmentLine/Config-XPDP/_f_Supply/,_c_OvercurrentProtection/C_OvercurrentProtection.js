import Component from "../../../Component";
import C_OvercurrentProtection_ML from "./C_OvercurrentProtection_ML";
import C_OvercurrentProtection_PL from "./C_OvercurrentProtection_PL";
import C_OvercurrentProtection_SL from "./C_OvercurrentProtection_SL";

export default class C_OvercurrentProtection extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_Supply._c_OvercurrentProtection";
        this._class = "c_OvercurrentProtection";
        this._name = "c_OvercurrentProtection";
    }
    get Parameters(){
        return [
            // {name: "s_TransformerSize", value: this.parent.parent.xf_size, type: "String"},
            ];
    }
    build(){
        const c_OvercurrentProtection_ML = new C_OvercurrentProtection_ML(this);
        const c_OvercurrentProtection_PL = new C_OvercurrentProtection_PL(this);
        const c_OvercurrentProtection_SL = new C_OvercurrentProtection_SL(this);
    }
}