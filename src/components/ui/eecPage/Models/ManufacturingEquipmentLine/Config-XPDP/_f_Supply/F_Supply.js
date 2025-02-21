import Component from "../../Component";
import C_Xfmr from "./_c_Xfmr/C_Xfmr";
import C_OvercurrentProtection from "./,_c_OvercurrentProtection/C_OvercurrentProtection";
import C_3xBusBarSystem from "./_c_3xBusBarSystem/C_3xBusBarSystem";

export default class F_Supply extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP.f_Supply";
        this._class = "f_Supply";
        this._name = "f_Supply";
    }
    get Parameters(){
        return [
            // {name: "s_TransformerSize", value: this.parent.xf_size, type: "String"},
            ];
    }
    build(){
        const c_Xfmr = new C_Xfmr(this);
        c_Xfmr.build();
        const c_OvercurrentProtection = new C_OvercurrentProtection(this);
        c_OvercurrentProtection.build();
        const c_3xBusBarSystem = new C_3xBusBarSystem(this);
        c_3xBusBarSystem.build();
    }
}