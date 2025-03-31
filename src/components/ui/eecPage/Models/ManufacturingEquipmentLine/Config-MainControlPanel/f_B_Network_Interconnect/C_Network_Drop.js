import Component from "../../Component";

export default class C_Network_Drop extends Component{
    constructor(parent, index, device) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_Network_Drop";
        this._class = "c_Network_Drop";
        this._name = `c_Network_Drop${index > 1 ? index : ''}`;      
        this._device = device;
        
    }

    get Parameters(){
        return [
            // {name: "Device_Location", value: "undefined", type: "String"}, //need to set the parameter for the value, typical for all 4 rows
            // {name: "Device_DT", value: "undefined", type: "String"},
            // {name: "Device_TargetPort", value: "undefined", type: "String"},
            {name: "Cable_Length_Selection", value: `${this._device.local_cable_length} m`, type: "String"},
        ];
    }

    build(){
        
    }
}
