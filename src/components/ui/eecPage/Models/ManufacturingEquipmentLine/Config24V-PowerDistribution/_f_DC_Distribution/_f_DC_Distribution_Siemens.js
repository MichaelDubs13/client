import Component from "../../Component";
import _f_Sub_DC_Distribution_Siemens from "./_f_Sub_DC_Distribution_Siemens";
import _c_DC_PowerDrop_Siemens from "./_c_DC_PowerDrop/_c_DC_PowerDrop_Siemens";

export default class _f_DC_Distribution_Siemens extends Component{
    constructor(parent, psu) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_DC_Distribution";
        this._class = "_f_DC_Distribution_Siemens";
        this._name = "_f_DC_Distribution_Siemens";
        this._psu = psu;

        //Needs to generate a page per 4 drops
        this._numberOfSubDistribution = Math.ceil(psu.drops.length / 4);
    }
    get Parameters(){
        return [
            // {name: "Drops_On_XD3", value: "", type: "Integer"},
            // {name: "Drops_On_XD4", value: "", type: "Integer"},
            // {name: "Drops_On_XD5", value: "", type: "Integer"},
        ];
    }

    
    build(){

        for(let i=0; i<this._numberOfSubDistribution;i++){
            const dcSubDistribution = new _f_Sub_DC_Distribution_Siemens(this, this._psu);
            dcSubDistribution.build();
        }

        for(let i=0; i<this._psu.drops.length;i++){
            const dcPowerDrop = new _c_DC_PowerDrop_Siemens(this, i+1, this._psu.drops[i]);
            dcPowerDrop.build();
        }
    }
}
