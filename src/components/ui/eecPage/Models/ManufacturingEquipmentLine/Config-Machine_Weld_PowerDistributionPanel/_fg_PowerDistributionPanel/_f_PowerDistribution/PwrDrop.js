import BranchCircuit from "./BranchCircuit";
import Component from "../../../Component";
export default class PwrDrop extends Component {
    constructor(parent, pdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem._c_PwrDrop";
        this._class = "PwrDrop"; 
        this._name  = "PwrDrop"; 
        this._pdp = pdp;
    }
    get Parameters(){
        return [
            // {name: "NumberOfBusBars", value: this.parent.Components.filter(i=>i.className === "BusBar").length, type: "Integer"},
            ];
    }
    
    build(){
        for(let i = 0; i < this._pdp.numberOf250APwrDrps; i++){
            const pwrDrp = new BranchCircuit(this, 250, i+1);
        }
        for(let i = 0; i < this._pdp.numberOf100APwrDrps; i++){
            const pwrDrp = new BranchCircuit(this, 100, i+1);
        }
        for(let i = 0; i < this._pdp.numberOf70APwrDrps; i++){
            const pwrDrp = new BranchCircuit(this, 70, i+1);
        }
        for(let i = 0; i < this._pdp.numberOf60APwrDrps; i++){
            const pwrDrp = new BranchCircuit(this, 60, i+1);
        }
        for(let i = 0; i < this._pdp.numberOf40APwrDrps; i++){
            const pwrDrp = new BranchCircuit(this, 40, i+1);
        }
        for(let i = 0; i < this._pdp.numberOf30APwrDrps; i++){
            const pwrDrp = new BranchCircuit(this, 30, i+1);
        }
        for(let i = 0; i < this._pdp.numberOf20APwrDrps; i++){
            const pwrDrp = new BranchCircuit(this, 20, i+1);
        }
        for(let i = 0; i < this._pdp.numberOf10APwrDrps; i++){
            const pwrDrp = new BranchCircuit(this, 10, i+1);
        }
    }
}