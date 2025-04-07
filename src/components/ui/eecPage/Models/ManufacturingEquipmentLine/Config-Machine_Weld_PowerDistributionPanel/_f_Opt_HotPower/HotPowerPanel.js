import Component from "../../Component";
import HotPwr_Ground from "./_c_HotPwr_components/HotPwr_Ground";
import HotPwr_Supply from "./_c_HotPwr_components/HotPwr_Supply";

export default class HotPowerPanel extends Component{
    constructor(parent,pdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Opt_HotPower";
        this._class = "HotPowerPanel";
        this._name = `HotPowerPanel`;
        this._pdp = pdp;
    }

    get Parameters(){
        return [
            // {name: "Amperage", value: this._pdp.amp, type: "String"},
        ];
    }

 
    build(){
       var supply = new HotPwr_Supply(this, this._pdp);
       var ground = new HotPwr_Ground(this, this._pdp);
       var enclosure = new HotPowerPanel(this, this._pdp);
    }
}
