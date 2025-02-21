import Component from "../../../../../Component";


export default class C_BranchCircuit_SL extends Component{
    constructor(parent, amp, phase, xpdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_PowerDistribution._c_BusBarSystem._c_PwrDrop._c_BranchCircuit";
        this._class = `c_${amp}A_${phase}phBranchCircuit_SL`;
        this._name = `c_${amp}A_${phase}phBranchCircuit_SL`;
        this._xpdp = xpdp;
    }

    build(){
    }
}