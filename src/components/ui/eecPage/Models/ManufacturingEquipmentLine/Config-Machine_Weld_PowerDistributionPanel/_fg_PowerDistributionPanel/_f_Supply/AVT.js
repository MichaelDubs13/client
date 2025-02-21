import Component from "../../../Component";

export default class AVT extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply._c_3xBusBarSystem._c_AVT";
        this._class = "AVT";
        this._name = "AVT";
    }

    get Parameters(){
        return [
            // {name: "AVT_PE", value: "AVTPE", type: "String"}
        ];
    }
}