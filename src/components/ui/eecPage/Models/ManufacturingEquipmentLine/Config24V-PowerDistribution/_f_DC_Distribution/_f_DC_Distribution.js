import Component from "../../Component";
import _f_Sub_DC_Distribution from "./_f_Sub_DC_Distribution";
import _c_DC_PowerDrop from "./_c_DC_PowerDrop/_c_DC_PowerDrop";

export default class _f_DC_Distribution extends Component{
    constructor(parent, psu) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_DC_Distribution";
        this._class = "_f_DC_Distribution";
        this._name = "_f_DC_Distribution";
        this._psu = psu;

        //Needs to generate a page per 4 drops
        this._numberOfSubDistribution = Math.ceil(psu.pwrDrops.length / 4);
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
            const dcSubDistribution = new _f_Sub_DC_Distribution(this, this._psu);
            dcSubDistribution.build();
        }

        for(let i=0; i<this._psu.pwrDrops.length;i++){
            const dcPowerDrop = new _c_DC_PowerDrop(this, i+1, this._psu.pwrDrops[i]);
            dcPowerDrop.build();
        }
    }
}
