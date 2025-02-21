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
        this._powerDropTypes = ["A", "B", "C","D","E"]
        this._protectionType = "CB";
        this._pwrDropName = `${this._amp}A Branch circuit power drop ${this._index}`
        this._widthUsed = 0;
        this._enclosureSize = ""; //get it from global
        this._branchCircuit = branchCircuit;
    }
   

 
    get Parameters(){
        return [
            {name: "PwrDrop_DescTxt", value:  this._branchCircuit.PwrDrop_DescTxt, type: "String"}, //UI
            {name: "dbl_Cable_Length", value: this._branchCircuit.dbl_Cable_Length, type: "Double"}, 
            {name: "StrBox_DT_FLA", value: this._branchCircuit.StrBox_DT_FLA, type: "String"}, //UI => TargetDevice_FLA
            {name: "StrBox_DT", value: this._branchCircuit.StrBox_DT, type: "String"}, //UI  => TargetDevice_DT
            {name: "TargetDevice_FLA", value: this._branchCircuit.TargetDevice_FLA, type: "String"}, 
            {name: "TargetDevice_DT", value: this._branchCircuit.TargetDevice_DT, type: "String"}, 
            {name: "PwrDrop_Spare", value: this._branchCircuit.PwrDrop_Spare, type: "Boolean"},
            ];
    }   
    
    
}
