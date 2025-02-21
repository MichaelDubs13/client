import Component from "../../../Component";
import C_3xBusBarSystem_ML from "./C_3xBusBarSystem_ML";
import C_3xBusBarSystem_SL from "./C_3xBusBarSystem_SL";
import C_AVT from "./_c_AVT/C_AVT";

export default class C_3xBusBarSystem extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_Supply._c_3xBusBarSystem";
        this._class = "c_3xBusBarSystem";
        this._name = "c_3xBusBarSystem";
    }
  
    build(){
        const c_3xBusBarSystem_ML = new C_3xBusBarSystem_ML(this);
        const c_3xBusBarSystem_SL = new C_3xBusBarSystem_SL(this);
        const c_AVT = new C_AVT(this);
        c_AVT.build();
    }
}