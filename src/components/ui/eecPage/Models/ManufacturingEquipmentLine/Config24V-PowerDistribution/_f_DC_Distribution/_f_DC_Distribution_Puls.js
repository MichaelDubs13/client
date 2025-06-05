import Component from "../../Component";
import _f_Sub_DC_Distribution from "./_f_Sub_DC_Distribution";
import _f_Sub_DC_Distribution_Class2 from "./_f_Sub_DC_Distribution_Class2";
import _c_DC_PowerDrop from "./_c_DC_PowerDrop/_c_DC_PowerDrop";
import _c_DC_PowerDrop_Class2 from "./_c_DC_PowerDrop/_c_DC_PowerDrop_Class2";

export default class _f_DC_Distribution_Puls extends Component{
    constructor(parent, psu) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_DC_Distribution";
        this._class = "_f_DC_Distribution_Puls";
        this._name = "_f_DC_Distribution_Puls";
        this._psu = psu;
        //this._class2Drops = this._psu.drops.filter(drop => drop.outputPort === "Class 2");

        //Needs to generate a page per 4 drops
        this._numberOfSubDistribution = Math.ceil(psu.drops.length / 4);
    }
    get Parameters(){
        return [
            // {name: "Drops_On_XD3", value: "", type: "Integer"},
            // {name: "Drops_On_XD4", value: "", type: "Integer"},
            // {name: "Drops_On_XD5", value: "", type: "Integer"},
            //{name: "NumberOf24V_Class2_PowerDrop", value: this._class2Drops.length, type: "Integer"},
        ];
    }

    
    /* build(){

        for(let i=0; i<this._class2Drops;i++){
            const dcSubDistribution = new _f_Sub_DC_Distribution_Class2(this, this._psu);
            dcSubDistribution.build();
        }

        for(let i=0; i<this._psu.drops.length;i++){
            const dcPowerDrop = new _c_DC_PowerDrop_Class2(this, i+1, this._psu.drops[i]);
            dcPowerDrop.build();
        }
    } */
    build() {
        // Separate drops
        const standardDrops = this._psu.drops.filter(drop => drop.outputPort !== "Class 2");
        const class2Drops = this._psu.drops.filter(drop => drop.outputPort === "Class 2");

        // Build for standard drops
        if (standardDrops.length > 0) {
            const numStandardSubDist = Math.ceil(standardDrops.length / 4);
            for (let i = 0; i < numStandardSubDist; i++) {
                const dcSubDistribution = new _f_Sub_DC_Distribution(this, { ...this._psu, drops: standardDrops.slice(i * 4, (i + 1) * 4) });
                dcSubDistribution.build();
            }
            for (let i = 0; i < standardDrops.length; i++) {
                const dcPowerDrop = new _c_DC_PowerDrop(this, i, standardDrops[i]);
                dcPowerDrop.build();
            }
        }

        // Build for class 2 drops
        if (class2Drops.length > 0) {
            const numClass2SubDist = Math.ceil(class2Drops.length / 4);
            for (let i = 0; i < numClass2SubDist; i++) {
                const dcSubDistribution = new _f_Sub_DC_Distribution_Class2(this, { ...this._psu, drops: class2Drops.slice(i * 4, (i + 1) * 4) });
                dcSubDistribution.build();
            }
            for (let i = 0; i < class2Drops.length; i++) {
                const dcPowerDrop = new _c_DC_PowerDrop_Class2(this, i, class2Drops[i]);
                dcPowerDrop.build();
            }
        }
    }  
}
