import Component from "../../../Component";
import C_Xfmr_ML from "./C_Xfmr_ML";
import C_Xfmr_SL from "./C_Xfmr_SL";
import C_Ground from "./_c_Ground/C_Ground";

export default class C_Xfmr extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_Supply._c_Xfmr";
        this._class = "c_Xfmr";
        this._name = "c_Xfmr";
    }
    get Parameters(){
        return [
            // {name: "s_TransformerSize", value: this.parent.parent.xf_size, type: "String"},
            // {name: "s_XFMR_DT", value: "", type: "String"},
            // {name: "s_XfmrToDS_CBL_DT", value: "CBL", type: "String"},
            ];
    }
    build(){
        const c_Xfmr_ML = new C_Xfmr_ML(this);
        const c_Xfmr_SL = new C_Xfmr_SL(this);
        const c_Ground = new C_Ground(this);
        c_Ground.build();
    }
}