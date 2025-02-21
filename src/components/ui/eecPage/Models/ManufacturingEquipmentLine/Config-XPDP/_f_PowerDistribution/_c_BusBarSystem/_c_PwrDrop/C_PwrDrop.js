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
        this.numberOfPwrDrop8A = this._xpdp.numberOfPwrDrop8A ? this._xpdp.numberOfPwrDrop8A : 0;
        this.numberOfPwrDrop15A = this._xpdp.numberOfPwrDrop15A ? this._xpdp.numberOfPwrDrop15A : 0;
        this.numberOfPwrDrop20A1p = this._xpdp.numberOfPwrDrop20A1p ? this._xpdp.numberOfPwrDrop20A1p : 0;
        this.numberOfPwrDrop20A3p = this._xpdp.numberOfPwrDrop20A3p ? this._xpdp.numberOfPwrDrop20A3p : 0;
    }

    getNumberOf1phaseDevices(){
        return this._xpdp.numberOfPwrDrop8A + 
                this._xpdp.numberOfPwrDrop15A + 
                this._xpdp.numberOfPwrDrop20A1p
    }
    getNumberOf3phaseDevices(){
        return this._xpdp.numberOfPwrDrop20A3p;
    }

    // get Parameters(){
    //     return [{name: "i_xNumberOfBusBars", value: 0, type: "Integer"},
    //         {name: "i_NumberOf1phDevices", value: this.getNumberOf1phaseDevices(), type: "Integer"},
    //         {name: "i_MaxNumberOf1phDevicesPerDinRail", value: 0, type: "Integer"},
    //         {name: "i_NumberOf3phDevices", value: this.getNumberOf3phaseDevices(), type: "Integer"},
    //         {name: "s_PowerDropVoltage", value: 0, type: "Integer"},
    //         ];
    // }
    build(){
        for(let i = 0; i < this._xpdp.numberOfPwrDrop8A; i++){
            const pwrDrp = new C_BranchCircuit(this,i+1,8,1);
            pwrDrp.build();        
        }
        for(let i = 0; i < this._xpdp.numberOfPwrDrop15A; i++){
            const pwrDrp = new C_BranchCircuit(this,i+1,15,1);
            pwrDrp.build();        
        }
        for(let i = 0; i < this._xpdp.numberOfPwrDrop20A1p; i++){
            const pwrDrp = new C_BranchCircuit(this,i+1,20,1);
            pwrDrp.build();        
        }
        for(let i = 0; i < this._xpdp.numberOfPwrDrop20A3p; i++){
            const pwrDrp = new C_BranchCircuit(this,i+1,20,3);
            pwrDrp.build();        
        }
    }
}