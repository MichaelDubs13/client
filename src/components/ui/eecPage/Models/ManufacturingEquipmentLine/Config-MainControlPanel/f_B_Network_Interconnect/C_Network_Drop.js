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
        this._device_location = '';
        this._device_location_DT = '';
        this._cable_Length_Selection = 'TDB';
        this.getParameterValues();
    }

    getParameterValues(){
        if(this._device.deviceType === "Device"){
            this._device_location = this._device.target_device_location
            this._device_location_DT = this._device.target_device_location_dt
            this._cable_Length_Selection = `${this._device.local_cable_length} m`
        } else if (this._device.deviceType === "Network Switch"){
            this._device_location = this._device.target_device_location
            this._device_location_DT = this._device.target_device_location_dt
            this._cable_Length_Selection = `${this._device.local_cable_length} m`
        }
        //if its spare then no parameter needs to be update
    }
    

    get Parameters(){
        return [
            {name: "Device_Location", value: this._device_location, type: "String"}, //need to set the parameter for the value, typical for all 4 rows
            {name: "Device_DT", value: this._device_location_DT, type: "String"},
            // {name: "Device_TargetPort", value: "undefined", type: "String"},
            {name: "Cable_Length_Selection", value: this._device.local_cable_length, type: "String"},
            {name: "SwitchCascading", value: this._device.switchCascading, type: "Boolean"},
            {name: "Interruption_InOrOut", value: this._device.interruption_InOrOut, type: "String"},
        ];
    }

    build(){
        
    }
}
