import Component from "../Component";
import ProjectConfiguration from "../ProjectConfiguration";
import _F_PSU from "./_F_PSU";
import _f_DC_Distribution_CLS2_Balluff_120VPSU from "./_f_DC_Distribution/_f_DC_Distribution_CLS2_Balluff_120VPSU";
import _f_PSU_Balluff_CLS2_BAE0133 from "./_f_PSU_Balluff/_f_PSU_Balluff_CLS2_BAE0133";


export default class Fg_24VPowerDistribution extends Component{
    constructor(parent, psus) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._fg_24VPowerDistribution";
        this._class = "fg_24VPowerDistribution";
        this._name = "fg_24VPowerDistribution";
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
                    this.b_PSU_Selection_BAE0133 = true;
                    this._PSUSupplyVoltage_ = "120";
                }}
            )
        this.Balluff_CLS2_BAE0133_NumberOfPSU = this._Balluff_CLS2_BAE0133.length;
    }


    get Parameters(){
        return [{name: "list_CascadingGroup_PSU_DTs", value: "", type: "List"},
            {name: "Shop", value: ProjectConfiguration.shop, type: "String"},
            {name: "Line", value: ProjectConfiguration.line, type: "String"},
            {name: "Location", value: "", type: "String"},
            {name: "Plant", value: ProjectConfiguration.plant, type: "String"},
            {name: "LocalDisconnectRequired", value: "", type: "Boolean"},
            {name: "Turck_NumberOfPSU", value: this.Turck_NumberOfPSU, type: "Integer"},
            {name: "Puls_NumberOfPSU", value: this.Puls_NumberOfPSU, type: "Integer"},
            {name: "Siemens_NumberOfPSU", value: this.Siemens_NumberOfPSU, type: "Integer"},
            {name: "Balluf_BAE00FL_BAE00ET_NumberOfPSU", value: this.Balluf_BAE00FL_BAE00ET_NumberOfPSU, type: "Integer"},
            {name: "Balluff_CLS2_BAE0133_NumberOfPSU", value: this.numberOfBAE0133, type: "Integer"},
            {name: "LocationDesignation", value: "", type: "String"},
            {name: "DeviceTag", value: "", type: "String"},
            {name: "PSU_Selection_120", value: this.PSU_Selection_120, type: "String"},
            {name: "_PSUSupplyVoltage_", value: this._PSUSupplyVoltage_, type: "String"},
            {name: "b_PSU_Selection_Balluff_BAE00ET", value: this.b_PSU_Selection_Balluff_BAE00ET, type: "Boolean"},
            {name: "b_PSU_Selection_BAE00FL", value: this.b_PSU_Selection_BAE00FL, type: "Boolean"},
            {name: "b_PSU_Selection_BAE0133", value: this.b_PSU_Selection_BAE0133, type: "Boolean"},
            {name: "b_PSU_Selection_Puls", value: this.b_PSU_Selection_Puls, type: "Boolean"},
            {name: "b_PSU_Selection_Turck", value: this.b_PSU_Selection_Turck, type: "Boolean"},
            {name: "b_PSU_Selection_Siemens", value: this.b_PSU_Selection_Siemens, type: "Boolean"},
            {name: "s_PSU_Selection_120_240", value: this.s_PSU_Selection_120_240, type: "String"},
            {name: "b_PSU_Selection_480_", value: this.b_PSU_Selection_480_, type: "Boolean"},
            {name: "b_PSU_Selection_120_", value: this.b_PSU_Selection_120_, type: "Boolean"},
            {name: "b_PSU_Selection_400_", value: this.b_PSU_Selection_400_, type: "Boolean"},
            {name: "b_PSU_Selection_240_", value: this.b_PSU_Selection_240_, type: "Boolean"},

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
