import Component from "../../../Component";
export default class _c_DC_PowerDrop_Balluff_CLS2_120VPSU extends Component{
    constructor(parent, index, powerDropDevice) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_DC_Distribution._c_DC_PowerDrop";
        this._class = "_c_DC_PowerDrop_Balluff_CLS2_120VPSU";
        this._name = `_c_DC_PowerDrop_Balluff_CLS2_120VPSU${index+2}`;
        this._powerDropDevice = powerDropDevice;
        this._index = index;
    }
    get Parameters(){
        return [
            {name: "_s_DropLocation_", value: this._powerDropDevice.target_device_location_dt, type: "String"},
            {name: "_s_DropName_", value: this._powerDropDevice.device_dt, type: "String"},
            {name: "DC_PowerDrop_FLA", value: this._powerDropDevice.fla, type: "Double"},
            {name: "DescriptionTargetDevice", value: this._powerDropDevice.description, type: "String"}, //what is this
        ];
    }

    
    build(){
 
    }
}
