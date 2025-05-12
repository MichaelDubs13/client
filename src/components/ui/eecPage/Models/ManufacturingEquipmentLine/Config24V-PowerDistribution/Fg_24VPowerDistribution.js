import Component from "../Component";
import _F_PSU from "./_F_PSU";
import _f_DC_Distribution_CLS2_Balluff_120VPSU from "./_f_DC_Distribution/_f_DC_Distribution_CLS2_Balluff_120VPSU";
import _f_PSU_Balluff_CLS2_BAE0133 from "./_f_PSU_Balluff/_f_PSU_Balluff_CLS2_BAE0133";
import _f_PSU_TURCK from "./_f_PSU_TURCK/_f_PSU_TURCK";


export default class Fg_24VPowerDistribution extends Component{
    constructor(parent, index, lpd) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._fg_24VPowerDistribution";
        this._class = "fg_24VPowerDistribution";
        this._name = `fg_24VPowerDistribution${index > 1 ? index : ""}`;
        this._lpd = lpd;
        this.Balluff_CLS2_BAE0133_NumberOfPSU = 0
        this.Balluff_CLS2_BAE012P_NumberOfPSU = 0
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

        this._Balluff_CLS2_BAE0133 = [];
        this._Turck = [];
        this.update();
    }

    update(){
        //need to get full list
        this._lpd.psus.forEach(psu => {
            if(psu.MFG === "Balluff"){
                if(psu.partNumber === "BAE0133"){
                    this._Balluff_CLS2_BAE0133.push(psu);
                    this.PSU_Selection_120 = `${psu.MFG}-${psu.partNumber}`;
                    this.s_PSU_Selection_120_240 = `${psu.MFG}-${psu.partNumber}`;
                    this.s_PSU_Selection_480_400 = ``;
                    this.b_PSU_Selection_BAE0133 = true;
                }
            } else if(psu.MFG === "Turck"){
                this._Turck.push(psu);
                this.PSU_Selection_120 = ``;
                this.s_PSU_Selection_120_240 = ``;
                this.s_PSU_Selection_480_400 = `${psu.MFG}`;
            }
        })
        this.Balluff_CLS2_BAE0133_NumberOfPSU = this._Balluff_CLS2_BAE0133.length;
        this.Turck_NumberOfPSU = this._Turck.length;
    }


    get Parameters(){
        return [
            {name: "Line", value:  this._lpd.line, type: "String"},
            {name: "Location", value:  this._lpd.location, type: "String"},
            {name: "LocationDesignation", value: this._lpd.powerSourceLocation, type: "String"},
            {name: "DeviceTag", value: this._lpd.powerSourceDT, type: "String"},
            {name: "_PSUSupplyVoltage_", value: this._lpd.supplyVoltage, type: "String"},
            {name: "LocalDisconnectRequired", value: false, type: "Boolean"},
            {name: "Turck_NumberOfPSU", value: this.Turck_NumberOfPSU, type: "Integer"},
            {name: "Puls_NumberOfPSU", value: this.Puls_NumberOfPSU, type: "Integer"},
            {name: "Siemens_NumberOfPSU", value: this.Siemens_NumberOfPSU, type: "Integer"},
            {name: "Balluf_BAE00FL_BAE00ET_NumberOfPSU", value: this.Balluf_BAE00FL_BAE00ET_NumberOfPSU, type: "Integer"},
            {name: "Balluff_CLS2_BAE0133_NumberOfPSU", value: this.numberOfBAE0133, type: "Integer"},
            {name: "s_PSU_Selection_480_400", value: this.s_PSU_Selection_480_400, type: "String"},
            {name: "s_PSU_Selection_120_240", value: this.s_PSU_Selection_120_240, type: "String"},
        ];
    }

    build(){
        const f_psu = new _F_PSU(this, this._psus);
        f_psu.build();
    }
}
