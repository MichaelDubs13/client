import Component from "../../../../Component";
import C_BranchCircuit from "./_c_BranchCircuit/C_BranchCircuit";


export default class C_PwrDrop extends Component{
    constructor(parent, xpdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_PowerDistribution._c_BusBarSystem._c_PwrDrop";
        this._class = "c_PwrDrop";
        this._name = "c_PwrDrop";
        this._xpdp = xpdp;
    }
    get Parameters(){
        return [
            ];
    }
    build(){
        for(let i = 0; i < this._xpdp.branchCircuit["8A 1ph"].length; i++){
            const pwrDrp = new C_BranchCircuit(this,this._xpdp.branchCircuit["8A 1ph"][i],i+1,8,1,this._xpdp);
            pwrDrp.build();        
        }
        for(let i = 0; i < this._xpdp.branchCircuit["15A 1ph"].length; i++){
            const pwrDrp = new C_BranchCircuit(this,this._xpdp.branchCircuit["15A 1ph"][i],i+1,15,1, this._xpdp);
            pwrDrp.build();        
        }
        for(let i = 0; i < this._xpdp.branchCircuit["20A 1ph"].length; i++){
            const pwrDrp = new C_BranchCircuit(this,this._xpdp.branchCircuit["20A 1ph"][i],i+1,20,1, this._xpdp);
            pwrDrp.build();        
        }
        for(let i = 0; i < this._xpdp.branchCircuit["20A 3ph"].length; i++){
            const pwrDrp = new C_BranchCircuit(this,this._xpdp.branchCircuit["20A 3ph"][i],i+1,20,3, this._xpdp);
            pwrDrp.build();        
        }
    }
}