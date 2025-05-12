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
            {name: "s_PwrDrop_DescTxt", value:  this._branchCircuit.description, type: "String"}, //UI
            {name: "s_TargetDevice_Line", value: this._branchCircuit.line, type: "String"}, 
            {name: "frmUI_s_StrBoxDT", value: this._branchCircuit.targetLocation, type: "String"}, //UI  => TargetDevice_DT
            {name: "s_TargetDevice_DT", value: this._branchCircuit.targetDT, type: "String"}, 
            {name: "frmUI_StrBoxFLA", value: this._branchCircuit.targetFLA_Total, type: "String"}, //UI => TargetDevice_FLA
            {name: "s_TargetDevice_FLA", value: this._branchCircuit.targetFLA, type: "String"}, 
            {name: "dbl_Cable_Length", value: this._branchCircuit.targetCableLength, type: "Double"}, 
            {name: "b_PwrDrop_Spare", value: this._branchCircuit.PwrDrop_Spare, type: "Boolean"},
            ];
    }
    build(){
        const c_BranchCircuit_ML = new C_BranchCircuit_ML(this, this._amp, this._phase);
        const c_BranchCircuit_PL = new C_BranchCircuit_PL(this, this._amp, this._phase);
        const c_BranchCircuit_SL = new C_BranchCircuit_SL(this, this._amp, this._phase);
     
    }
}