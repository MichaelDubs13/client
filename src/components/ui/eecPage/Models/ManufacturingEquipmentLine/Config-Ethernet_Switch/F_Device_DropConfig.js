import Component from "../Component";

export default class f_Device_DropConfig extends Component{
    constructor(parent, index, networkSwitch, device) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config-Ethernet_Switch.Mechatronic._fg_Network_Switches_field_installations._f_Device_DropConfig";
        this._class = "f_Device_DropConfig";
        this._name = `f_Device_DropConfig${index > 1 ? index : ""}`;
        this._networkSwitch = networkSwitch;
        this._device = device;
    }

    get Parameters(){
        if(this._device){
            return [
                {name: "Interruption_InOrOut", value: this._device.interruption_InOrOut, type: "String"}, //if i have network switch going to another network switch 
                {name: "Device_Type_Selection", value: this._device.deviceType, type: "String"}, //device, spare or switch
                {name: "TargetDevice_DT", value: this._device.device_dt, type: "String"}, //device DT: SIO01
                {name: "Target_Location", value: this._device?.target_device_location, type: "String"}, //station number : 10000
                {name: "Cable_Length_Selection", value: this._device.local_cable_length, type: "String"},
                {name: "Switch_Cascading", value: this._device.switchCascading, type: "Boolean"}, //if its a switch not going to MCP then its true
                {name: "frmUI_DevicePortSelection", value: "Undefined", type: "String"}, //only needs this if its switch to another switch
                {name: "frmUI_NetworkSwitchSelection", value: "Undefined", type: "String"}, //only needs this if its switch to another switch
            ];
        } else {
            return [];
        }
        
    }

    
}

