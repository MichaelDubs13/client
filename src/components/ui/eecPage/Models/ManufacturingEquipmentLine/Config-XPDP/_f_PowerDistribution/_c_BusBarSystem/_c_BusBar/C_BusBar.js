import Component from "../../../../Component";
import C_SubBusBar_Multiline from "./_c_SubBusBar_Multiline/C_SubBusBar_Multiline";
import C_SubBusBar_Singleline from "./c_SubBusBar_Singleline/C_SubBusBar_Singleline";

export default class C_BusBar extends Component{
    constructor(parent, index) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_PowerDistribution._c_BusBarSystem._c_BusBar";
        this._class = `c_BusBar`;
        this._name = `c_BusBar${index > 1 ? index : ""}`;
        this._dTCounter = index.toLocaleString('en-US', {minimumIntegerDigits: 2})
    }
    // get Parameters(){
    //     return [{name: "DTCounter", value: this._dTCounter, type: "String"},
    //         // {name: "i_DropsOnThisBusBar", value: 0, type: "Integer"},
    //         // {name: "i_DropsOnThisBusBarIRL", value: 0, type: "Integer"},
    //         // {name: "s_BB_DT", value: `BB${this._dTCounter}`, type: "String"},
    //         // {name: "i_BusBar_DT_Offset", value: 0, type: "Integer"},
    //         ];
    // }
    build(){
        // const c_SubBusBar_Multiline = new C_SubBusBar_Multiline(this);
        // const c_SubBusBar_Singleline = new C_SubBusBar_Singleline(this);
    }
}