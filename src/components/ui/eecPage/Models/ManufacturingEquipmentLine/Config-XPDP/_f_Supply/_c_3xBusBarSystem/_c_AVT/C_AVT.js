import Component from "../../../../Component";
import C_AVT_ML from "./C_AVT_ML";
import C_AVT_PL from "./C_AVT_PL";
import C_AVT_SL from "./C_AVT_SL";
export default class C_AVT extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_Supply._c_3xBusBarSystem._c_AVT";
        this._class = "c_AVT";
        this._name = "c_AVT";
    }
 
    build(){
        const c_AVT_ML = new C_AVT_ML(this);
        const c_AVT_SL = new C_AVT_SL(this);
        const c_AVT_PL = new C_AVT_PL(this);
    }
}