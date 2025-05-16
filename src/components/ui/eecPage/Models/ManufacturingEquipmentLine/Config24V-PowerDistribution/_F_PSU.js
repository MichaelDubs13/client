import Component from "../Component";
import _f_PSU_Balluff_CLS2_BAE0133 from "./_f_PSU_Balluff/_f_PSU_Balluff_CLS2_BAE0133";
import _f_PSU_PULS from "./_f_PSU_PULS/_f_PSU_PULS";
import _f_PSU_TURCK from "./_f_PSU_TURCK/_f_PSU_TURCK";


export default class _F_PSU extends Component{
    constructor(parent, psus) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_PSU";
        this._class = "_f_PSU";
        this._name = "_f_PSU";
        this.psus = psus;
    }

    build(){
        for(let i=0; i<this.parent._Balluff_CLS2_BAE0133.length;i++){
            const psu =  this.parent._Balluff_CLS2_BAE0133[i];
            const ballufPsu = new _f_PSU_Balluff_CLS2_BAE0133(this,i+1, psu);
            ballufPsu.build();
        }

        for(let i=0; i<this.parent._Turck.length;i++){
            const psu =  this.parent._Turck[i];
            const turkPsu = new _f_PSU_TURCK(this,i+1, psu);
            turkPsu.build();
        }

        for(let i=0; i<this.parent._Puls.length;i++){
            const psu =  this.parent._Puls[i];
            const pulsPsu = new _f_PSU_PULS(this,i+1, psu);
            pulsPsu.build();
        }
    }
}
