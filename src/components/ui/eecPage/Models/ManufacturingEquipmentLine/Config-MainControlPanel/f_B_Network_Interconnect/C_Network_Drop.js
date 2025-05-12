import Component from "../../Component";

export default class C_Network_Drop extends Component{
    constructor(parent, index, drop) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_Network_Drop";
        this._class = "c_Network_Drop";
        this._name = `c_Network_Drop${index > 1 ? index : ''}`;      
        this._drop = drop;
    }

    get Parameters(){
        return [
            {name: "Device_Line", value: this._drop.line, type: "String"},
            {name: "Device_Location", value: this._drop.targetLocation, type: "String"}, //need to set the parameter for the value, typical for all 4 rows
            {name: "Device_DT", value: this._drop.targetDT, type: "String"},
            {name: "Device_TargetPort", value: this._drop.targetPort, type: "String"},
            {name: "Cable_Length_Selection", value: this._drop.targetCableLength, type: "String"},
            // {name: "SwitchCascading", value: this._device.switchCascading, type: "Boolean"},
            // {name: "Interruption_InOrOut", value: this._device.interruption_InOrOut, type: "String"},
        ];
    }

    build(){
        
    }
}
