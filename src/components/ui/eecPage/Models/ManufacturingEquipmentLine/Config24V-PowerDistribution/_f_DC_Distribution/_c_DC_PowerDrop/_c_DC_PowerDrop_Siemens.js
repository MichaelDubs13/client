import Component from "../../../Component";
export default class _c_DC_PowerDrop_Siemens extends Component{
    constructor(parent, index, drop) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_DC_Distribution._c_DC_PowerDrop";
        this._class = "_c_DC_PowerDrop_Siemens";
        this._name = `_c_DC_PowerDrop_Siemens${index+2}`;
        this._drop = drop;
    }
    get Parameters(){
        return [
            {name: "_s_DropLine_", value: this._drop.line, type: "String"},
            {name: "_s_DropLocation_", value: this._drop.targetLocation, type: "String"},
            {name: "_s_DropName_", value: this._drop.targetDT, type: "String"},
            {name: "DC_PowerDrop_FLA", value: this._drop.fla, type: "Double"},
            {name: "DescriptionTargetDevice", value: this._drop.description, type: "String"}, 
            {name: "TargetDevicePort", value: this._drop.targetDevicePort, type: "String"},
            //{name: "Output_Port", value: this._drop.outputPort, type: "String"}, 
        ];
    }

    
    build(){
 
    }
}
