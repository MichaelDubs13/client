import Component from "../../../Component";
export default class BusBar extends Component{
    constructor(parent, index) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_BusBar";
        this._class = `BusBar`;
        this._name = `BusBar${index > 1 ? index : ""}`;
        this._dTCounter = index.toLocaleString('en-US', {minimumIntegerDigits: 2})
        
    }

    getParameters(){
        return [{name: "DropsOnThisBusBar", value: "", type: "Integer"},
            {name: "DropsOnThisBusBarIRL", value: "", type: "Integer"},
            {name: "BB_DT", value: `BB${_dTCounter}`, type: "String"},
            ];
    }

}