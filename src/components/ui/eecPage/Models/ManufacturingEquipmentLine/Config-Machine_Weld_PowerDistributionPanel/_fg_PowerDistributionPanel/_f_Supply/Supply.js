import BusBarSystem3X from "./BusBarSystem3X";
import BusPlug from "./BusPlug";
import OvercurrentProtection from "./OvercurrentProtection";
import Component from "../../../Component";

export default class Supply extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply";
        this._class = "Supply";
        this._name = "Supply";
    }

    build(){
        const busPlug = new BusPlug(this);
        const overcurrentProtection = new OvercurrentProtection(this);
        const busBarSystem3X = new BusBarSystem3X(this);
        busBarSystem3X.build();
    }
}