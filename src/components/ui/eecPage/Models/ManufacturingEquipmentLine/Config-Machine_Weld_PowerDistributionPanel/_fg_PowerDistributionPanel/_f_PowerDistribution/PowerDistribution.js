import BusbarSystem from "./BusbarSystem";
import Component from "../../../Component";
export default class PowerDistribution extends Component{
    constructor(parent, pdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution";
        this._class = `PowerDistribution`;
        this._name = `PowerDistribution`;
        this._pdp = pdp;
    }


    build(){
        const busbarSystem = new BusbarSystem(this, this._pdp);
        busbarSystem.build();
    }
}