import Component from "../Component";
import ProjectConfiguration from "../ProjectConfiguration";
import _F_PSU from "./_F_PSU";
import _f_DC_Distribution_CLS2_Balluff_120VPSU from "./_f_DC_Distribution/_f_DC_Distribution_CLS2_Balluff_120VPSU";
import _f_PSU_Balluff_CLS2_BAE0133 from "./_f_PSU_Balluff/_f_PSU_Balluff_CLS2_BAE0133";


export default class Fg_24VPowerDistribution extends Component{
    constructor(parent, index, psus) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._fg_24VPowerDistribution";
        this._class = "fg_24VPowerDistribution";
        this._name = `fg_24VPowerDistribution${index > 1 ? index : ""}`;
        this._psus = psus;
        this.Balluff_CLS2_BAE0133_NumberOfPSU = 0
        this.Balluf_BAE00FL_BAE00ET_NumberOfPSU = 0
        this.Turck_NumberOfPSU = 0
        this.Puls_NumberOfPSU = 0
        this.Siemens_NumberOfPSU = 0

        this.PSU_Selection_120 = "";
        this.s_PSU_Selection_120_240 = "";
        this.b_PSU_Selection_BAE0133 = false;
        this.b_PSU_Selection_Balluff_BAE00ET = false;
        this.b_PSU_Selection_BAE00FL = false;
        this.b_PSU_Selection_Puls = false;
        this.b_PSU_Selection_Turck = false;
        this.b_PSU_Selection_Siemens = false;
        this.b_PSU_Selection_480_ = false;
        this.b_PSU_Selection_120_ = false;
        this.b_PSU_Selection_400_ = false;
        this.b_PSU_Selection_240_ = false;
        this._PSUSupplyVoltage_ = 0;

        this._Balluff_CLS2_BAE0133 = [];
        this.update();
    }

    update(){
        this._psus.forEach(psu => {
            if(psu.MFG === "Balluff" && 
                psu.partNumber === "BAE0133"){
                    this._Balluff_CLS2_BAE0133.push(psu);
                    this.PSU_Selection_120 = `${psu.MFG}-${psu.partNumber}`;
                    this.s_PSU_Selection_120_240 = `${psu.MFG}-${psu.partNumber}`;
                    this.s_PSU_Selection_480_400 = `${psu.MFG}-${psu.partNumber}`;
                    this.b_PSU_Selection_BAE0133 = true;
                    this._PSUSupplyVoltage_ = "120";
                }}
            )
        this.Balluff_CLS2_BAE0133_NumberOfPSU = this._Balluff_CLS2_BAE0133.length;
    }


    get Parameters(){
        return [
            {name: "Location", value: "LOCATION", type: "String"},
            {name: "LocalDisconnectRequired", value: false, type: "Boolean"},
            {name: "Turck_NumberOfPSU", value: this.Turck_NumberOfPSU, type: "Integer"},
            {name: "Puls_NumberOfPSU", value: this.Puls_NumberOfPSU, type: "Integer"},
            {name: "Siemens_NumberOfPSU", value: this.Siemens_NumberOfPSU, type: "Integer"},
            {name: "Balluf_BAE00FL_BAE00ET_NumberOfPSU", value: this.Balluf_BAE00FL_BAE00ET_NumberOfPSU, type: "Integer"},
            {name: "Balluff_CLS2_BAE0133_NumberOfPSU", value: this.numberOfBAE0133, type: "Integer"},
            {name: "LocationDesignation", value: "Undefined", type: "String"},
            {name: "DeviceTag", value: "Undefined", type: "String"},
            {name: "_PSUSupplyVoltage_", value: this._PSUSupplyVoltage_, type: "String"},
            {name: "s_PSU_Selection_480_400", value: this.s_PSU_Selection_480_400, type: "String"},
            {name: "s_PSU_Selection_120_240", value: this.s_PSU_Selection_120_240, type: "String"},

        ];
    }

    build(){
        const f_psu = new _F_PSU(this, this._psus);
        f_psu.build();

        for(let i=0; i<this._Balluff_CLS2_BAE0133.length;i++){
            const psu =  this._Balluff_CLS2_BAE0133[i];
            const ballufPsu = new _f_PSU_Balluff_CLS2_BAE0133(this,i+1, psu);
            ballufPsu.build();
        }
    }
}
