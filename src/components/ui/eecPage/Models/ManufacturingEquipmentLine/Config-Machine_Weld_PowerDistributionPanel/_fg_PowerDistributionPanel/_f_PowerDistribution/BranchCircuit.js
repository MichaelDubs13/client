import Component from "../../../Component";
export default class BranchCircuit extends Component {
    constructor(parent, branchCircuit, amp, index) {
        super(parent);  
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_PwrDrop";
        this._class = `${amp}A_BranchCircuit`; 
        this._name  = `${amp}A_BranchCircuit${index+1}`; 
        this._dTCounter = index.toLocaleString('en-US', {minimumIntegerDigits: 2})
        this._amp = amp;
        this._index = index; 
        this._branchCircuit = branchCircuit;
    }
   

 
    get Parameters(){
        return [
            {name: "PwrDrop_DescTxt", value:  this._branchCircuit.description, type: "String"}, //UI
            {name: "dbl_Cable_Length", value: this._branchCircuit.targetCableLength, type: "Double"}, 
            {name: "StrBox_DT_FLA", value: this._branchCircuit.targetFLA_Total, type: "String"}, //UI => TargetDevice_FLA
            {name: "StrBox_DT", value: this._branchCircuit.targetLocation, type: "String"}, //UI  => TargetDevice_DT
            {name: "TargetDevice_Line", value: this._branchCircuit.line, type: "String"}, 
            {name: "TargetDevice_Location", value: this._branchCircuit.targetLocation, type: "String"}, 
            {name: "TargetDevice_DT", value: this._branchCircuit.targetDT, type: "String"}, 
            {name: "TargetDevice_FLA", value: this._branchCircuit.targetFLA, type: "String"}, 
            {name: "PwrDrop_Spare", value: this._branchCircuit.PwrDrop_Spare, type: "Boolean"},
            ];
    }   
    
    
}
