import Component from "../../Component";


export default class _f_PSU_Balluff_CLS2_BAE0133 extends Component{
    constructor(parent, index, psu) {
        super(parent);
        this.parent = parent;
        this._index = index;
        const number = index > 1 ? index : "";
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_PSU_Balluff";
        this._class = "_f_PSU_Balluff_CLS2_BAE0133";
        this._name = `_f_PSU_Balluff_CLS2_BAE0133${number}`;
        this._psu = psu;

        const psuLocationDt = psu.psuLocationDt.split("-");
        this._location = psuLocationDt[0]
    }
    get Parameters(){
        return [{name: "DTCounter", value: this._index, type: "String"},
            {name: "Location_ReadOnly", value: this._location, type: "String"},
            {name: "frmUI_24V_Device_visible", value: "", type: "Boolean"},
            {name: "NumberOf24V_PowerDrops", value: this._psu.numberOfDevices, type: "Integer"},
            {name: "frmUI_24V_DeviceName", value: "", type: "String"},
            {name: "Location", value: this._location, type: "String"},
            {name: "XD4_Needed", value: "", type: "Boolean"},
            {name: "XD5_Needed", value: "", type: "Boolean"},
            {name: "XD3_FLA_SUM", value: "", type: "Double"},
            {name: "XD4_FLA_SUM", value: "", type: "Double"},
            {name: "XD5_FLA_SUM", value: "", type: "Double"},
            {name: "Drops_On_XD3", value: "", type: "Integer"},
            {name: "Drops_On_XD4", value: "", type: "Integer"},
            {name: "Drops_On_XD5", value: "", type: "Integer"},
            {name: "s_PSU_DT_full", value: `+${this._psu.psuLocationDt}`, type: "String"},
            {name: "FLA_SUM", value: "", type: "Double"},
            {name: "DeviceTag", value: "", type: "String"},
            {name: "LocationDesignation", value: "", type: "String"},
            {name: "s_DT_intpt_SourceLocation", value: `${this._psu.psuLocationDt}_`, type: "String"},
        ];
    }
    build(){
 
    }
}
