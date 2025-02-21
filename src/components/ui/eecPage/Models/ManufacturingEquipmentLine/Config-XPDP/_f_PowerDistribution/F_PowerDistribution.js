import Component from "../../Component";
import C_BusBarSystem from "./_c_BusBarSystem/C_BusBarSystem";

export default class F_PowerDistribution extends Component{
    constructor(parent, xpdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_PowerDistribution";
        this._class = "f_PowerDistribution";
        this._name = "f_PowerDistribution";
        this._xpdp = xpdp;
    }
    build(){
        const c_BusBarSystem = new C_BusBarSystem(this, this._xpdp);
        c_BusBarSystem.build();
    }
}