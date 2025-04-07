import Component from "../../../Component";


export default class HotPwr_EnclosureLayout extends Component{
    constructor(parent,pdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Opt_HotPower._c_HotPwr_components";
        this._class = "HotPwr_EnclosureLayout";
        this._name = `HotPwr_EnclosureLayout`;
        this._pdp = pdp;
    }

    get Parameters(){
        return [
            // {name: "Amperage", value: this._pdp.amp, type: "String"},
        ];
    }

 
    build(){
       
    }
}
