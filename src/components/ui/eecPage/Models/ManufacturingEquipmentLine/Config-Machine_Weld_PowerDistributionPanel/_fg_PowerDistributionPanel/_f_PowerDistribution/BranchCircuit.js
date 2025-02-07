import Component from "../../../Component";
export default class BranchCircuit extends Component {
    constructor(parent, amp, index) {
        super(parent);  
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_PwrDrop";
        this._class = `${amp}A_BranchCircuit`; 
        this._name  = `${amp}A_BranchCircuit${index > 1 ? index : ""}`; 
        this._dTCounter = index.toLocaleString('en-US', {minimumIntegerDigits: 2})
        this._amp = amp;
        this._index = index;
        this._pwrDropSpare = false;
        this._powerDropTypes = ["A", "B", "C","D","E"]
        this._dropType = this._pwrDropSpare ? "C" : "A"
        this._fla = "0";
        this._protectionType = "CB";
        this._pwrDropWidth = this.getPwrDropWidth();
        this._pwrDropName = `${this._amp}A Branch circuit power drop ${this._index}`
        this._widthUsed = 0;
        this._enclosureSize = ""; //get it from global
    }
    
    getPlacedOnBusBar(){
        
        if(this._enclosureSize === '800x1400x500(WHD)')
        {
            switch(this._widthUsed) {
                case (0 <= this._widthUsed < 360):
                  return 1
                case (360 <= this._widthUsed < 840):
                  return 2
                case (840 <= this._widthUsed < 1320):
                  return 3
                default:
                  return -1;
              }
        } else { 
            switch(this._widthUsed) {
                case (0 <= this._widthUsed < 476):
                  return 1
                case (476 <= this._widthUsed < 1116):
                  return 2
                case (1116 <= this._widthUsed < 1757):
                  return 3
                case (1757 <= this._widthUsed < 2417):
                  return 4
                default:
                  return -1;
              }
        } 
    }

    getPwrDropWidth(){
        switch(this._amp){
            case 250:
            case 100:
            case 70:
            case 60:
            case 40:
            case 30:
              return 72;
            case 20:
            case 10:
              return 32;
            default:
              return -1;
        }
    }
 
    get Parameters(){
        return [{name: "WidthUsed", value: "", type: "String"},
            {name: "PlacedOnBusbar", value: this.getPlacedOnBusBar(), type: "Integer"},
            {name: "BranchCircuitPlugCounter", value: "", type: "String"},
            {name: "DropType", value: this._dropType, type: "String"}, //UI
            {name: "PowerDropWidth", value: this._pwrDropWidth, type: "Integer"},
            {name: "PwrDrop_DescTxt", value: "", type: "String"}, //UI
            {name: "StrBox_DT_FLA", value: this._fla, type: "String"}, //UI => TargetDevice_FLA
            {name: "StrBox_DT", value: "", type: "String"}, //UI  => TargetDevice_DT
            {name: "TargetDevice_FLA", value: "", type: "String"}, 
            {name: "TargetDevice_DT", value: "", type: "String"}, 
            {name: "PwrDrop_Spare", value: this._pwrDropSpare, type: "Boolean"},
            {name: "ProtectionType", value: this._protectionType, type: "String"},
            {name: "frmUI_PwrDrop_visible", value: !this._pwrDropSpare, type: "Boolean"}, //UI => spareDdrop
            {name: "frmUI_PwrDropName", value: this._pwrDropName, type: "String"}, 
            ];
    }   
    
    
}
