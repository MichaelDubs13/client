import Component from "../../../../../Component";
import C_BranchCircuit_ML from "./C_BranchCircuit_ML";
import C_BranchCircuit_PL from "./C_BranchCircuit_PL";
import C_BranchCircuit_SL from "./C_BranchCircuit_SL";

export default class C_BranchCircuit extends Component{
    constructor(parent, branchCircuit, index, amp, phase, xpdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_PowerDistribution._c_BusBarSystem._c_PwrDrop._c_BranchCircuit";
        this._class = `c_${amp}A_${phase}phBranchCircuit`;
        this._name = `c_${amp}A_${phase}phBranchCircuit${index+1}`;
        this._xpdp = xpdp;
        this._amp = amp;
        this._phase = phase;
        this._branchCircuit = branchCircuit;
    }

    get Parameters(){
        return [
            {name: "s_PwrDrop_DescTxt", value:  this._branchCircuit.PwrDrop_DescTxt, type: "String"}, //UI
            {name: "dbl_Cable_Length", value: this._branchCircuit.dbl_Cable_Length, type: "Double"}, 
            {name: "frmUI_StrBoxFLA", value: this._branchCircuit.StrBox_DT_FLA, type: "String"}, //UI => TargetDevice_FLA
            {name: "frmUI_s_StrBoxDT", value: this._branchCircuit.StrBox_DT, type: "String"}, //UI  => TargetDevice_DT
            {name: "s_TargetDevice_FLA", value: this._branchCircuit.TargetDevice_FLA, type: "String"}, 
            {name: "s_TargetDevice_DT", value: this._branchCircuit.TargetDevice_DT, type: "String"}, 
            {name: "b_PwrDrop_Spare", value: this._branchCircuit.PwrDrop_Spare, type: "Boolean"},
            ];
    }
    build(){
        const c_BranchCircuit_ML = new C_BranchCircuit_ML(this, this._amp, this._phase);
        const c_BranchCircuit_PL = new C_BranchCircuit_PL(this, this._amp, this._phase);
        const c_BranchCircuit_SL = new C_BranchCircuit_SL(this, this._amp, this._phase);
     
    }
}