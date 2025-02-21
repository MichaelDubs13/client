import Component from "../../../../../Component";


export default class C_BranchCircuit_PL extends Component{
    constructor(parent, amp, phase, xpdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_PowerDistribution._c_BusBarSystem._c_PwrDrop._c_BranchCircuit";
        this._class = `c_${amp}A_${phase}phBranchCircuit_PL`;
        this._name = `c_${amp}A_${phase}phBranchCircuit_PL`;
        this._xpdp = xpdp;
    }
    // get Parameters(){
    //     return [{name: "plg_BranchCkt_BusbarAdapter", value: "", type: "String"},
    //         {name: "s_CB_DT", value: "", type: "String"},
    //         ];
    // }
    build(){
    }
}