import Component from "../../../../Component";
import C_Ground_ML from "./C_Ground_ML";
import C_Ground_SL from "./C_Ground_SL";


export default class C_Ground extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_Supply._c_Xfmr._c_Ground";
        this._class = "c_Ground";
        this._name = "c_Ground";
    }
 
    build(){
        const c_Ground_ML = new C_Ground_ML(this);
        const c_Ground_SL = new C_Ground_SL(this);
    }
}