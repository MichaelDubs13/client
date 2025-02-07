import Component from "../../../Component";
export default class SubBusBar_Singleline extends Component{
    constructor(parent, index) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_BusBar._c_SubBusBar_MultiLine";
        this._class = `SubBusBar_Singleline`;
        this._name = `SubBusBar_Singleline${index+1}`;
    }
}